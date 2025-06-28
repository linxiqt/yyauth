import { c as defineEventHandler, v as verifyToken, g as getDb, r as readBody } from '../../_/nitro.mjs';
import { v as validateRequired, a as validateOptional } from '../../_/validation.mjs';
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

const index_post = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        success: false,
        message: "\u672A\u6388\u6743\uFF0C\u8BF7\u5148\u767B\u5F55"
      };
    }
    const db = getDb();
    const body = await readBody(event);
    const requiredFields = {
      app_id: "\u5E94\u7528ID",
      domain: "\u57DF\u540D",
      outtime: "\u8FC7\u671F\u65F6\u95F4"
    };
    const validationError = validateRequired(body, requiredFields);
    if (validationError) {
      return {
        success: false,
        message: validationError
      };
    }
    const optionalFields = {
      ip: "\u5B57\u7B26\u4E32",
      qq: "\u5B57\u7B26\u4E32",
      version: "\u5B57\u7B26\u4E32",
      price: "\u6570\u5B57",
      original_price: "\u6570\u5B57",
      remarks: "\u5B57\u7B26\u4E32"
    };
    const optionalValidationError = validateOptional(body, optionalFields);
    if (optionalValidationError) {
      return {
        success: false,
        message: optionalValidationError
      };
    }
    const app = await db("apps").where({
      id: body.app_id,
      user_id: user.id
    }).first();
    if (!app) {
      return {
        success: false,
        message: "\u5E94\u7528\u4E0D\u5B58\u5728\u6216\u60A8\u6CA1\u6709\u6743\u9650\u64CD\u4F5C\u6B64\u5E94\u7528"
      };
    }
    const existingAuth = await db("auth").where({
      domain: body.domain,
      app_id: body.app_id
    }).first();
    if (existingAuth) {
      return {
        success: false,
        message: "\u8BE5\u57DF\u540D\u5DF2\u88AB\u6388\u6743\u7ED9\u6B64\u5E94\u7528\uFF0C\u8BF7\u52FF\u91CD\u590D\u6388\u6743"
      };
    }
    const authData = {
      domain: body.domain,
      ip: body.ip || null,
      qq: body.qq || null,
      outtime: parseInt(body.outtime),
      version: body.version || null,
      price: body.price || 0,
      original_price: body.original_price || 0,
      app_id: body.app_id,
      created_by: user.id
    };
    const [insertId] = await db("auth").insert(authData);
    if (!insertId) {
      return {
        success: false,
        message: "\u6388\u6743\u521B\u5EFA\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
      };
    }
    return {
      success: true,
      message: "\u6388\u6743\u521B\u5EFA\u6210\u529F",
      data: {
        id: insertId
      }
    };
  } catch (error) {
    console.error("\u521B\u5EFA\u6388\u6743\u51FA\u9519:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
