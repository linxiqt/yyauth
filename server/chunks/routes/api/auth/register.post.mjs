import { c as defineEventHandler, r as readBody, g as getDb, k as hashPassword, l as getRequestIP, i as generateToken } from '../../../_/nitro.mjs';
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

const register_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password, email } = body;
    if (!username || !password) {
      return {
        code: 400,
        message: "\u7528\u6237\u540D\u548C\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"
      };
    }
    if (username.length < 3 || username.length > 20) {
      return {
        code: 400,
        message: "\u7528\u6237\u540D\u957F\u5EA6\u5E94\u57283-20\u4E2A\u5B57\u7B26\u4E4B\u95F4"
      };
    }
    if (password.length < 6) {
      return {
        code: 400,
        message: "\u5BC6\u7801\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E6\u4F4D"
      };
    }
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return {
        code: 400,
        message: "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"
      };
    }
    const db = await getDb();
    const checkQuery = "SELECT id FROM users WHERE username = ?";
    const checkResult = await db("users").where("username", username);
    if (checkResult.length > 0) {
      return {
        code: 400,
        message: "\u8BE5\u7528\u6237\u540D\u5DF2\u88AB\u5360\u7528"
      };
    }
    const settingsQuery = "SELECT value FROM settings WHERE key = ?";
    const [settingsResult] = await db("settings").where("key", "allow_register");
    if (settingsResult.length > 0 && settingsResult[0].value === "false") {
      return {
        code: 403,
        message: "\u7CFB\u7EDF\u5F53\u524D\u4E0D\u5141\u8BB8\u6CE8\u518C\u65B0\u7528\u6237"
      };
    }
    const hashedPassword = hashPassword(password);
    const ip = getRequestIP(event);
    const result = await db("users").insert({
      username,
      password: hashedPassword,
      role: "user",
      register_ip: ip
    });
    console.log(result);
    if (!result) {
      throw new Error("\u6CE8\u518C\u5931\u8D25");
    }
    const userResult = await db("users").where("id", result[0]);
    if (userResult.length === 0) {
      throw new Error("\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25");
    }
    const user = userResult[0];
    const token = await generateToken(user);
    return {
      code: 200,
      message: "\u6CE8\u518C\u6210\u529F",
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
    console.error("\u6CE8\u518C\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"
    };
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
