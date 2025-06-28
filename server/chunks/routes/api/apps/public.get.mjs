import { c as defineEventHandler, f as getQuery, g as getDb } from '../../../_/nitro.mjs';
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
    const { page = 1, limit = 20 } = getQuery(event);
    const db = getDb();
    const offset = (page - 1) * limit;
    const apps = await db("apps").select("apps.*").whereNull("apps.is_active").orWhere("apps.is_active", true).orderBy("apps.created_at", "desc").limit(limit).offset(offset);
    const total = await db("apps").whereNull("apps.is_active").orWhere("apps.is_active", true).count("* as count").first();
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
    console.error("\u83B7\u53D6\u516C\u5F00\u5E94\u7528\u5217\u8868\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF"
    };
  }
});

export { public_get as default };
//# sourceMappingURL=public.get.mjs.map
