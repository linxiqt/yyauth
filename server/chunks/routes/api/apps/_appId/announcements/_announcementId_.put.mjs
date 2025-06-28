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

const _announcementId__put = defineEventHandler(async (event) => {
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
    const announcementId = event.context.params.announcementId;
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
    const announcement = await db("announcements").where({
      id: announcementId,
      app_id: appId
    }).first();
    if (!announcement) {
      return {
        success: false,
        message: "\u516C\u544A\u4E0D\u5B58\u5728\u6216\u4E0D\u5C5E\u4E8E\u8BE5\u5E94\u7528"
      };
    }
    const body = await readBody(event);
    const requiredFields = {
      title: "\u516C\u544A\u6807\u9898"
    };
    const validationError = validateRequired(body, requiredFields);
    if (validationError) {
      return {
        success: false,
        message: validationError
      };
    }
    const updateData = {
      title: body.title,
      content: body.content || null,
      is_active: body.is_active === void 0 ? true : !!body.is_active
    };
    await db("announcements").where("id", announcementId).update(updateData);
    return {
      success: true,
      message: "\u516C\u544A\u66F4\u65B0\u6210\u529F"
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u516C\u544A\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
});

export { _announcementId__put as default };
//# sourceMappingURL=_announcementId_.put.mjs.map
