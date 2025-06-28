import { c as defineEventHandler, m as getConfig, n as createError, r as readBody, o as validateConfig, p as saveConfig, q as initDatabase, g as getDb, k as hashPassword } from '../../_/nitro.mjs';
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
    let config = getConfig();
    if (config) {
      return createError({
        statusCode: 500,
        message: "\u6570\u636E\u5E93\u5DF2\u5B89\u88C5"
      });
    }
    const { dbConfig, adminConfig } = await readBody(event);
    const { isValid, errors } = validateConfig(dbConfig);
    if (!isValid) {
      return createError({
        statusCode: 400,
        message: "\u6570\u636E\u5E93\u914D\u7F6E\u65E0\u6548",
        data: errors
      });
    }
    const saved = saveConfig(dbConfig);
    if (!saved) {
      return createError({
        statusCode: 500,
        message: "\u4FDD\u5B58\u6570\u636E\u5E93\u914D\u7F6E\u5931\u8D25"
      });
    }
    await initDatabase();
    if (adminConfig && adminConfig.username && adminConfig.password) {
      const db = getDb();
      const hashedPassword = hashPassword(adminConfig.password);
      await db("users").insert({
        username: adminConfig.username,
        // 默认密码: admin123
        password: hashedPassword,
        role: "admin",
        created_at: /* @__PURE__ */ new Date()
      });
    }
    return {
      success: true,
      message: "\u7CFB\u7EDF\u5B89\u88C5\u6210\u529F"
    };
  } catch (error) {
    console.error("\u7CFB\u7EDF\u5B89\u88C5\u5931\u8D25:", error);
    return createError({
      statusCode: 500,
      message: `\u7CFB\u7EDF\u5B89\u88C5\u5931\u8D25: ${error.message}`
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
