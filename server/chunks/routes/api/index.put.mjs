import { c as defineEventHandler, r as readBody, g as getDb } from '../../_/nitro.mjs';
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
    const user = event.context.user;
    const body = await readBody(event);
    if (user.role !== "admin") {
      return {
        statusCode: 403,
        body: {
          success: false,
          message: "\u65E0\u6743\u9650\u4FEE\u6539\u7CFB\u7EDF\u8BBE\u7F6E"
        }
      };
    }
    const db = getDb();
    await db.transaction(async (trx) => {
      for (const [key, value] of Object.entries(body)) {
        const setting = await trx("settings").where("key", key).first();
        if (setting) {
          let processedValue = value;
          if (setting.type === "json") {
            processedValue = typeof value === "string" ? value : JSON.stringify(value);
          } else if (setting.type === "boolean") {
            processedValue = value ? "true" : "false";
          } else {
            processedValue = String(value);
          }
          await trx("settings").where("key", key).update({
            value: processedValue,
            updated_at: /* @__PURE__ */ new Date()
          });
        }
      }
    });
    return {
      success: true,
      message: "\u8BBE\u7F6E\u5DF2\u66F4\u65B0"
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u7CFB\u7EDF\u8BBE\u7F6E\u51FA\u9519:", error);
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
