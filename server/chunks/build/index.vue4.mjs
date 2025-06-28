import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { ref, reactive, computed, useSSRContext } from 'vue';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const loading = ref(true);
    const saving = ref(false);
    const error = ref(null);
    const showSuccess = ref(false);
    const settings = ref(null);
    const user = ref(null);
    ref([]);
    const formData = reactive({
      site_name: "",
      site_logo: "",
      allow_register: true,
      beian_number: "",
      footer_code: ""
    });
    const isAdmin = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.role) === "admin";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-904bea16><h1 class="text-2xl font-bold mb-6" data-v-904bea16>系统设置</h1>`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-12" data-v-904bea16><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" data-v-904bea16></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-v-904bea16>${ssrInterpolate(error.value)}</div>`);
      } else if (!isAdmin.value) {
        _push(`<div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4" data-v-904bea16> 您没有权限访问系统设置页面。 </div>`);
      } else {
        _push(`<form class="space-y-8" data-v-904bea16><div class="card" data-v-904bea16><h2 class="text-xl font-bold mb-4" data-v-904bea16>基本设置</h2><div class="space-y-4" data-v-904bea16><div data-v-904bea16><label for="site_name" class="block text-sm font-medium text-gray-700 mb-1" data-v-904bea16>网站名称</label><input id="site_name"${ssrRenderAttr("value", formData.site_name)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-904bea16></div><div data-v-904bea16><label for="site_logo" class="block text-sm font-medium text-gray-700 mb-1" data-v-904bea16>网站Logo</label><div class="flex items-center" data-v-904bea16><input id="site_logo"${ssrRenderAttr("value", formData.site_logo)} type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-904bea16><div class="ml-3 w-10 h-10 bg-gray-200 rounded flex items-center justify-center overflow-hidden" data-v-904bea16>`);
        if (formData.site_logo) {
          _push(`<img${ssrRenderAttr("src", formData.site_logo)} alt="Logo预览" class="max-w-full max-h-full" data-v-904bea16>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><p class="text-sm text-gray-500 mt-1" data-v-904bea16>输入Logo图片的URL地址</p></div><div data-v-904bea16><label class="flex items-center space-x-2" data-v-904bea16><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(formData.allow_register) ? ssrLooseContain(formData.allow_register, null) : formData.allow_register) ? " checked" : ""} class="h-4 w-4 text-pink-600" data-v-904bea16><span data-v-904bea16>允许用户注册</span></label></div><div data-v-904bea16><label for="beian_number" class="block text-sm font-medium text-gray-700 mb-1" data-v-904bea16>网站备案号</label><input id="beian_number"${ssrRenderAttr("value", formData.beian_number)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="例如: 浙ICP备12345678号" data-v-904bea16><p class="text-sm text-gray-500 mt-1" data-v-904bea16>如果没有备案号可以留空</p></div><div data-v-904bea16><label for="footer_code" class="block text-sm font-medium text-gray-700 mb-1" data-v-904bea16>底部插入代码</label><textarea id="footer_code" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="可以插入统计代码、客服代码等" data-v-904bea16>${ssrInterpolate(formData.footer_code)}</textarea><p class="text-sm text-gray-500 mt-1" data-v-904bea16>插入在网页底部的HTML代码，如统计代码等</p></div></div></div><div class="card" data-v-904bea16><h2 class="text-xl font-bold mb-4" data-v-904bea16>程序信息</h2><div class="space-y-4" data-v-904bea16><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-904bea16><div class="bg-gray-50 p-3 rounded-md" data-v-904bea16><span class="text-sm text-gray-500" data-v-904bea16>系统版本：</span><span class="font-medium" data-v-904bea16>${ssrInterpolate(((_b = (_a = settings.value) == null ? void 0 : _a.system_version) == null ? void 0 : _b.value) || "1.0.0")}</span></div><div class="bg-gray-50 p-3 rounded-md" data-v-904bea16><span class="text-sm text-gray-500" data-v-904bea16>发布日期：</span><span class="font-medium" data-v-904bea16>${ssrInterpolate(((_d = (_c = settings.value) == null ? void 0 : _c.system_release_date) == null ? void 0 : _d.value) || "2023-08-01")}</span></div><div class="bg-gray-50 p-3 rounded-md" data-v-904bea16><span class="text-sm text-gray-500" data-v-904bea16>官方QQ群：</span><span class="font-medium" data-v-904bea16>${ssrInterpolate(((_f = (_e = settings.value) == null ? void 0 : _e.system_qq_group) == null ? void 0 : _f.value) || "1023034217")}</span></div></div><p class="text-sm text-gray-500" data-v-904bea16>程序信息仅供参考，不可修改</p></div></div><div class="flex justify-end" data-v-904bea16><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} data-v-904bea16>${ssrInterpolate(saving.value ? "保存中..." : "保存设置")}</button></div></form>`);
      }
      if (showSuccess.value) {
        _push(`<div class="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow-lg" data-v-904bea16> 设置保存成功！ </div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-904bea16"]]);

export { index as default };
//# sourceMappingURL=index.vue4.mjs.map
