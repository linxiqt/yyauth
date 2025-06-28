import { c as defineEventHandler, f as getQuery, g as getDb } from '../../_/nitro.mjs';
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
    const { page = 1, limit = 10 } = getQuery(event);
    const db = getDb();
    const user = event.context.user;
    const offset = (page - 1) * limit;
    let query = db("apps").select("apps.*", db.raw("COUNT(auth.id) as auth_count")).leftJoin("auth", "apps.id", "auth.app_id").groupBy("apps.id").orderBy("apps.created_at", "desc").limit(limit).offset(offset);
    if (user.role !== "admin") {
      query = query.where("apps.user_id", user.id);
    }
    const apps = await query;
    let countQuery = db("apps");
    if (user.role !== "admin") {
      countQuery = countQuery.where("user_id", user.id);
    }
    const total = await countQuery.count("* as count").first();
    return {
      success: true,
      data: {
        items: apps,
        total: total.count,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u5E94\u7528\u5217\u8868\u51FA\u9519:", error);
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
