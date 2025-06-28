import { c as defineEventHandler, v as verifyToken, g as getDb } from '../../../../../_/nitro.mjs';
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

const _authId__delete = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        success: false,
        message: "\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55"
      };
    }
    const appId = event.context.params.appId;
    const authId = event.context.params.authId;
    const db = getDb();
    const app = await db("apps").where({
      id: appId,
      user_id: user.id
    }).first();
    if (!app) {
      return {
        success: false,
        message: "\u5E94\u7528\u4E0D\u5B58\u5728\u6216\u60A8\u6CA1\u6709\u6743\u9650\u64CD\u4F5C"
      };
    }
    const auth = await db("auth").where({
      id: authId,
      app_id: appId
    }).first();
    if (!auth) {
      return {
        success: false,
        message: "\u6388\u6743\u8BB0\u5F55\u4E0D\u5B58\u5728\u6216\u4E0D\u5C5E\u4E8E\u8BE5\u5E94\u7528"
      };
    }
    await db("auth").where("id", authId).delete();
    return {
      success: true,
      message: "\u6388\u6743\u8BB0\u5F55\u5DF2\u6210\u529F\u5220\u9664"
    };
  } catch (error) {
    console.error("\u5220\u9664\u6388\u6743\u8BB0\u5F55\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
});

export { _authId__delete as default };
//# sourceMappingURL=_authId_.delete.mjs.map
