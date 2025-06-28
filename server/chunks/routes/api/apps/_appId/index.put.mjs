import { c as defineEventHandler, v as verifyToken, g as getDb, r as readBody } from '../../../../_/nitro.mjs';
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

const index_put = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        success: false,
        message: "\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55"
      };
    }
    const appId = event.context.params.appId;
    const db = getDb();
    const app = await db("apps").where({
      id: appId,
      user_id: user.id
    }).select("id").first();
    if (!app) {
      return {
        success: false,
        message: "\u5E94\u7528\u4E0D\u5B58\u5728\u6216\u60A8\u6CA1\u6709\u6743\u9650\u64CD\u4F5C"
      };
    }
    const body = await readBody(event);
    if (!body.latest_version) {
      return {
        success: false,
        message: "\u6700\u65B0\u7248\u672C\u4E0D\u80FD\u4E3A\u7A7A"
      };
    }
    if (!body.download_url) {
      return {
        success: false,
        message: "\u4E0B\u8F7D\u94FE\u63A5\u4E0D\u80FD\u4E3A\u7A7A"
      };
    }
    const updateConfig = {
      latest_version: body.latest_version,
      signature: body.signature || "",
      force_update: !!body.force_update,
      update_time: body.update_time || (/* @__PURE__ */ new Date()).toISOString(),
      download_url: body.download_url
    };
    await db("apps").where("id", appId).update({
      update_config: JSON.stringify(updateConfig)
    });
    return {
      success: true,
      message: "\u66F4\u65B0\u914D\u7F6E\u4FDD\u5B58\u6210\u529F",
      data: updateConfig
    };
  } catch (error) {
    console.error("\u4FDD\u5B58\u5E94\u7528\u66F4\u65B0\u914D\u7F6E\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
