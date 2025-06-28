import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { ref, computed, useSSRContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    route.params.id;
    const loading = ref(true);
    const error = ref("");
    const formData = ref({
      domain: "",
      app_id: "",
      ip: "",
      qq: "",
      version: "",
      price: 0,
      original_price: 0,
      outtime: 0
    });
    const isSubmitting = ref(false);
    const expiryDateInput = ref("");
    const userInfo = ref(null);
    const isAdmin = computed(() => {
      var _a;
      return ((_a = userInfo.value) == null ? void 0 : _a.role) === "admin";
    });
    const apps = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><div class="flex items-center"><button class="mr-3 text-gray-600 hover:text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg></button><h1 class="text-2xl font-bold text-gray-800">编辑授权</h1></div><p class="text-gray-600 mt-1">修改授权信息</p></div>`);
      if (loading.value) {
        _push(`<div class="flex justify-center items-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5v-1h2v1h-2zm0-3V7h2v1h-2z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700">${ssrInterpolate(error.value)}</p></div></div></div>`);
      } else {
        _push(`<div class="bg-white shadow-md rounded-lg overflow-hidden p-6"><form><div class="mb-4"><label for="domain" class="block text-sm font-medium text-gray-700 mb-1">域名 <span class="text-red-500">*</span></label><input type="text" id="domain"${ssrRenderAttr("value", formData.value.domain)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="例如: example.com" required></div>`);
        if (isAdmin.value) {
          _push(`<div><div class="mb-4"><label for="app_id" class="block text-sm font-medium text-gray-700 mb-1">所属应用 <span class="text-red-500">*</span></label><select id="app_id" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" required><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(formData.value.app_id) ? ssrLooseContain(formData.value.app_id, "") : ssrLooseEqual(formData.value.app_id, "")) ? " selected" : ""}>请选择应用</option><!--[-->`);
          ssrRenderList(apps.value, (app) => {
            _push(`<option${ssrRenderAttr("value", app.id)}${ssrIncludeBooleanAttr(Array.isArray(formData.value.app_id) ? ssrLooseContain(formData.value.app_id, app.id) : ssrLooseEqual(formData.value.app_id, app.id)) ? " selected" : ""}>${ssrInterpolate(app.name)}</option>`);
          });
          _push(`<!--]--></select></div><div class="mb-4"><label for="ip" class="block text-sm font-medium text-gray-700 mb-1">IP地址</label><input type="text" id="ip"${ssrRenderAttr("value", formData.value.ip)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="例如: 127.0.0.1"></div><div class="mb-4"><label for="qq" class="block text-sm font-medium text-gray-700 mb-1">联系方式 (QQ)</label><input type="text" id="qq"${ssrRenderAttr("value", formData.value.qq)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="例如: 12345678"></div><div class="mb-4"><label for="version" class="block text-sm font-medium text-gray-700 mb-1">版本</label><input type="text" id="version"${ssrRenderAttr("value", formData.value.version)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="例如: 1.0.0"></div><div class="mb-4"><label for="price" class="block text-sm font-medium text-gray-700 mb-1">价格</label><input type="number" id="price"${ssrRenderAttr("value", formData.value.price)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="例如: 99.99" step="0.01" min="0"></div><div class="mb-4"><label for="original_price" class="block text-sm font-medium text-gray-700 mb-1">原价</label><input type="number" id="original_price"${ssrRenderAttr("value", formData.value.original_price)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="例如: 199.99" step="0.01" min="0"></div><div class="mb-4"><label for="expiry_date" class="block text-sm font-medium text-gray-700 mb-1">到期时间 <span class="text-red-500">*</span></label><input type="datetime-local" id="expiry_date"${ssrRenderAttr("value", expiryDateInput.value)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" required></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-end mt-6"><button type="button" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none mr-3"> 取消 </button><button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""}>`);
        if (isSubmitting.value) {
          _push(`<span>保存中...</span>`);
        } else {
          _push(`<span>保存更改</span>`);
        }
        _push(`</button></div></form></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.vue2.mjs.map
