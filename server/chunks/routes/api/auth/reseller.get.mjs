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

const reseller_get = defineEventHandler(async (event) => {
  try {
    const { username } = getQuery(event);
    if (!username) {
      return {
        success: false,
        message: "\u8BF7\u63D0\u4F9B\u7528\u6237\u540D"
      };
    }
    const db = getDb();
    const user = event.context.user;
    const reseller = await db("users").select("id", "username", "balance", "role", "created_at").where("username", username).first();
    if (!reseller) {
      return {
        success: false,
        message: "\u672A\u627E\u5230\u8BE5\u6388\u6743\u5546"
      };
    }
    const apps = await db("apps").select("id", "name", "description", "created_at").where("user_id", reseller.id);
    const authStats = await db("auth").where("created_by", reseller.id).count("* as total");
    return {
      success: true,
      data: {
        reseller: {
          ...reseller,
          apps,
          stats: {
            total: authStats.total || 0,
            active: authStats.active || 0
          }
        }
      }
    };
  } catch (error) {
    console.error("\u67E5\u8BE2\u6388\u6743\u5546\u4FE1\u606F\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF"
    };
  }
});

export { reseller_get as default };
//# sourceMappingURL=reseller.get.mjs.map
