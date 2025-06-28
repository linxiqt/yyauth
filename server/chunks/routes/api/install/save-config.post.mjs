import { c as defineEventHandler, n as createError } from '../../../_/nitro.mjs';
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

const saveConfig_post = defineEventHandler(async (event) => {
  try {
    return {
      success: true,
      message: "\u6570\u636E\u5E93\u914D\u7F6E\u5DF2\u4FDD\u5B58"
    };
  } catch (error) {
    console.error("\u4FDD\u5B58\u6570\u636E\u5E93\u914D\u7F6E\u5931\u8D25:", error);
    return createError({
      statusCode: 500,
      message: `\u4FDD\u5B58\u6570\u636E\u5E93\u914D\u7F6E\u5931\u8D25: ${error.message}`
    });
  }
});

export { saveConfig_post as default };
//# sourceMappingURL=save-config.post.mjs.map
