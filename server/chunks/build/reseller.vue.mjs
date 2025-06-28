import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { ref, reactive, useSSRContext } from 'vue';

const _sfc_main = {
  __name: "reseller",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const error = ref(null);
    const reseller = ref(null);
    const hasSearched = ref(false);
    const queryForm = reactive({
      username: ""
    });
    const getRoleColor = (role) => {
      const colorMap = {
        "admin": "bg-purple-500",
        "level1": "bg-blue-500",
        "level2": "bg-green-500",
        "level3": "bg-yellow-500",
        "user": "bg-gray-500"
      };
      return colorMap[role] || "bg-gray-500";
    };
    const getRoleBadgeClass = (role) => {
      const classMap = {
        "admin": "bg-purple-100 text-purple-800",
        "level1": "bg-blue-100 text-blue-800",
        "level2": "bg-green-100 text-green-800",
        "level3": "bg-yellow-100 text-yellow-800",
        "user": "bg-gray-100 text-gray-800"
      };
      return classMap[role] || "bg-gray-100 text-gray-800";
    };
    const formatRole = (role) => {
      const roleMap = {
        "admin": "管理员",
        "user": "普通用户",
        "level1": "一级代理",
        "level2": "二级代理",
        "level3": "三级代理"
      };
      return roleMap[role] || role;
    };
    const formatDate = (dateString) => {
      if (!dateString) return "未设置";
      const date = new Date(dateString);
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><h1 class="text-2xl font-bold text-gray-800">授权商查询</h1><p class="text-gray-600 mt-1">查询授权商信息和授权记录</p></div><div class="bg-white shadow-md rounded-lg p-6 mb-6"><form class="space-y-4"><div><label for="username" class="block text-sm font-medium text-gray-700 mb-1">授权商用户名</label><input type="text" id="username"${ssrRenderAttr("value", queryForm.username)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="输入授权商用户名" required></div><div class="flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(loading.value || !queryForm.username) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (loading.value) {
        _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 查询中... </span>`);
      } else {
        _push(`<span>查询授权商</span>`);
      }
      _push(`</button></div></form></div>`);
      if (error.value) {
        _push(`<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5v-1h2v1h-2zm0-3V7h2v1h-2z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700">${ssrInterpolate(error.value)}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (reseller.value) {
        _push(`<div class="space-y-6"><div class="bg-white shadow-lg rounded-xl overflow-hidden"><div class="${ssrRenderClass([getRoleColor(reseller.value.role), "h-2"])}"></div><div class="p-6"><div class="flex items-center justify-between mb-6"><div class="flex items-center"><div class="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mr-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><div><h3 class="text-xl font-semibold text-gray-800">${ssrInterpolate(reseller.value.username)}</h3><p class="text-sm text-gray-500">ID: ${ssrInterpolate(reseller.value.id)}</p></div></div><span class="${ssrRenderClass([getRoleBadgeClass(reseller.value.role), "px-3 py-1 rounded-full text-sm font-medium"])}">${ssrInterpolate(formatRole(reseller.value.role))}</span></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"><div class="bg-gray-50 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-pink-600">${ssrInterpolate(reseller.value.stats.total)}</div><div class="text-sm text-gray-600">总授权数</div></div><div class="bg-gray-50 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-green-600">${ssrInterpolate(reseller.value.stats.active)}</div><div class="text-sm text-gray-600">有效授权</div></div><div class="bg-gray-50 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-blue-600">${ssrInterpolate(reseller.value.apps.length)}</div><div class="text-sm text-gray-600">应用数量</div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="text-gray-600">余额: ¥${ssrInterpolate(reseller.value.balance)}</span></div><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-gray-600">注册时间: ${ssrInterpolate(formatDate(reseller.value.created_at))}</span></div></div></div>`);
        if (reseller.value.apps.length > 0) {
          _push(`<div class="mt-8"><h4 class="text-lg font-semibold text-gray-800 mb-4">应用列表</h4><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
          ssrRenderList(reseller.value.apps, (app) => {
            _push(`<div class="bg-gray-50 rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><div><h5 class="font-medium text-gray-800">${ssrInterpolate(app.name)}</h5><p class="text-sm text-gray-500">${ssrInterpolate(formatDate(app.created_at))}</p></div></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else if (hasSearched.value && !loading.value && !error.value) {
        _push(`<div class="bg-white shadow-md rounded-lg p-8 text-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><h3 class="text-lg font-medium text-gray-900">未找到授权商</h3><p class="mt-2 text-sm text-gray-500"> 没有找到该用户名的授权商。请检查用户名是否正确。 </p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/reseller.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reseller.vue.mjs.map
