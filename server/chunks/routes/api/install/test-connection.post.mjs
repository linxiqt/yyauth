import { c as defineEventHandler, m as getConfig, n as createError, r as readBody } from '../../../_/nitro.mjs';
import knex from 'knex';
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
import 'fs';
import 'path';
import 'axios';
import 'ar-aes';

const testConnection_post = defineEventHandler(async (event) => {
  try {
    let config = getConfig();
    if (config) {
      return createError({
        statusCode: 500,
        message: "\u6570\u636E\u5E93\u5DF2\u5B89\u88C5"
      });
    }
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = await readBody(event);
    if (!DB_HOST) {
      return createError({
        statusCode: 400,
        message: "\u6570\u636E\u5E93\u4E3B\u673A\u4E0D\u80FD\u4E3A\u7A7A"
      });
    }
    if (!DB_NAME) {
      return createError({
        statusCode: 400,
        message: "\u6570\u636E\u5E93\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"
      });
    }
    if (!DB_USER) {
      return createError({
        statusCode: 400,
        message: "\u6570\u636E\u5E93\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A"
      });
    }
    const testDb = knex({
      client: "mysql2",
      connection: {
        host: DB_HOST,
        port: DB_PORT || 3306,
        user: DB_USER,
        password: DB_PASSWORD || "",
        database: DB_NAME
      },
      pool: { min: 0, max: 1 }
    });
    await testDb.raw("SELECT 1");
    await testDb.destroy();
    return {
      success: true,
      message: "\u6570\u636E\u5E93\u8FDE\u63A5\u6210\u529F"
    };
  } catch (error) {
    console.error("\u6570\u636E\u5E93\u8FDE\u63A5\u6D4B\u8BD5\u5931\u8D25:", error);
    return createError({
      statusCode: 500,
      message: `\u6570\u636E\u5E93\u8FDE\u63A5\u5931\u8D25: ${error.message}`
    });
  }
});

export { testConnection_post as default };
//# sourceMappingURL=test-connection.post.mjs.map
