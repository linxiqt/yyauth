import { c as defineEventHandler, e as upgradeDatabase } from '../../../_/nitro.mjs';
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

const upgradeDb_post = defineEventHandler(async (event) => {
  try {
    await upgradeDatabase();
    return {
      code: 200,
      message: "\u6570\u636E\u5E93\u7ED3\u6784\u5DF2\u6210\u529F\u5347\u7EA7"
    };
  } catch (error) {
    console.error("\u6570\u636E\u5E93\u5347\u7EA7\u5931\u8D25:", error);
    return {
      code: 500,
      message: "\u6570\u636E\u5E93\u5347\u7EA7\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u670D\u52A1\u5668\u65E5\u5FD7"
    };
  }
});

export { upgradeDb_post as default };
//# sourceMappingURL=upgrade-db.post.mjs.map
