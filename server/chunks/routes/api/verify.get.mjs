import { c as defineEventHandler, f as getQuery, g as getDb } from '../../_/nitro.mjs';
import { v as validateRequired } from '../../_/validation.mjs';
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

const verify_get = defineEventHandler(async (event) => {
  try {
    let { domain, app_id, ip } = getQuery(event);
    const requiredFields = {
      domain: "\u57DF\u540D",
      app_id: "\u5E94\u7528ID"
    };
    const validationError = validateRequired({ domain, app_id }, requiredFields);
    if (validationError) {
      return {
        success: false,
        message: validationError
      };
    }
    const db = getDb();
    const auth = await db("auth").where({
      domain,
      app_id
    }).first();
    if (!auth) {
      return {
        success: false,
        message: "\u57DF\u540D\u672A\u6388\u6743"
      };
    }
    if (auth.ip && ip && auth.ip !== ip) {
      return {
        success: false,
        message: "IP\u5730\u5740\u4E0D\u5339\u914D"
      };
    }
    const now = Math.floor(Date.now() / 1e3);
    if (auth.outtime * 1e3 < now) {
      return {
        success: false,
        message: "\u6388\u6743\u5DF2\u8FC7\u671F",
        data: {
          expired: true,
          auth
        }
      };
    }
    return {
      success: true,
      message: "\u6388\u6743\u9A8C\u8BC1\u6210\u529F",
      data: {
        expired: false,
        auth
      }
    };
  } catch (error) {
    console.error("\u9A8C\u8BC1\u6388\u6743\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
});

export { verify_get as default };
//# sourceMappingURL=verify.get.mjs.map
