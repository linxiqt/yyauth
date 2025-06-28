import { c as defineEventHandler, v as verifyToken, g as getDb, r as readBody } from '../../../_/nitro.mjs';
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

const homepage = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        success: false,
        message: "\u672A\u6388\u6743\u8BBF\u95EE"
      };
    }
    if (user.role !== "admin") {
      return {
        success: false,
        message: "\u6743\u9650\u4E0D\u8DB3\uFF0C\u53EA\u6709\u7BA1\u7406\u5458\u53EF\u4EE5\u4FEE\u6539\u4E3B\u9875\u8BBE\u7F6E"
      };
    }
    const db = getDb();
    if (!db) {
      console.error("\u83B7\u53D6\u6570\u636E\u5E93\u8FDE\u63A5\u5931\u8D25");
      return {
        success: false,
        message: "\u6570\u636E\u5E93\u8FDE\u63A5\u5931\u8D25"
      };
    }
    if (event.method === "GET") {
      try {
        const settings = await db("settings").whereIn("key", [
          "home_sections",
          "hero_content",
          "features_content",
          "pricing_content",
          "testimonials_content",
          "contact_content",
          "reseller_pricing_content",
          "gallery_content"
        ]).select("*");
        if (!settings || settings.length === 0) {
          return {
            success: true,
            data: {
              home_sections: ["hero", "features", "pricing", "testimonials"],
              hero_content: {
                title: "\u7B80\u6388\u6743 - \u4E13\u4E1A\u7684\u5E94\u7528\u6388\u6743\u7BA1\u7406\u5E73\u53F0",
                subtitle: "\u8F7B\u677E\u7BA1\u7406\u60A8\u7684\u5E94\u7528\u6388\u6743\uFF0C\u63D0\u9AD8\u76C8\u5229\u80FD\u529B\uFF0C\u4FDD\u62A4\u77E5\u8BC6\u4EA7\u6743",
                primaryButton: {
                  show: true,
                  text: "\u7ACB\u5373\u5F00\u59CB",
                  link: "/register"
                },
                secondaryButton: {
                  show: true,
                  text: "\u4E86\u89E3\u66F4\u591A",
                  link: "/#features"
                }
              },
              features_content: {
                title: "\u5F3A\u5927\u7684\u529F\u80FD",
                items: [
                  {
                    icon: "\u{1F512}",
                    title: "\u5B89\u5168\u53EF\u9760",
                    description: "\u591A\u5C42\u52A0\u5BC6\u6280\u672F\uFF0C\u786E\u4FDD\u60A8\u7684\u6388\u6743\u4FE1\u606F\u5B89\u5168\u65E0\u5FE7"
                  },
                  {
                    icon: "\u{1F4F1}",
                    title: "\u591A\u7AEF\u652F\u6301",
                    description: "\u652F\u6301\u7F51\u9875\u3001\u684C\u9762\u548C\u79FB\u52A8\u5E94\u7528\uFF0C\u968F\u65F6\u968F\u5730\u7BA1\u7406\u6388\u6743"
                  },
                  {
                    icon: "\u26A1",
                    title: "\u9AD8\u6548\u5FEB\u6377",
                    description: "\u7B80\u5316\u6388\u6743\u6D41\u7A0B\uFF0C\u4E00\u952E\u751F\u6210\u6388\u6743\u6587\u4EF6\uFF0C\u8282\u7701\u60A8\u7684\u5B9D\u8D35\u65F6\u95F4"
                  }
                ]
              },
              pricing_content: {
                title: "\u9009\u62E9\u5408\u9002\u7684\u65B9\u6848",
                plans: [
                  {
                    name: "\u57FA\u7840\u7248",
                    price: 99,
                    features: [
                      "\u6700\u591A\u7BA1\u7406 3 \u4E2A\u5E94\u7528",
                      "\u57FA\u7840\u6388\u6743\u7BA1\u7406",
                      "\u6807\u51C6\u5BA2\u6237\u652F\u6301",
                      "\u65E0\u8BBF\u95EE\u9650\u5236"
                    ],
                    buttonText: "\u9009\u62E9\u57FA\u7840\u7248",
                    link: "/register?plan=basic",
                    featured: false
                  },
                  {
                    name: "\u4E13\u4E1A\u7248",
                    price: 299,
                    features: [
                      "\u6700\u591A\u7BA1\u7406 10 \u4E2A\u5E94\u7528",
                      "\u9AD8\u7EA7\u6388\u6743\u7BA1\u7406",
                      "\u4F18\u5148\u5BA2\u6237\u652F\u6301",
                      "\u6570\u636E\u5206\u6790",
                      "\u516C\u544A\u7BA1\u7406"
                    ],
                    buttonText: "\u9009\u62E9\u4E13\u4E1A\u7248",
                    link: "/register?plan=pro",
                    featured: true
                  }
                ]
              },
              testimonials_content: {
                title: "\u7528\u6237\u8BC4\u4EF7",
                items: [
                  {
                    avatar: "/img/avatar1.jpg",
                    name: "\u5F20\u5148\u751F",
                    position: "\u8F6F\u4EF6\u5F00\u53D1\u8005",
                    content: "\u4F7F\u7528\u7B80\u6388\u6743\u7CFB\u7EDF\u540E\uFF0C\u6211\u7684\u8F6F\u4EF6\u76D7\u7248\u95EE\u9898\u5F97\u5230\u4E86\u6709\u6548\u63A7\u5236\uFF0C\u9500\u552E\u989D\u63D0\u9AD8\u4E8630%\u3002\u7CFB\u7EDF\u64CD\u4F5C\u7B80\u5355\uFF0C\u529F\u80FD\u5F3A\u5927\uFF0C\u5F3A\u70C8\u63A8\u8350\uFF01"
                  },
                  {
                    avatar: "/img/avatar2.jpg",
                    name: "\u674E\u5973\u58EB",
                    position: "APP\u5F00\u53D1\u516C\u53F8CEO",
                    content: "\u4F5C\u4E3A\u4E00\u5BB6\u4E2D\u5C0F\u578B\u5F00\u53D1\u516C\u53F8\uFF0C\u7B80\u6388\u6743\u7CFB\u7EDF\u4E3A\u6211\u4EEC\u63D0\u4F9B\u4E86\u4E13\u4E1A\u7EA7\u7684\u6388\u6743\u89E3\u51B3\u65B9\u6848\uFF0C\u4EF7\u683C\u5374\u975E\u5E38\u5408\u7406\u3002\u5BA2\u6237\u670D\u52A1\u4E5F\u5F88\u8D34\u5FC3\u3002"
                  }
                ]
              },
              contact_content: {
                title: "\u8054\u7CFB\u6211\u4EEC",
                items: [
                  {
                    icon: "\u{1F4E7}",
                    text: "support@sakura-auth.com"
                  },
                  {
                    icon: "\u{1F4DE}",
                    text: "+86 123 4567 8910"
                  },
                  {
                    icon: "\u{1F3E2}",
                    text: "\u4E2D\u56FD \xB7 \u4E0A\u6D77\u5E02\u6D66\u4E1C\u65B0\u533A\u79D1\u6280\u56ED\u533A"
                  }
                ]
              }
            }
          };
        }
        const settingsMap = {};
        for (const setting of settings) {
          let value = setting.value;
          if (setting.type === "boolean") {
            value = value === "true";
          } else if (setting.type === "number") {
            value = parseFloat(value);
          } else if (setting.type === "json") {
            try {
              value = JSON.parse(value);
            } catch (e) {
              console.error(`\u89E3\u6790JSON\u8BBE\u7F6E\u5931\u8D25: ${setting.key}`, e);
              if (setting.key === "home_sections") {
                value = ["hero", "features", "pricing", "testimonials"];
              }
            }
          }
          settingsMap[setting.key] = value;
        }
        if (!settingsMap.home_sections) settingsMap.home_sections = ["hero", "features", "pricing", "testimonials"];
        return {
          success: true,
          data: settingsMap
        };
      } catch (dbError) {
        console.error("\u67E5\u8BE2\u8BBE\u7F6E\u8868\u5931\u8D25:", dbError);
        return {
          success: false,
          message: "\u67E5\u8BE2\u8BBE\u7F6E\u5931\u8D25"
        };
      }
    }
    if (event.method === "POST") {
      try {
        const body = await readBody(event);
        if (!body || typeof body !== "object") {
          return {
            success: false,
            message: "\u65E0\u6548\u7684\u8BF7\u6C42\u6570\u636E"
          };
        }
        const updates = [];
        if (Array.isArray(body.home_sections)) {
          updates.push({
            key: "home_sections",
            value: JSON.stringify(body.home_sections),
            type: "json"
          });
        }
        if (body.hero_content) {
          updates.push({
            key: "hero_content",
            value: JSON.stringify(body.hero_content),
            type: "json"
          });
        }
        if (body.features_content) {
          updates.push({
            key: "features_content",
            value: JSON.stringify(body.features_content),
            type: "json"
          });
        }
        if (body.pricing_content) {
          updates.push({
            key: "pricing_content",
            value: JSON.stringify(body.pricing_content),
            type: "json"
          });
        }
        if (body.testimonials_content) {
          updates.push({
            key: "testimonials_content",
            value: JSON.stringify(body.testimonials_content),
            type: "json"
          });
        }
        if (body.contact_content) {
          updates.push({
            key: "contact_content",
            value: JSON.stringify(body.contact_content),
            type: "json"
          });
        }
        if (body.reseller_pricing_content) {
          updates.push({
            key: "reseller_pricing_content",
            value: JSON.stringify(body.reseller_pricing_content),
            type: "json"
          });
        }
        if (body.gallery_content) {
          updates.push({
            key: "gallery_content",
            value: JSON.stringify(body.gallery_content),
            type: "json"
          });
        }
        if (updates.length === 0) {
          return {
            success: false,
            message: "\u6CA1\u6709\u9700\u8981\u66F4\u65B0\u7684\u5185\u5BB9"
          };
        }
        await db.transaction(async (trx) => {
          for (const update of updates) {
            const existing = await trx("settings").where("key", update.key).first();
            if (existing) {
              await trx("settings").where("key", update.key).update({
                value: update.value,
                type: update.type,
                updated_at: /* @__PURE__ */ new Date()
              });
            } else {
              await trx("settings").insert({
                key: update.key,
                value: update.value,
                type: update.type,
                created_at: /* @__PURE__ */ new Date(),
                updated_at: /* @__PURE__ */ new Date()
              });
            }
          }
        });
        return {
          success: true,
          message: "\u8BBE\u7F6E\u66F4\u65B0\u6210\u529F"
        };
      } catch (dbError) {
        console.error("\u66F4\u65B0\u8BBE\u7F6E\u5931\u8D25:", dbError);
        return {
          success: false,
          message: "\u66F4\u65B0\u8BBE\u7F6E\u5931\u8D25"
        };
      }
    }
    return {
      success: false,
      message: "\u4E0D\u652F\u6301\u7684HTTP\u65B9\u6CD5"
    };
  } catch (error) {
    console.error("\u5904\u7406\u4E3B\u9875\u8BBE\u7F6E\u8BF7\u6C42\u5931\u8D25:", error);
    return {
      success: false,
      message: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF"
    };
  }
});

export { homepage as default };
//# sourceMappingURL=homepage.mjs.map
