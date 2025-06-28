import { c as defineEventHandler, v as verifyToken, g as getDb, r as readBody } from '../../../../../_/nitro.mjs';
import { v as validateRequired } from '../../../../../_/validation.mjs';
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

const _changelogId__put = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        success: false,
        message: "\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55"
      };
    }
    const db = getDb();
    const appId = event.context.params.appId;
    const changelogId = event.context.params.changelogId;
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
    const changelog = await db("changelogs").where({
      id: changelogId,
      app_id: appId
    }).first();
    if (!changelog) {
      return {
        success: false,
        message: "\u66F4\u65B0\u65E5\u5FD7\u4E0D\u5B58\u5728\u6216\u4E0D\u5C5E\u4E8E\u8BE5\u5E94\u7528"
      };
    }
    const body = await readBody(event);
    const requiredFields = {
      version: "\u7248\u672C\u53F7"
    };
    const validationError = validateRequired(body, requiredFields);
    if (validationError) {
      return {
        success: false,
        message: validationError
      };
    }
    if (body.version !== changelog.version) {
      const existingVersion = await db("changelogs").where({
        app_id: appId,
        version: body.version
      }).whereNot("id", changelogId).first();
      if (existingVersion) {
        return {
          success: false,
          message: "\u8BE5\u7248\u672C\u53F7\u5DF2\u5B58\u5728\uFF0C\u8BF7\u4F7F\u7528\u5176\u4ED6\u7248\u672C\u53F7"
        };
      }
    }
    const updateData = {
      version: body.version,
      changes: body.changes || null
    };
    await db("changelogs").where("id", changelogId).update(updateData);
    return {
      success: true,
      message: "\u66F4\u65B0\u65E5\u5FD7\u66F4\u65B0\u6210\u529F"
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u66F4\u65B0\u65E5\u5FD7\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
});

export { _changelogId__put as default };
//# sourceMappingURL=_changelogId_.put.mjs.map
