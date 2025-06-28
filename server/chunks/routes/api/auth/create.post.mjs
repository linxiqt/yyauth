import { c as defineEventHandler, r as readBody, g as getDb } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jws';
import 'ms';
import 'semver';
import 'crypto';
import 'knex';
import 'fs';
import 'path';
import 'axios';
import 'ar-aes';

const create_post = defineEventHandler(async (event) => {
  try {
    const user = event.context.user;
    if (!user) {
      return {
        success: false,
        message: "\u8BF7\u5148\u767B\u5F55"
      };
    }
    const body = await readBody(event);
    const { app_id, domain, contact, plan, price } = body;
    if (!app_id) {
      return {
        success: false,
        message: "\u8BF7\u9009\u62E9\u5E94\u7528"
      };
    }
    if (!domain) {
      return {
        success: false,
        message: "\u8BF7\u8F93\u5165\u6388\u6743\u57DF\u540D"
      };
    }
    if (!plan) {
      return {
        success: false,
        message: "\u8BF7\u9009\u62E9\u6388\u6743\u7248\u672C"
      };
    }
    if (!price || price <= 0) {
      return {
        success: false,
        message: "\u6388\u6743\u4EF7\u683C\u65E0\u6548"
      };
    }
    const db = getDb();
    const app = await db("apps").where("id", app_id).first();
    if (!app) {
      return {
        success: false,
        message: "\u5E94\u7528\u4E0D\u5B58\u5728"
      };
    }
    if (parseFloat(user.balance) < parseFloat(price)) {
      return {
        success: false,
        message: "\u8D26\u6237\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u5148\u5145\u503C"
      };
    }
    const result = await db.transaction(async (trx) => {
      const now = Math.floor(Date.now() / 1e3);
      const oneMonth = 30 * 24 * 60 * 60;
      const outtime = now + oneMonth;
      const [authId] = await trx("auth").insert({
        app_id,
        domain,
        qq: contact,
        // 前端的contact对应数据库中的qq字段
        version: plan,
        price,
        original_price: price,
        outtime,
        created_by: user.id,
        ip: event.node.req.headers["x-forwarded-for"] || event.node.req.socket.remoteAddress,
        created_at: /* @__PURE__ */ new Date(),
        updated_at: /* @__PURE__ */ new Date()
      });
      await trx("users").where("id", user.id).update({
        balance: db.raw(`balance - ${parseFloat(price)}`),
        updated_at: /* @__PURE__ */ new Date()
      });
      await trx("transactions").insert({
        user_id: user.id,
        amount: -parseFloat(price),
        type: "consume",
        description: `\u8D2D\u4E70\u6388\u6743: ${domain} (${plan}\u7248\u672C)`,
        created_at: /* @__PURE__ */ new Date()
      });
      return { authId };
    });
    return {
      success: true,
      message: "\u6388\u6743\u8D2D\u4E70\u6210\u529F",
      data: {
        auth_id: result.authId
      }
    };
  } catch (error) {
    console.error("\u521B\u5EFA\u6388\u6743\u5931\u8D25:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF\uFF0C\u521B\u5EFA\u6388\u6743\u5931\u8D25"
    };
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
