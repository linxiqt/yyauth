import { c as defineEventHandler, v as verifyToken, g as getDb } from '../../_/nitro.mjs';
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

const dashboard_get = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        code: 401,
        message: "\u672A\u6388\u6743\u8BBF\u95EE"
      };
    }
    const db = await getDb();
    const userId = user.id;
    const userResult = await db("users").where("id", userId);
    if (userResult.length === 0) {
      return {
        code: 404,
        message: "\u7528\u6237\u4E0D\u5B58\u5728"
      };
    }
    const userData = userResult[0];
    let appCountQuery;
    let appParams = {};
    if (user.role === "admin") {
      appParams = {};
    } else {
      appParams = { user_id: userId };
    }
    const appCountResult = await db("apps").where(appParams).count("* as total").first();
    const appTotal = appCountResult.total;
    let authQuery;
    let authParams = {};
    if (user.role === "admin") {
      authParams = {};
    } else {
      authParams = { app_id: userId };
    }
    const authResult = await db("auth").where(authParams).count("* as total").first();
    let incomeData = {
      total: 0,
      today: 0,
      yesterday: 0,
      thisMonth: 0
    };
    if (user.role === "admin") {
      const incomeResult = await db("transactions").where("type", "income").count("* as total").first();
      if (incomeResult.length > 0) {
        incomeData = {
          total: incomeResult[0].total || 0,
          today: incomeResult[0].today || 0,
          yesterday: incomeResult[0].yesterday || 0,
          thisMonth: incomeResult[0].thisMonth || 0
        };
      }
    }
    let recentAuthQuery;
    let recentAuthParams = {};
    if (user.role === "admin") {
      recentAuthParams = {};
    } else {
      recentAuthParams = { app_id: userId };
    }
    const recentAuthResult = await db("auth").where(recentAuthParams).orderBy("id", "desc").limit(10);
    let appsQuery;
    let appsParams = {};
    if (user.role === "admin") {
      appsParams = {};
    } else {
      appsParams = { user_id: userId };
    }
    const appsResult = await db("apps").where(appsParams).orderBy("id", "desc");
    console.log(authResult);
    return {
      code: 200,
      message: "\u83B7\u53D6\u6210\u529F",
      data: {
        user: userData,
        stats: {
          apps: appTotal,
          authTotal: authResult.total || 0,
          authActive: authResult.active || 0,
          income: incomeData
        },
        recentAuth: recentAuthResult,
        apps: appsResult
      }
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u4EEA\u8868\u76D8\u6570\u636E\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"
    };
  }
});

export { dashboard_get as default };
//# sourceMappingURL=dashboard.get.mjs.map
