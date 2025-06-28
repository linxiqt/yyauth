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

const _id__get = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        code: 401,
        message: "\u672A\u6388\u6743\u8BBF\u95EE"
      };
    }
    const db = await getDb();
    const id = event.context.params.id;
    let query = db("auth").leftJoin("apps", "auth.app_id", "apps.id").select(
      "auth.*",
      "apps.name as app_name",
      "apps.icon as app_icon"
    ).where("auth.id", id);
    if (user.role !== "admin") {
      query = query.where("auth.created_by", user.id);
    }
    const authRecord = await query.first();
    if (!authRecord) {
      return {
        code: 404,
        message: "\u6388\u6743\u8BB0\u5F55\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u67E5\u770B"
      };
    }
    const auth = {
      id: authRecord.id,
      domain: authRecord.domain,
      ip: authRecord.ip,
      qq: authRecord.qq,
      version: authRecord.version,
      price: authRecord.price,
      original_price: authRecord.original_price,
      created_at: authRecord.created_at,
      updated_at: authRecord.updated_at,
      outtime: authRecord.outtime,
      isActive: new Date(authRecord.outtime * 1e3) > /* @__PURE__ */ new Date(),
      app_id: authRecord.app_id,
      app: {
        id: authRecord.app_id,
        name: authRecord.app_name,
        icon: authRecord.app_icon
      }
    };
    return {
      code: 200,
      message: "\u83B7\u53D6\u6210\u529F",
      data: auth
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u6388\u6743\u8BE6\u60C5\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"
    };
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
