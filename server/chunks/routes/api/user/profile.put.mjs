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

const profile_put = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        code: 401,
        message: "\u672A\u6388\u6743\u8BBF\u95EE"
      };
    }
    const body = await readBody(event);
    const { nickname, email, qq, bio } = body;
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return {
        code: 400,
        message: "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"
      };
    }
    const db = await getDb();
    const query = `
      UPDATE users 
      SET 
        nickname = ?, 
        email = ?, 
        qq = ?, 
        bio = ?
      WHERE id = ?
    `;
    await db("users").where("id", user.id).update({
      nickname: nickname || null,
      email: email || null,
      qq: qq || null,
      bio: bio || null
    });
    return {
      code: 200,
      message: "\u66F4\u65B0\u6210\u529F"
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u7528\u6237\u8D44\u6599\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"
    };
  }
});

export { profile_put as default };
//# sourceMappingURL=profile.put.mjs.map
