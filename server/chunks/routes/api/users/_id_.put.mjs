import { c as defineEventHandler, v as verifyToken, r as readBody, g as getDb } from '../../../_/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        code: 401,
        message: "\u672A\u6388\u6743\u8BBF\u95EE"
      };
    }
    if (user.role !== "admin") {
      return {
        code: 403,
        message: "\u6743\u9650\u4E0D\u8DB3\uFF0C\u53EA\u6709\u7BA1\u7406\u5458\u53EF\u4EE5\u4FEE\u6539\u7528\u6237\u4FE1\u606F"
      };
    }
    const id = event.context.params.id;
    const body = await readBody(event);
    const { nickname, email, role, balance } = body;
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return {
        code: 400,
        message: "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"
      };
    }
    const db = await getDb();
    const checkQuery = "SELECT id FROM users WHERE id = ?";
    const [checkResult] = await db("users").where("id", id);
    if (checkResult.length === 0) {
      return {
        code: 404,
        message: "\u7528\u6237\u4E0D\u5B58\u5728"
      };
    }
    const updateQuery = `
      UPDATE users 
      SET 
        nickname = ?, 
        email = ?, 
        role = ?,
        balance = ?
      WHERE id = ?
    `;
    await db("users").where("id", id).update({
      nickname: nickname || null,
      email: email || null,
      role,
      balance
    });
    return {
      code: 200,
      message: "\u66F4\u65B0\u6210\u529F"
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u7528\u6237\u4FE1\u606F\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"
    };
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
