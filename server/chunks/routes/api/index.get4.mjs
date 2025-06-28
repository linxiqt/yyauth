import { c as defineEventHandler, v as verifyToken, f as getQuery, g as getDb } from '../../_/nitro.mjs';
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
        message: "\u6743\u9650\u4E0D\u8DB3\uFF0C\u53EA\u6709\u7BA1\u7406\u5458\u53EF\u4EE5\u67E5\u770B\u7528\u6237\u5217\u8868"
      };
    }
    const query = getQuery(event);
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const search = query.search || "";
    const role = query.role || "";
    const db = await getDb();
    let whereParams = {};
    if (role == "admin") {
      whereParams = {
        username: search,
        role
      };
    } else if (search) {
      whereParams = {
        username: search
      };
    } else {
      whereParams = {};
    }
    const countResult = await db("users").where(whereParams).count("* as total").first();
    const total = countResult.total;
    const usersResult = await db("users").where(whereParams).orderBy("id", "desc").limit(limit).offset(offset);
    return {
      code: 200,
      message: "\u83B7\u53D6\u6210\u529F",
      data: {
        users: usersResult,
        total,
        page,
        limit
      }
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u7528\u6237\u5217\u8868\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"
    };
  }
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
