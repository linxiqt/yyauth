import { c as defineEventHandler, r as readBody, g as getDb, h as verifyPassword, i as generateToken, j as setCookie } from '../../../_/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password } = body;
    if (!username || !password) {
      return {
        code: 400,
        message: "\u7528\u6237\u540D\u548C\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"
      };
    }
    const db = await getDb();
    const rows = await db("users").where("username", username);
    if (rows.length === 0) {
      return {
        code: 401,
        message: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF"
      };
    }
    const user = rows[0];
    console.log(user);
    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      return {
        code: 401,
        message: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF"
      };
    }
    await db("users").where("id", user.id).update({ last_login_time: /* @__PURE__ */ new Date() });
    const token = await generateToken(user);
    setCookie(event, "token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60
      // 7天
    });
    return {
      code: 200,
      message: "\u767B\u5F55\u6210\u529F",
      data: {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          balance: user.balance
        },
        token
      }
    };
  } catch (error) {
    console.error("\u767B\u5F55\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5" + error
    };
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
