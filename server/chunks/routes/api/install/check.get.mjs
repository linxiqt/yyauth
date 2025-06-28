import { c as defineEventHandler, m as getConfig } from '../../../_/nitro.mjs';
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

const check_get = defineEventHandler(async (event) => {
  try {
    const config = getConfig();
    if (config) {
      return {
        installed: true,
        message: "\u7CFB\u7EDF\u5DF2\u5B89\u88C5"
      };
    }
    return {
      installed: false,
      message: "\u7CFB\u7EDF\u672A\u5B89\u88C5"
    };
  } catch (error) {
    console.error("\u68C0\u67E5\u7CFB\u7EDF\u5B89\u88C5\u72B6\u6001\u5931\u8D25:", error);
    return {
      installed: false,
      message: `\u68C0\u67E5\u5B89\u88C5\u72B6\u6001\u5931\u8D25: ${error.message}`
    };
  }
});

export { check_get as default };
//# sourceMappingURL=check.get.mjs.map
