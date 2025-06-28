import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { ref, reactive, computed, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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
import './server.mjs';

const _sfc_main = {
  __name: "list",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const loading = ref(false);
    const error = ref(null);
    const auths = ref([]);
    const apps = ref([]);
    const currentPage = ref(1);
    const perPage = ref(10);
    const totalItems = ref(0);
    const showDeleteModal = ref(false);
    const authToDelete = ref(null);
    const deleting = ref(false);
    const filters = reactive({
      appId: "",
      status: "",
      search: ""
    });
    const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
    const pageNumbers = computed(() => {
      const pages = [];
      const maxVisiblePages = 5;
      if (totalPages.value <= maxVisiblePages) {
        for (let i = 1; i <= totalPages.value; i++) {
          pages.push(i);
        }
      } else {
        const leftSide = Math.floor(maxVisiblePages / 2);
        const rightSide = maxVisiblePages - leftSide - 1;
        if (currentPage.value <= leftSide + 1) {
          for (let i = 1; i <= maxVisiblePages - 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages.value);
        } else if (currentPage.value >= totalPages.value - rightSide) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages.value - maxVisiblePages + 2; i <= totalPages.value; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push("...");
          for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages.value);
        }
      }
      return pages;
    });
    const isExpired = (auth) => {
      const now = (/* @__PURE__ */ new Date()).getTime();
      return auth.outtime * 1e3 < now;
    };
    const getStatusText = (auth) => {
      if (isExpired(auth)) {
        return "已过期";
      } else {
        return "有效";
      }
    };
    const getStatusBadgeClass = (auth) => {
      return isExpired(auth) ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
    };
    const formatDate = (timestamp) => {
      if (!timestamp) return "未设置";
      const date = new Date(timestamp * 1e3);
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    let token = ref(null);
    let user = ref(null);
    const isLoggedIn = computed(() => !!token.value);
    const isAdmin = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.role) === "admin";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6 flex justify-between items-center"><div><h1 class="text-2xl font-bold text-gray-800">授权列表</h1><p class="text-gray-600 mt-1">管理您的所有授权</p></div>`);
      if (isAdmin.value && isLoggedIn.value) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/create",
          class: "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 创建授权 `);
            } else {
              return [
                createTextVNode(" 创建授权 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (loading.value) {
        _push(`<div class="flex justify-center items-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5v-1h2v1h-2zm0-3V7h2v1h-2z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700">${ssrInterpolate(error.value)}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white shadow-md rounded-lg p-4 mb-6"><div class="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0"><div class="flex-1"><label for="app-filter" class="block text-sm font-medium text-gray-700 mb-1">应用</label><select id="app-filter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.appId) ? ssrLooseContain(filters.appId, "") : ssrLooseEqual(filters.appId, "")) ? " selected" : ""}>全部应用</option><!--[-->`);
      ssrRenderList(apps.value, (app) => {
        _push(`<option${ssrRenderAttr("value", app.id)}${ssrIncludeBooleanAttr(Array.isArray(filters.appId) ? ssrLooseContain(filters.appId, app.id) : ssrLooseEqual(filters.appId, app.id)) ? " selected" : ""}>${ssrInterpolate(app.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="flex-1"><label for="status-filter" class="block text-sm font-medium text-gray-700 mb-1">状态</label><select id="status-filter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.status) ? ssrLooseContain(filters.status, "") : ssrLooseEqual(filters.status, "")) ? " selected" : ""}>全部状态</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(filters.status) ? ssrLooseContain(filters.status, "active") : ssrLooseEqual(filters.status, "active")) ? " selected" : ""}>有效</option><option value="expired"${ssrIncludeBooleanAttr(Array.isArray(filters.status) ? ssrLooseContain(filters.status, "expired") : ssrLooseEqual(filters.status, "expired")) ? " selected" : ""}>已过期</option></select></div><div class="flex-1"><label for="search" class="block text-sm font-medium text-gray-700 mb-1">搜索</label><input type="text" id="search"${ssrRenderAttr("value", filters.search)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="域名或联系方式"></div><div class="flex space-x-2"><button class="px-4 py-2 border border-pink-300 rounded-md shadow-sm text-sm font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 focus:outline-none"> 筛选 </button><button class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"> 重置 </button></div></div></div>`);
      if (!loading.value && !error.value) {
        _push(`<div class="bg-white shadow-md rounded-lg overflow-hidden">`);
        if (auths.value.length > 0) {
          _push(`<div><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 域名 </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 应用 </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 版本 </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 联系方式 </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 到期时间 </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 状态 </th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> 操作 </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
          ssrRenderList(auths.value, (auth) => {
            var _a2, _b;
            _push(`<tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${ssrInterpolate(auth.domain)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><div class="flex items-center">`);
            if ((_a2 = auth.app) == null ? void 0 : _a2.icon) {
              _push(`<div class="flex-shrink-0 h-6 w-6 mr-2"><img class="h-6 w-6 rounded"${ssrRenderAttr("src", auth.app.icon)} alt=""></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div>${ssrInterpolate(((_b = apps.value.find((app) => app.id === auth.id)) == null ? void 0 : _b.name) || "未知应用")}</div></div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(auth.version || "未指定")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(auth.qq || "未提供")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(formatDate(auth.outtime))}</td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([getStatusBadgeClass(auth), "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}">${ssrInterpolate(getStatusText(auth))}</span></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div class="flex justify-end space-x-2"><button class="text-pink-600 hover:text-pink-900"> 编辑 </button><button class="text-red-600 hover:text-red-900"> 删除 </button></div></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
          if (totalPages.value > 1) {
            _push(`<div class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"><div class="flex-1 flex justify-between sm:hidden"><button${ssrIncludeBooleanAttr(currentPage.value <= 1) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> 上一页 </button><button${ssrIncludeBooleanAttr(currentPage.value >= totalPages.value) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> 下一页 </button></div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"><div><p class="text-sm text-gray-700"> 显示第 <span class="font-medium">${ssrInterpolate((currentPage.value - 1) * perPage.value + 1)}</span> 到 <span class="font-medium">${ssrInterpolate(Math.min(currentPage.value * perPage.value, totalItems.value))}</span> 条，共 <span class="font-medium">${ssrInterpolate(totalItems.value)}</span> 条结果 </p></div><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"><button${ssrIncludeBooleanAttr(currentPage.value <= 1) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"><span class="sr-only">上一页</span><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></button><!--[-->`);
            ssrRenderList(pageNumbers.value, (page) => {
              _push(`<button class="${ssrRenderClass([
                typeof page === "number" && page === currentPage.value ? "z-10 bg-pink-50 border-pink-500 text-pink-600" : page === "..." ? "bg-white border-gray-300 text-gray-500" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              ])}">${ssrInterpolate(page)}</button>`);
            });
            _push(`<!--]--><button${ssrIncludeBooleanAttr(currentPage.value >= totalPages.value) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"><span class="sr-only">下一页</span><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></button></nav></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="py-12 text-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><h3 class="text-lg font-medium text-gray-900">暂无授权数据</h3><p class="mt-2 text-sm text-gray-500 max-w-md mx-auto"> 您尚未创建任何授权记录。点击右上角&quot;创建授权&quot;按钮开始创建您的第一个授权。 </p><div class="mt-6">`);
          if (isAdmin.value && isLoggedIn.value) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/auth/create",
              class: "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` 创建授权 `);
                } else {
                  return [
                    createTextVNode(" 创建授权 ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showDeleteModal.value) {
        _push(`<div class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"><div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div><span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span><div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"><div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start"><div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"><svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"><h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title"> 删除授权 </h3><div class="mt-2"><p class="text-sm text-gray-500"> 您确定要删除 <span class="font-medium text-gray-700">${ssrInterpolate((_a = authToDelete.value) == null ? void 0 : _a.domain)}</span> 的授权吗？此操作无法撤销。 </p></div></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="button"${ssrIncludeBooleanAttr(deleting.value) ? " disabled" : ""} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (deleting.value) {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 删除中... </span>`);
        } else {
          _push(`<span>删除</span>`);
        }
        _push(`</button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> 取消 </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=list.vue.mjs.map
