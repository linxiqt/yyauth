import { c as defineEventHandler, w as getRequestHost, l as getRequestIP } from '../../../_/nitro.mjs';
import axios from 'axios';
import AES from 'ar-aes';
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

const currentVersion = "1.0.1";
const check = defineEventHandler(async (event) => {
  const host = getRequestHost(event);
  const ip = getRequestIP(event);
  const md5 = "license_" + host;
  try {
    const checkHost = "https://yy.cmail.fun/api/query";
    let response = await axios.get(checkHost, {
      params: {
        domain: encodeURIComponent(host),
        ip,
        md5,
        version: currentVersion
      }
    });
    let data = response.data;
    let domainInfo = data.data && data.data.length > 0 ? data.data[0] : { domain: host, local_ip: ip };
    if (data.success && domainInfo) {
      let outword = "";
      if (data.md5) {
        outword = AES.AES.decrypt(data.md5, md5, "1234567891234567");
      }
      let now = (/* @__PURE__ */ new Date()).getDate().toString();
      now = now.replace(/\s/g, "");
      outword = outword.toString().replace(/\s/g, "");
      if (domainInfo.ok) {
        return {
          status: true,
          message: domainInfo.quota,
          timeMessage: new Date(
            parseInt(domainInfo.outtime)
          ).toLocaleDateString(),
          data: {
            domain: host,
            ip: domainInfo.local_ip,
            version: currentVersion,
            expire_date: new Date(
              parseInt(domainInfo.outtime)
            ).toLocaleDateString(),
            quota: domainInfo.quota
          }
        };
      } else {
        return {
          status: false,
          message: "\u6388\u6743\u5DF2\u8FC7\u671F" + (outword == now ? "" : "\uFF0C\u7248\u672C\u9A8C\u8BC1\u5931\u8D25"),
          data: {
            domain: host,
            ip: domainInfo.local_ip,
            version: currentVersion,
            quota: "\u5DF2\u8FC7\u671F",
            expire_date: "\u5DF2\u8FC7\u671F"
          }
        };
      }
    } else {
      console.log("\u6388\u6743\u4FE1\u606F\u83B7\u53D6\u5931\u8D25", domainInfo);
      return {
        status: false,
        message: "\u6388\u6743\u4FE1\u606F\u83B7\u53D6\u5931\u8D25",
        data: {
          domain: host,
          ip: ip || (domainInfo == null ? void 0 : domainInfo.local_ip),
          version: currentVersion,
          quota: "\u83B7\u53D6\u5931\u8D25",
          expire_date: "\u5DF2\u8FC7\u671F"
        }
      };
    }
  } catch (error) {
    console.error("\u6388\u6743\u68C0\u6D4B\u5931\u8D25:", error);
    return {
      status: false,
      message: "\u6388\u6743\u68C0\u6D4B\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5",
      data: {
        domain: host,
        ip,
        version: currentVersion,
        quota: "\u68C0\u6D4B\u5931\u8D25",
        expire_date: "\u68C0\u6D4B\u5931\u8D25"
      }
    };
  }
});

export { check as default };
//# sourceMappingURL=check.mjs.map
