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

const index_get = defineEventHandler(async (event) => {
  try {
    const appId = event.context.params.appId;
    const db = getDb();
    const user = event.context.user;
    let query = db("apps").where("apps.id", appId);
    if (user.role !== "admin") {
      query = query.where("user_id", user.id);
    }
    const app = await query.first();
    if (!app) {
      return {
        statusCode: 404,
        body: {
          success: false,
          message: "\u5E94\u7528\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u9650\u67E5\u770B"
        }
      };
    }
    const authCount = await db("auth").where("app_id", appId).count("* as count").first();
    const activeAuthCount = await db("auth").where("app_id", appId).where("outtime", ">", Date.now()).count("* as count").first();
    const announcementCount = await db("announcements").where("app_id", appId).count("* as count").first();
    const changelogCount = await db("changelogs").where("app_id", appId).count("* as count").first();
    return {
      success: true,
      data: {
        ...app,
        stats: {
          auth_total: authCount.count,
          auth_active: activeAuthCount.count,
          announcement_total: announcementCount.count,
          changelog_total: changelogCount.count
        }
      }
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u5E94\u7528\u8BE6\u60C5\u51FA\u9519:", error);
    return {
      statusCode: 500,
      body: {
        success: false,
        message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF"
      }
    };
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
