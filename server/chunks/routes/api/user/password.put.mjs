import { c as defineEventHandler, v as verifyToken, r as readBody, g as getDb, h as verifyPassword, k as hashPassword } from '../../../_/nitro.mjs';
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

const password_put = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        code: 401,
        message: "\u672A\u6388\u6743\u8BBF\u95EE"
      };
    }
    const body = await readBody(event);
    const { current_password, new_password } = body;
    if (!current_password || !new_password) {
      return {
        code: 400,
        message: "\u5F53\u524D\u5BC6\u7801\u548C\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"
      };
    }
    if (new_password.length < 6) {
      return {
        code: 400,
        message: "\u65B0\u5BC6\u7801\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E6\u4F4D"
      };
    }
    const db = await getDb();
    const query = "SELECT password FROM users WHERE id = ?";
    const [rows] = await db("users").where("id", user.id);
    if (rows.length === 0) {
      return {
        code: 404,
        message: "\u7528\u6237\u4E0D\u5B58\u5728"
      };
    }
    const isMatch = verifyPassword(current_password, rows[0].password);
    if (!isMatch) {
      return {
        code: 400,
        message: "\u5F53\u524D\u5BC6\u7801\u4E0D\u6B63\u786E"
      };
    }
    const hashedPassword = hashPassword(new_password);
    const updateQuery = "UPDATE users SET password = ? WHERE id = ?";
    await db("users").where("id", user.id).update({ password: hashedPassword });
    return {
      code: 200,
      message: "\u5BC6\u7801\u66F4\u65B0\u6210\u529F"
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u5BC6\u7801\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"
    };
  }
});

export { password_put as default };
//# sourceMappingURL=password.put.mjs.map
