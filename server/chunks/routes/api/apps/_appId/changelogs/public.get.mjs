import { c as defineEventHandler, f as getQuery, g as getDb } from '../../../../../_/nitro.mjs';
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

const public_get = defineEventHandler(async (event) => {
  try {
    const appId = event.context.params.appId;
    const query = getQuery(event);
    const limit = parseInt(query.limit) || 10;
    const version = query.version;
    const db = getDb();
    const app = await db("apps").where("id", appId).first();
    if (!app) {
      return {
        success: false,
        message: "\u5E94\u7528\u4E0D\u5B58\u5728"
      };
    }
    let changelogsQuery = db("changelogs").select("id", "version", "changes", "created_at").where("app_id", appId);
    if (version) {
      changelogsQuery = changelogsQuery.where("version", version);
    } else {
      changelogsQuery = changelogsQuery.limit(limit);
    }
    const changelogs = await changelogsQuery.orderBy("created_at", "desc");
    return {
      success: true,
      data: {
        items: changelogs
      }
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u5E94\u7528\u66F4\u65B0\u65E5\u5FD7\u5217\u8868\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
});

export { public_get as default };
//# sourceMappingURL=public.get.mjs.map
