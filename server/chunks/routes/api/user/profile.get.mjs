import { c as defineEventHandler, v as verifyToken, g as getDb } from '../../../_/nitro.mjs';
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

const profile_get = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        code: 401,
        message: "\u672A\u6388\u6743\u8BBF\u95EE"
      };
    }
    const db = await getDb();
    const query = "SELECT id, username, nickname, email, qq, bio, role, balance, created_at, last_login FROM users WHERE id = ?";
    const rows = await db("users").where("id", user.id);
    if (rows.length === 0) {
      return {
        code: 404,
        message: "\u7528\u6237\u4E0D\u5B58\u5728"
      };
    }
    return {
      code: 200,
      message: "\u83B7\u53D6\u6210\u529F",
      data: rows[0]
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u7528\u6237\u8D44\u6599\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"
    };
  }
});

export { profile_get as default };
//# sourceMappingURL=profile.get.mjs.map
