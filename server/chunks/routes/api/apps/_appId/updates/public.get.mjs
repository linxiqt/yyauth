import { c as defineEventHandler, g as getDb } from '../../../../../_/nitro.mjs';
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

const public_get = defineEventHandler(async (event) => {
  try {
    const appId = event.context.params.appId;
    const db = getDb();
    const app = await db("apps").where("id", appId).select("id", "name", "update_config").first();
    if (!app) {
      return {
        success: false,
        message: "\u5E94\u7528\u4E0D\u5B58\u5728"
      };
    }
    let updateConfig = app.update_config;
    if (!updateConfig) {
      updateConfig = {
        latest_version: "",
        signature: "",
        force_update: false,
        update_time: "",
        download_url: ""
      };
    }
    return {
      success: true,
      data: updateConfig
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u5E94\u7528\u516C\u5F00\u66F4\u65B0\u914D\u7F6E\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
});

export { public_get as default };
//# sourceMappingURL=public.get.mjs.map
