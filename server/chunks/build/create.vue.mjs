import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { ref, reactive, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';

const _sfc_main = {
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const loading = ref(false);
    const saving = ref(false);
    const error = ref(null);
    const apps = ref([]);
    const activeDuration = ref(null);
    const durationOptions = [
      { label: "1个月", days: 30 },
      { label: "3个月", days: 90 },
      { label: "6个月", days: 180 },
      { label: "1年", days: 365 },
      { label: "2年", days: 730 },
      { label: "永久", days: 3650 }
      // 约10年
    ];
    const form = reactive({
      app_id: "",
      domain: "",
      ip: "",
      qq: "",
      version: "",
      expiry_date: "",
      price: "",
      original_price: "",
      remarks: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><h1 class="text-2xl font-bold text-gray-800">创建授权</h1><p class="text-gray-600 mt-1">为您的应用添加新的授权记录</p></div>`);
      if (loading.value) {
        _push(`<div class="flex justify-center items-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5v-1h2v1h-2zm0-3V7h2v1h-2z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700">${ssrInterpolate(error.value)}</p></div></div></div>`);
      } else {
        _push(`<form class="bg-white shadow-md rounded-lg p-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="col-span-2"><label for="app_id" class="block text-sm font-medium text-gray-700 mb-1">选择应用 <span class="text-red-500">*</span></label><select id="app_id" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.app_id) ? ssrLooseContain(form.app_id, "") : ssrLooseEqual(form.app_id, "")) ? " selected" : ""}>请选择应用</option><!--[-->`);
        ssrRenderList(apps.value, (app) => {
          _push(`<option${ssrRenderAttr("value", app.id)}${ssrIncludeBooleanAttr(Array.isArray(form.app_id) ? ssrLooseContain(form.app_id, app.id) : ssrLooseEqual(form.app_id, app.id)) ? " selected" : ""}>${ssrInterpolate(app.name)}</option>`);
        });
        _push(`<!--]--></select></div><div><label for="domain" class="block text-sm font-medium text-gray-700 mb-1">域名 <span class="text-red-500">*</span></label><input type="text" id="domain"${ssrRenderAttr("value", form.domain)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="example.com" required></div><div><label for="ip" class="block text-sm font-medium text-gray-700 mb-1">IP地址</label><input type="text" id="ip"${ssrRenderAttr("value", form.ip)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="选填，例如: 192.168.1.1"></div><div><label for="qq" class="block text-sm font-medium text-gray-700 mb-1">联系方式</label><input type="text" id="qq"${ssrRenderAttr("value", form.qq)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="选填，QQ号或其他联系方式"></div><div><label for="version" class="block text-sm font-medium text-gray-700 mb-1">版本</label><input type="text" id="version"${ssrRenderAttr("value", form.version)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="选填，例如: v1.0.0"></div><div><label for="expiry_date" class="block text-sm font-medium text-gray-700 mb-1">到期时间 <span class="text-red-500">*</span></label><input type="datetime-local" id="expiry_date"${ssrRenderAttr("value", form.expiry_date)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" required></div><div><label class="block text-sm font-medium text-gray-700 mb-1">授权时长快捷选择</label><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(durationOptions, (duration, index) => {
          _push(`<button type="button" class="${ssrRenderClass([[
            activeDuration.value === duration.days ? "border-pink-500 bg-pink-50 text-pink-700" : "border-gray-300 text-gray-700"
          ], "px-2 py-1 text-xs border rounded-md hover:bg-pink-50"])}">${ssrInterpolate(duration.label)}</button>`);
        });
        _push(`<!--]--></div></div><div><label for="price" class="block text-sm font-medium text-gray-700 mb-1">价格</label><div class="mt-1 relative rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span class="text-gray-500 sm:text-sm">¥</span></div><input type="number" id="price"${ssrRenderAttr("value", form.price)} step="0.01" min="0" class="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="0.00"></div></div><div><label for="original_price" class="block text-sm font-medium text-gray-700 mb-1">原价</label><div class="mt-1 relative rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span class="text-gray-500 sm:text-sm">¥</span></div><input type="number" id="original_price"${ssrRenderAttr("value", form.original_price)} step="0.01" min="0" class="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="0.00"></div></div></div><div class="mt-6"><label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">备注</label><textarea id="remarks" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="可选，添加备注信息">${ssrInterpolate(form.remarks)}</textarea></div><div class="mt-6 flex justify-end"><button type="button" class="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"> 取消 </button><button type="submit"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (saving.value) {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 保存中... </span>`);
        } else {
          _push(`<span>创建授权</span>`);
        }
        _push(`</button></div></form>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create.vue.mjs.map
