import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { ref, reactive, useSSRContext } from 'vue';

const _sfc_main = {
  __name: "query",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const error = ref(null);
    const result = ref(null);
    const hasSearched = ref(false);
    const queryForm = reactive({
      domain: "",
      app_id: ""
    });
    const apps = ref([]);
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><h1 class="text-2xl font-bold text-gray-800">授权查询</h1><p class="text-gray-600 mt-1">查询授权状态和详细信息</p></div><div class="bg-white shadow-md rounded-lg p-6 mb-6"><form class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="domain" class="block text-sm font-medium text-gray-700 mb-1">域名</label><input type="text" id="domain"${ssrRenderAttr("value", queryForm.domain)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="例如: example.com"></div><div><label for="app" class="block text-sm font-medium text-gray-700 mb-1">应用</label><select id="app" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(queryForm.app_id) ? ssrLooseContain(queryForm.app_id, "") : ssrLooseEqual(queryForm.app_id, "")) ? " selected" : ""}>选择应用</option><!--[-->`);
      ssrRenderList(apps.value, (app) => {
        _push(`<option${ssrRenderAttr("value", app.id)}${ssrIncludeBooleanAttr(Array.isArray(queryForm.app_id) ? ssrLooseContain(queryForm.app_id, app.id) : ssrLooseEqual(queryForm.app_id, app.id)) ? " selected" : ""}>${ssrInterpolate(app.name)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="text-sm text-gray-600"><p>至少填写一项进行查询</p></div><div class="flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(loading.value || !queryForm.domain && !queryForm.app_id) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (loading.value) {
        _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 查询中... </span>`);
      } else {
        _push(`<span>查询授权</span>`);
      }
      _push(`</button></div></form></div>`);
      if (error.value) {
        _push(`<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5v-1h2v1h-2zm0-3V7h2v1h-2z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700">${ssrInterpolate(error.value)}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (result.value) {
        _push(`<div class="space-y-6"><h2 class="text-xl font-semibold text-gray-800">查询结果</h2><div class="bg-white shadow-lg rounded-xl overflow-hidden"><div class="${ssrRenderClass([result.value.expired ? "bg-red-500" : "bg-green-500", "h-2"])}"></div><div class="p-6"><div class="flex items-center justify-between mb-6"><div class="flex items-center"><div class="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div><div><h3 class="text-lg font-semibold text-gray-800">${ssrInterpolate(result.value.auth.domain)}</h3><p class="text-sm text-gray-500">授权ID: ${ssrInterpolate(result.value.auth.id)}</p></div></div><span class="${ssrRenderClass([result.value.expired ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800", "px-3 py-1 rounded-full text-sm font-medium"])}">${ssrInterpolate(result.value.expired ? "已过期" : "授权有效")}</span></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg><span class="text-gray-600">QQ: ${ssrInterpolate(result.value.auth.qq || "未提供")}</span></div><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg><span class="text-gray-600">IP: ${ssrInterpolate(result.value.auth.ip || "未记录")}</span></div><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg><span class="text-gray-600">版本: ${ssrInterpolate(result.value.auth.version || "未指定")}</span></div></div><div class="space-y-4"><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-gray-600">到期时间: ${ssrInterpolate(formatDate(result.value.auth.outtime))}</span></div><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="text-gray-600">价格: ${ssrInterpolate(result.value.auth.price ? `¥${result.value.auth.price}` : "未记录")}</span></div><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-gray-600">创建时间: ${ssrInterpolate(result.value.auth.created_at)}</span></div></div></div></div></div></div>`);
      } else if (hasSearched.value && !loading.value && !error.value) {
        _push(`<div class="bg-white shadow-md rounded-lg p-8 text-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><h3 class="text-lg font-medium text-gray-900">未找到授权记录</h3><p class="mt-2 text-sm text-gray-500"> 没有找到与您的查询条件匹配的授权。请检查您输入的信息或尝试其他查询条件。 </p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/query.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=query.vue.mjs.map
