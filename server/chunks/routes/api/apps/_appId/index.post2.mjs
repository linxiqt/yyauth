import { c as defineEventHandler, r as readBody, g as getDb } from '../../../../_/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  try {
    const appId = event.context.params.appId;
    const { domain, ip, contact, outtime, version, price, originalPrice } = await readBody(event);
    const db = getDb();
    const user = event.context.user;
    let appQuery = db("apps").where("id", appId);
    if (user.role !== "admin") {
      appQuery = appQuery.where("user_id", user.id);
    }
    const app = await appQuery.first();
    if (!app) {
      return {
        success: false,
        message: "\u5E94\u7528\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u9650\u64CD\u4F5C"
      };
    }
    if (!domain || !outtime || !version) {
      return {
        success: false,
        message: "\u8BF7\u63D0\u4F9B\u5FC5\u8981\u7684\u6388\u6743\u4FE1\u606F"
      };
    }
    const discounts = {
      admin: 1,
      level1: 0.8,
      level2: 0.5,
      level3: 0
    };
    const expectedPrice = Math.round(originalPrice * (discounts[user.role] || 1) * 100) / 100;
    if (price !== expectedPrice) {
      return {
        success: false,
        message: "\u4EF7\u683C\u8BA1\u7B97\u9519\u8BEF"
      };
    }
    if (user.balance < price) {
      return {
        success: false,
        message: "\u4F59\u989D\u4E0D\u8DB3"
      };
    }
    await db.transaction(async (trx) => {
      if (price > 0) {
        await trx("users").where("id", user.id).decrement("balance", price);
        await trx("transactions").insert({
          user_id: user.id,
          amount: -price,
          type: "consume",
          description: `\u521B\u5EFA${app.name}\u5E94\u7528\u6388\u6743: ${domain} (\u539F\u4EF7:\xA5${originalPrice}, \u6298\u6263\u4EF7:\xA5${price})`
        });
      }
      await trx("auth").insert({
        domain,
        ip,
        qq: contact,
        outtime,
        version,
        price,
        original_price: originalPrice,
        created_by: user.id,
        app_id: appId
      });
    });
    return {
      success: true,
      message: "\u521B\u5EFA\u6210\u529F"
    };
  } catch (error) {
    console.error("\u521B\u5EFA\u6388\u6743\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF"
    };
  }
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
