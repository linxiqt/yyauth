import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { ref, computed, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const loading = ref(true);
    const error = ref(null);
    const user = ref(null);
    const dashboardData = ref(null);
    const recentAuths = ref([]);
    const apps = ref([]);
    const currentDate = computed(() => {
      return (/* @__PURE__ */ new Date()).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
      });
    });
    const appCount = computed(() => apps.value.length);
    const isAdmin = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.role) === "admin";
    });
    const isAuthActive = (auth) => {
      return parseInt(auth.outtime * 1e3) > Date.now();
    };
    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1e3);
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getAppName = (appId) => {
      const app = apps.value.find((a) => a.id === appId);
      return app ? app.name : "未知应用";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-329a4bba><h1 class="text-2xl font-bold mb-6" data-v-329a4bba>仪表盘</h1>`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-12" data-v-329a4bba><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" data-v-329a4bba></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-v-329a4bba>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<div class="space-y-6" data-v-329a4bba><div class="card bg-gradient-to-r from-pink-500 to-purple-500 text-white" data-v-329a4bba><div class="flex flex-col md:flex-row md:items-center justify-between" data-v-329a4bba><div data-v-329a4bba><h2 class="text-2xl font-bold mb-2" data-v-329a4bba>欢迎回来，${ssrInterpolate((_a = user.value) == null ? void 0 : _a.username)}</h2><p data-v-329a4bba>今天是 ${ssrInterpolate(currentDate.value)}，祝您使用愉快！</p></div><div class="mt-4 md:mt-0" data-v-329a4bba><div class="bg-white bg-opacity-20 rounded-lg px-4 py-2" data-v-329a4bba><span class="text-sm" data-v-329a4bba>账户余额</span><div class="text-2xl font-bold" data-v-329a4bba>¥${ssrInterpolate(((_c = (_b = dashboardData.value) == null ? void 0 : _b.userInfo) == null ? void 0 : _c.balance) || 0)}</div></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-329a4bba><div class="card" data-v-329a4bba><div class="flex items-center justify-between" data-v-329a4bba><div data-v-329a4bba><h3 class="text-lg font-semibold text-gray-700" data-v-329a4bba>授权总数</h3><div class="text-3xl font-bold text-pink-600 mt-2" data-v-329a4bba>${ssrInterpolate(((_e = (_d = dashboardData.value) == null ? void 0 : _d.stats) == null ? void 0 : _e.authTotal) || 0)}</div></div><div class="bg-pink-100 rounded-full p-3" data-v-329a4bba><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-329a4bba><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-329a4bba></path></svg></div></div></div><div class="card" data-v-329a4bba><div class="flex items-center justify-between" data-v-329a4bba><div data-v-329a4bba><h3 class="text-lg font-semibold text-gray-700" data-v-329a4bba>有效授权</h3><div class="text-3xl font-bold text-green-600 mt-2" data-v-329a4bba>${ssrInterpolate(((_g = (_f = dashboardData.value) == null ? void 0 : _f.stats) == null ? void 0 : _g.authActive) || 0)}</div></div><div class="bg-green-100 rounded-full p-3" data-v-329a4bba><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-329a4bba><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-329a4bba></path></svg></div></div></div><div class="card" data-v-329a4bba><div class="flex items-center justify-between" data-v-329a4bba><div data-v-329a4bba><h3 class="text-lg font-semibold text-gray-700" data-v-329a4bba>应用数量</h3><div class="text-3xl font-bold text-purple-600 mt-2" data-v-329a4bba>${ssrInterpolate(appCount.value)}</div></div><div class="bg-purple-100 rounded-full p-3" data-v-329a4bba><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-329a4bba><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-329a4bba></path></svg></div></div></div></div><div class="card" data-v-329a4bba><h3 class="text-lg font-semibold text-gray-700 mb-4" data-v-329a4bba>快速操作</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-329a4bba>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/apps/new",
          class: "bg-pink-50 hover:bg-pink-100 p-4 rounded-lg text-center transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-pink-600 text-2xl mb-2" data-v-329a4bba${_scopeId}>📱</div><div class="font-medium" data-v-329a4bba${_scopeId}>创建应用</div>`);
            } else {
              return [
                createVNode("div", { class: "text-pink-600 text-2xl mb-2" }, "📱"),
                createVNode("div", { class: "font-medium" }, "创建应用")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/apps",
          class: "bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-center transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-purple-600 text-2xl mb-2" data-v-329a4bba${_scopeId}>📋</div><div class="font-medium" data-v-329a4bba${_scopeId}>管理应用</div>`);
            } else {
              return [
                createVNode("div", { class: "text-purple-600 text-2xl mb-2" }, "📋"),
                createVNode("div", { class: "font-medium" }, "管理应用")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-blue-600 text-2xl mb-2" data-v-329a4bba${_scopeId}>👤</div><div class="font-medium" data-v-329a4bba${_scopeId}>个人资料</div>`);
            } else {
              return [
                createVNode("div", { class: "text-blue-600 text-2xl mb-2" }, "👤"),
                createVNode("div", { class: "font-medium" }, "个人资料")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (isAdmin.value) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/settings",
            class: "bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="text-green-600 text-2xl mb-2" data-v-329a4bba${_scopeId}>⚙️</div><div class="font-medium" data-v-329a4bba${_scopeId}>系统设置</div>`);
              } else {
                return [
                  createVNode("div", { class: "text-green-600 text-2xl mb-2" }, "⚙️"),
                  createVNode("div", { class: "font-medium" }, "系统设置")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "#",
            class: "bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="text-green-600 text-2xl mb-2" data-v-329a4bba${_scopeId}>💰</div><div class="font-medium" data-v-329a4bba${_scopeId}>充值余额</div>`);
              } else {
                return [
                  createVNode("div", { class: "text-green-600 text-2xl mb-2" }, "💰"),
                  createVNode("div", { class: "font-medium" }, "充值余额")
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`</div></div><div class="card" data-v-329a4bba><h3 class="text-lg font-semibold text-gray-700 mb-4" data-v-329a4bba>最近授权记录</h3>`);
        if (recentAuths.value.length === 0) {
          _push(`<div class="text-center py-8 bg-gray-50 rounded" data-v-329a4bba><p class="text-gray-500" data-v-329a4bba>暂无授权记录</p></div>`);
        } else {
          _push(`<div class="overflow-x-auto" data-v-329a4bba><table class="min-w-full divide-y divide-gray-200" data-v-329a4bba><thead class="bg-gray-50" data-v-329a4bba><tr data-v-329a4bba><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-329a4bba>域名</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-329a4bba>应用</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-329a4bba>版本</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-329a4bba>状态</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-329a4bba>到期时间</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-329a4bba><!--[-->`);
          ssrRenderList(recentAuths.value, (auth) => {
            _push(`<tr data-v-329a4bba><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-v-329a4bba>${ssrInterpolate(auth.domain)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-v-329a4bba>${ssrInterpolate(getAppName(auth.app_id))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-v-329a4bba>${ssrInterpolate(auth.version)}</td><td class="px-6 py-4 whitespace-nowrap" data-v-329a4bba><span class="${ssrRenderClass([isAuthActive(auth) ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}" data-v-329a4bba>${ssrInterpolate(isAuthActive(auth) ? "有效" : "已过期")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-v-329a4bba>${ssrInterpolate(formatDate(auth.outtime))}</td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-329a4bba"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard.vue.mjs.map
