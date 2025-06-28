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

const _id__delete = defineEventHandler(async (event) => {
  try {
    console.log("\u5220\u9664\u6388\u6743");
    const user = await verifyToken(event);
    if (!user) {
      return {
        success: false,
        message: "\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55"
      };
    }
    const db = getDb();
    const id = event.context.params.id;
    let authQuery = db("auth").where("id", id);
    if (user.role !== "admin") {
      authQuery = authQuery.where("created_by", user.id);
    }
    const existingAuth = await authQuery.first();
    if (!existingAuth) {
      return {
        success: false,
        message: "\u6388\u6743\u8BB0\u5F55\u4E0D\u5B58\u5728\u6216\u60A8\u65E0\u6743\u5220\u9664"
      };
    }
    await db("auth").where("id", id).delete();
    return {
      success: true,
      message: "\u6388\u6743\u5220\u9664\u6210\u529F"
    };
  } catch (error) {
    console.error("\u5220\u9664\u6388\u6743\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
