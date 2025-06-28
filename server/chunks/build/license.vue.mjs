import { reactive, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = {
  __name: "license",
  __ssrInlineRender: true,
  setup(__props) {
    const versionInfo = reactive({
      currentVersion: "1.0.1",
      domain: ""
    });
    const licenseValid = ref(false);
    const licenseMessage = ref("授权检测失败，请重新检查授权信息");
    const licenseData = reactive({
      expireDate: "",
      quota: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center p-4" }, _attrs))}><div class="bg-white rounded-lg shadow-lg w-full max-w-xl p-6"><div class="text-center mb-6"><h1 class="text-2xl font-bold text-gray-800 mb-2">系统授权检查</h1><p class="text-sm text-gray-600">当前版本：${ssrInterpolate(versionInfo.currentVersion)}</p></div><div class="${ssrRenderClass([{ "bg-red-50 p-4 rounded-md mb-6": !licenseValid.value, "bg-green-50 p-4 rounded-md mb-6": licenseValid.value }, "flex items-center"])}"><div class="${ssrRenderClass([{ "text-red-500": !licenseValid.value, "text-green-500": licenseValid.value }, "mr-4 text-3xl"])}">`);
      if (!licenseValid.value) {
        _push(`<i class="ri-error-warning-line"></i>`);
      } else {
        _push(`<i class="ri-checkbox-circle-line"></i>`);
      }
      _push(`</div><div><h2 class="text-lg font-medium mb-1">${ssrInterpolate(licenseValid.value ? "√授权有效" : "授权无效")}</h2><p class="text-gray-600">${ssrInterpolate(licenseMessage.value)}</p></div></div><div class="mb-6"><div class="flex py-3 border-b border-gray-100"><span class="w-36 font-medium text-gray-600">域名：</span><span>${ssrInterpolate(versionInfo.domain)}</span></div>`);
      if (licenseData.expireDate) {
        _push(`<div class="flex py-3 border-b border-gray-100"><span class="w-36 font-medium text-gray-600">授权过期时间：</span><span>${ssrInterpolate(licenseData.expireDate)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (licenseData.quota) {
        _push(`<div class="flex py-3 border-b border-gray-100"><span class="w-36 font-medium text-gray-600">授权配额：</span><span>${ssrInterpolate(licenseData.quota)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-wrap gap-3 mb-6"><button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">重新检查授权</button><button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">激活授权</button><button class="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors">购买授权</button></div><div class="text-center text-sm text-gray-600"><p>如果您遇到授权问题，请联系我们的客服：</p><p>QQ: 2205147997</p><p>QQ群: 1023034217</p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/license.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=license.vue.mjs.map
