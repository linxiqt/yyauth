import { c as defineEventHandler, v as verifyToken, g as getDb, f as getQuery } from '../../_/nitro.mjs';
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
    const db = await getDb();
    const query = getQuery(event);
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const appId = query.appId || null;
    const status = query.status || null;
    const search = query.search || "";
    let queryParams = {};
    if (appId) {
      queryParams.app_id = appId;
    }
    if (status) {
      queryParams.status = status;
    }
    if (search) {
      queryParams.domain = search;
    }
    console.log(queryParams);
    const countResult = await db("auth").where(queryParams).count("* as total").first();
    const total = countResult.total;
    const listResult = await db("auth").where(queryParams).orderBy("id", "desc").limit(limit).offset(offset);
    const records = listResult.map((item) => ({
      id: item.id,
      domain: item.domain,
      ip: item.ip,
      qq: item.qq,
      version: item.version,
      price: item.price,
      original_price: item.original_price,
      created_at: item.created_at,
      updated_at: item.updated_at,
      outtime: item.outtime,
      isActive: new Date(item.outtime * 1e3) > /* @__PURE__ */ new Date(),
      app: {
        id: item.app_id,
        name: item.app_name,
        icon: item.app_icon
      }
    }));
    return {
      code: 200,
      message: "\u83B7\u53D6\u6210\u529F",
      data: {
        records,
        total,
        page,
        limit
      }
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u6388\u6743\u5217\u8868\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"
    };
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
