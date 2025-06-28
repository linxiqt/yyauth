import { c as defineEventHandler, v as verifyToken, g as getDb, r as readBody } from '../../../_/nitro.mjs';
import { v as validateRequired, a as validateOptional } from '../../../_/validation.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  try {
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
        message: "\u6388\u6743\u8BB0\u5F55\u4E0D\u5B58\u5728\u6216\u60A8\u65E0\u6743\u4FEE\u6539"
      };
    }
    const body = await readBody(event);
    const requiredFields = {
      domain: "\u57DF\u540D"
    };
    const validationError = validateRequired(body, requiredFields);
    if (validationError) {
      return {
        success: false,
        message: validationError
      };
    }
    const updateData = {
      domain: body.domain,
      updated_at: /* @__PURE__ */ new Date()
    };
    if (user.role === "admin") {
      const optionalFields = {
        ip: "\u5B57\u7B26\u4E32",
        qq: "\u5B57\u7B26\u4E32",
        version: "\u5B57\u7B26\u4E32",
        price: "\u6570\u5B57",
        original_price: "\u6570\u5B57",
        outtime: "\u6570\u5B57",
        app_id: "\u6570\u5B57"
      };
      const optionalValidationError = validateOptional(body, optionalFields);
      if (optionalValidationError) {
        return {
          success: false,
          message: optionalValidationError
        };
      }
      if (body.ip !== void 0) updateData.ip = body.ip;
      if (body.qq !== void 0) updateData.qq = body.qq;
      if (body.version !== void 0) updateData.version = body.version;
      if (body.price !== void 0) updateData.price = body.price;
      if (body.original_price !== void 0) updateData.original_price = body.original_price;
      if (body.outtime !== void 0) updateData.outtime = parseInt(body.outtime);
      if (body.app_id !== void 0 && body.app_id !== existingAuth.app_id) {
        const app = await db("apps").where("id", body.app_id).first();
        if (!app) {
          return {
            success: false,
            message: "\u5E94\u7528\u4E0D\u5B58\u5728"
          };
        }
        updateData.app_id = body.app_id;
      }
    }
    await db("auth").where("id", id).update(updateData);
    return {
      success: true,
      message: "\u6388\u6743\u66F4\u65B0\u6210\u529F",
      data: { id }
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u6388\u6743\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
