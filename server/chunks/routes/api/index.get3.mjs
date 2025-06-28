import { c as defineEventHandler, g as getDb } from '../../_/nitro.mjs';
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
    const user = event.context.user;
    if (user.role !== "admin") {
      return {
        statusCode: 403,
        body: {
          success: false,
          message: "\u65E0\u6743\u9650\u8BBF\u95EE\u7CFB\u7EDF\u8BBE\u7F6E"
        }
      };
    }
    const db = getDb();
    const settings = await db("settings").select("*");
    const settingsMap = settings.reduce((acc, setting) => {
      let value = setting.value;
      if (setting.type === "boolean") {
        value = value === "true";
      } else if (setting.type === "number") {
        value = parseFloat(value);
      } else if (setting.type === "json") {
        try {
          value = JSON.parse(value);
        } catch (e) {
          console.error(`\u89E3\u6790JSON\u8BBE\u7F6E\u5931\u8D25: ${setting.key}`, e);
        }
      }
      acc[setting.key] = {
        value,
        type: setting.type,
        description: setting.description
      };
      return acc;
    }, {});
    return {
      success: true,
      data: settingsMap
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u7CFB\u7EDF\u8BBE\u7F6E\u51FA\u9519:", error);
    return {
      statusCode: 500,
      body: {
        success: false,
        message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF"
      }
    };
  }
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
