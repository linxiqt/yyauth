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

const index_put = defineEventHandler(async (event) => {
  try {
    const appId = event.context.params.appId;
    const { name, description, icon } = await readBody(event);
    const db = getDb();
    const user = event.context.user;
    if (!name) {
      return {
        statusCode: 400,
        body: {
          success: false,
          message: "\u5E94\u7528\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"
        }
      };
    }
    let query = db("apps").where("id", appId);
    if (user.role !== "admin") {
      query = query.where("user_id", user.id);
    }
    const app = await query.first();
    if (!app) {
      return {
        statusCode: 404,
        body: {
          success: false,
          message: "\u5E94\u7528\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u9650\u7F16\u8F91"
        }
      };
    }
    if (name !== app.name) {
      const existingApp = await db("apps").where({ name, user_id: app.user_id }).whereNot("id", appId).first();
      if (existingApp) {
        return {
          statusCode: 400,
          body: {
            success: false,
            message: "\u5DF2\u5B58\u5728\u540C\u540D\u5E94\u7528"
          }
        };
      }
    }
    await db("apps").where("id", appId).update({
      name,
      description,
      icon,
      updated_at: /* @__PURE__ */ new Date()
    });
    return {
      success: true,
      message: "\u66F4\u65B0\u6210\u529F",
      data: {
        appId,
        name,
        description,
        icon
      }
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u5E94\u7528\u51FA\u9519:", error);
    return {
      statusCode: 500,
      body: {
        success: false,
        message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF"
      }
    };
  }
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
