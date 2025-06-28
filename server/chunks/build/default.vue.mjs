import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { ref, computed, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
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

const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    const appsMenuOpen = ref(false);
    const accountMenuOpen = ref(false);
    const authMenuOpen = ref(false);
    const token = ref(null);
    const user = ref(null);
    const settings = ref(null);
    useRouter();
    const isLoggedIn = computed(() => !!token.value);
    const isAdmin = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.role) === "admin";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-gray-50" }, _attrs))} data-v-e5519cde><header class="bg-white shadow-md" data-v-e5519cde><div class="container mx-auto px-4" data-v-e5519cde><div class="flex justify-between items-center py-4" data-v-e5519cde>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center space-x-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`<img${ssrRenderAttr(
              "src",
              ((_a2 = settings.value) == null ? void 0 : _a2.site_logo) || "data:image/jpeg;base64,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"
            )} class="h-8 w-8 text-pink-500" data-v-e5519cde${_scopeId}><span class="text-lg font-bold text-pink-600" data-v-e5519cde${_scopeId}>${ssrInterpolate(((_b2 = settings.value) == null ? void 0 : _b2.site_name) || "简授权系统")}</span>`);
          } else {
            return [
              createVNode("img", {
                src: ((_c2 = settings.value) == null ? void 0 : _c2.site_logo) || "data:image/jpeg;base64,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",
                class: "h-8 w-8 text-pink-500"
              }, null, 8, ["src"]),
              createVNode("span", { class: "text-lg font-bold text-pink-600" }, toDisplayString(((_d2 = settings.value) == null ? void 0 : _d2.site_name) || "简授权系统"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex space-x-1" data-v-e5519cde>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-pink-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (isLoggedIn.value) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/buy",
          class: "nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-pink-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`购买授权`);
            } else {
              return [
                createTextVNode("购买授权")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (isAdmin.value) {
          _push(`<div class="relative dropdown-menu group" data-v-e5519cde><button class="nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-pink-50 flex items-center" data-v-e5519cde> 应用管理 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e5519cde><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-e5519cde></path></svg></button><div class="dropdown-content absolute left-0 w-48 py-2 mt-1 bg-white rounded-md shadow-lg z-10 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300" data-v-e5519cde>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/apps",
            class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`应用列表`);
              } else {
                return [
                  createTextVNode("应用列表")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/apps/new",
            class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`创建应用`);
              } else {
                return [
                  createTextVNode("创建应用")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="relative dropdown-menu group" data-v-e5519cde><button class="nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-pink-50 flex items-center" data-v-e5519cde> 授权管理 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e5519cde><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-e5519cde></path></svg></button><div class="dropdown-content absolute left-0 w-48 py-2 mt-1 bg-white rounded-md shadow-lg z-10 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300" data-v-e5519cde>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/query",
          class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`授权查询`);
            } else {
              return [
                createTextVNode("授权查询")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/reseller",
          class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`授权商查询`);
            } else {
              return [
                createTextVNode("授权商查询")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/list",
          class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`授权列表`);
            } else {
              return [
                createTextVNode("授权列表")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (isAdmin.value) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/code",
            class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`生成授权代码`);
              } else {
                return [
                  createTextVNode("生成授权代码")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/docs/api",
          class: "nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-pink-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`API文档`);
            } else {
              return [
                createTextVNode("API文档")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="relative dropdown-menu group" data-v-e5519cde><button class="nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-pink-50 flex items-center" data-v-e5519cde> 我的账户 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e5519cde><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-e5519cde></path></svg></button><div class="dropdown-content absolute right-0 w-48 py-2 mt-1 bg-white rounded-md shadow-lg z-10 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300" data-v-e5519cde>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard",
          class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`控制面板`);
            } else {
              return [
                createTextVNode("控制面板")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`个人资料`);
            } else {
              return [
                createTextVNode("个人资料")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (isAdmin.value) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/settings",
            class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`系统设置`);
              } else {
                return [
                  createTextVNode("系统设置")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/users",
            class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`用户管理`);
              } else {
                return [
                  createTextVNode("用户管理")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/settings/homepage",
            class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`主页设置`);
              } else {
                return [
                  createTextVNode("主页设置")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/license",
            class: "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`程序授权`);
              } else {
                return [
                  createTextVNode("程序授权")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="border-t border-gray-100 my-1" data-v-e5519cde></div><button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50" data-v-e5519cde> 退出登录 </button></div></div><!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-pink-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`登录`);
            } else {
              return [
                createTextVNode("登录")
              ];
            }
          }),
          _: 1
        }, _parent));
        if ((_a = settings.value) == null ? void 0 : _a.allow_register) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/register",
            class: "nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-pink-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`注册`);
              } else {
                return [
                  createTextVNode("注册")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</nav><button class="md:hidden p-2 rounded-md text-gray-600 hover:text-pink-600 focus:outline-none" data-v-e5519cde><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e5519cde><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-e5519cde></path></svg></button></div></div>`);
      if (mobileMenuOpen.value) {
        _push(`<div class="md:hidden bg-white py-2 shadow-inner border-t border-gray-100" data-v-e5519cde><div class="container mx-auto px-4 divide-y divide-gray-100" data-v-e5519cde>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "block py-3 text-gray-700 hover:text-pink-600 font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`首页`);
            } else {
              return [
                createTextVNode("首页")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (isLoggedIn.value) {
          _push(`<!--[--><div class="py-2" data-v-e5519cde><button class="flex items-center w-full text-left text-gray-700 hover:text-pink-600 py-2 font-medium" data-v-e5519cde> 应用管理 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e5519cde><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", appsMenuOpen.value ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7")} data-v-e5519cde></path></svg></button>`);
          if (appsMenuOpen.value) {
            _push(`<div class="mt-2 pl-4 space-y-2" data-v-e5519cde>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/apps",
              class: "block py-2 text-gray-700 hover:text-pink-600"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`应用列表`);
                } else {
                  return [
                    createTextVNode("应用列表")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/apps/new",
              class: "block py-2 text-gray-700 hover:text-pink-600"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`创建应用`);
                } else {
                  return [
                    createTextVNode("创建应用")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="py-2 border-t border-gray-100" data-v-e5519cde><button class="flex items-center w-full text-left text-gray-700 hover:text-pink-600 py-2 font-medium" data-v-e5519cde> 授权管理 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e5519cde><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", authMenuOpen.value ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7")} data-v-e5519cde></path></svg></button>`);
          if (authMenuOpen.value) {
            _push(`<div class="mt-2 pl-4 space-y-2" data-v-e5519cde>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/auth/query",
              class: "block py-2 text-gray-700 hover:text-pink-600"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`授权查询`);
                } else {
                  return [
                    createTextVNode("授权查询")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/auth/reseller",
              class: "block py-2 text-gray-700 hover:text-pink-600"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`授权商查询`);
                } else {
                  return [
                    createTextVNode("授权商查询")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/auth/list",
              class: "block py-2 text-gray-700 hover:text-pink-600"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`授权列表`);
                } else {
                  return [
                    createTextVNode("授权列表")
                  ];
                }
              }),
              _: 1
            }, _parent));
            if (isAdmin.value) {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/code",
                class: "block py-2 text-gray-700 hover:text-pink-600"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`授权验证代码`);
                  } else {
                    return [
                      createTextVNode("授权验证代码")
                    ];
                  }
                }),
                _: 1
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/buy",
            class: "block py-3 text-gray-700 hover:text-pink-600 font-medium border-t border-gray-100"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`购买授权`);
              } else {
                return [
                  createTextVNode("购买授权")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/docs/api",
            class: "block py-3 text-gray-700 hover:text-pink-600 font-medium border-t border-gray-100"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`API文档`);
              } else {
                return [
                  createTextVNode("API文档")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="py-2 border-t border-gray-100" data-v-e5519cde><button class="flex items-center w-full text-left text-gray-700 hover:text-pink-600 py-2 font-medium" data-v-e5519cde> 我的账户 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e5519cde><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", accountMenuOpen.value ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7")} data-v-e5519cde></path></svg></button>`);
          if (accountMenuOpen.value) {
            _push(`<div class="mt-2 pl-4 space-y-2" data-v-e5519cde>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/dashboard",
              class: "block py-2 text-gray-700 hover:text-pink-600"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`控制面板`);
                } else {
                  return [
                    createTextVNode("控制面板")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/profile",
              class: "block py-2 text-gray-700 hover:text-pink-600"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`个人资料`);
                } else {
                  return [
                    createTextVNode("个人资料")
                  ];
                }
              }),
              _: 1
            }, _parent));
            if (isAdmin.value) {
              _push(`<!--[-->`);
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/settings",
                class: "block py-2 text-gray-700 hover:text-pink-600"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`系统设置`);
                  } else {
                    return [
                      createTextVNode("系统设置")
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/users",
                class: "block py-2 text-gray-700 hover:text-pink-600"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`用户管理`);
                  } else {
                    return [
                      createTextVNode("用户管理")
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/settings/homepage",
                class: "block py-2 text-gray-700 hover:text-pink-600"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`主页设置`);
                  } else {
                    return [
                      createTextVNode("主页设置")
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/license",
                class: "block py-2 text-gray-700 hover:text-pink-600"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`程序授权`);
                  } else {
                    return [
                      createTextVNode("程序授权")
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push(`<!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`<button class="block w-full text-left py-2 text-gray-700 hover:text-pink-600" data-v-e5519cde> 退出登录 </button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!--]-->`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/login",
            class: "block py-3 text-gray-700 hover:text-pink-600 font-medium"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`登录`);
              } else {
                return [
                  createTextVNode("登录")
                ];
              }
            }),
            _: 1
          }, _parent));
          if ((_b = settings.value) == null ? void 0 : _b.allow_register) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/register",
              class: "block py-3 text-gray-700 hover:text-pink-600 font-medium"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`注册`);
                } else {
                  return [
                    createTextVNode("注册")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><main class="flex-grow" data-v-e5519cde><div class="container mx-auto px-4 py-6" data-v-e5519cde>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main><footer class="bg-white border-t border-gray-200" data-v-e5519cde><div class="container mx-auto px-4 py-6" data-v-e5519cde><div class="text-center text-gray-600 text-sm" data-v-e5519cde><p data-v-e5519cde> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} ${ssrInterpolate(((_c = settings.value) == null ? void 0 : _c.site_name) || "简授权")}. 保留所有权利. </p>`);
      if ((_d = settings.value) == null ? void 0 : _d.beian_number) {
        _push(`<p class="mt-1" data-v-e5519cde><a href="https://beian.miit.gov.cn/" target="_blank" class="hover:text-pink-500" data-v-e5519cde>${ssrInterpolate(settings.value.beian_number)}</a></p>`);
      } else {
        _push(`<!---->`);
      }
      if ((_e = settings.value) == null ? void 0 : _e.footer_code) {
        _push(`<div class="mt-2" data-v-e5519cde>${settings.value.footer_code ?? ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e5519cde"]]);

export { _default as default };
//# sourceMappingURL=default.vue.mjs.map
