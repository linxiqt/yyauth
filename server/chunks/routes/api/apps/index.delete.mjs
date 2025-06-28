import { c as defineEventHandler, g as getDb } from '../../../_/nitro.mjs';
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

const index_delete = defineEventHandler(async (event) => {
  try {
    const appId = event.context.params.appId;
    const db = getDb();
    const user = event.context.user;
    console.log("\u51C6\u5907\u5220\u9664\u5E94\u7528", appId);
    let app = null;
    if (user.role !== "admin") {
      app = await db("apps").where({ "user_id": user.id, "id": appId }).first();
    } else {
      app = await db("apps").where({
        "id": appId
      }).first();
    }
    if (!app) {
      return {
        statusCode: 404,
        body: {
          success: false,
          message: "\u5E94\u7528\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u9650\u5220\u9664"
        }
      };
    }
    await db.transaction(async (trx) => {
      await trx("changelogs").where("app_id", appId).delete();
      await trx("announcements").where("app_id", appId).delete();
      await trx("auth").where("app_id", appId).delete();
      await trx("apps").where("id", appId).delete();
    });
    return {
      success: true,
      message: "\u5220\u9664\u6210\u529F"
    };
  } catch (error) {
    console.error("\u5220\u9664\u5E94\u7528\u51FA\u9519:", error);
    return {
      statusCode: 500,
      body: {
        success: false,
        message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF"
      }
    };
  }
});

export { index_delete as default };
//# sourceMappingURL=index.delete.mjs.map
