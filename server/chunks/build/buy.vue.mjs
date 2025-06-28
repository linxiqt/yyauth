import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { ref, computed, useSSRContext } from 'vue';
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
  __name: "buy",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const steps = ["选择应用", "应用详情", "选择版本", "确认订单"];
    const currentStep = ref(0);
    const loading = ref(true);
    const error = ref(null);
    const processing = ref(false);
    const apps = ref([]);
    const selectedApp = ref(null);
    const domain = ref("");
    const contact = ref("");
    const selectedPlan = ref(null);
    const settings = ref(null);
    const notification = ref({
      show: false,
      type: "success",
      message: ""
    });
    const pricingPlans = computed(() => {
      var _a;
      if ((_a = settings.value) == null ? void 0 : _a.pricing_content) {
        const content = typeof settings.value.pricing_content === "object" ? settings.value.pricing_content : JSON.parse(settings.value.pricing_content);
        return content.plans || [];
      }
      return [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-38a17d51><div class="mb-6" data-v-38a17d51><h1 class="text-2xl font-bold text-gray-800" data-v-38a17d51>购买授权</h1><p class="text-gray-600 mt-1" data-v-38a17d51>选择您需要的应用并完成授权购买</p></div>`);
      if (notification.value.show) {
        _push(`<div class="${ssrRenderClass([notification.value.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700", "mb-4 p-4 rounded-md"])}" data-v-38a17d51><div class="flex" data-v-38a17d51><div class="flex-shrink-0" data-v-38a17d51>`);
        if (notification.value.type === "success") {
          _push(`<svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" data-v-38a17d51><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-38a17d51></path></svg>`);
        } else {
          _push(`<svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20" data-v-38a17d51><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-v-38a17d51></path></svg>`);
        }
        _push(`</div><div class="ml-3" data-v-38a17d51><p class="text-sm font-medium" data-v-38a17d51>${ssrInterpolate(notification.value.message)}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white shadow-md rounded-lg overflow-hidden" data-v-38a17d51><div class="bg-gray-50 px-6 py-4 border-b" data-v-38a17d51><div class="flex justify-between" data-v-38a17d51><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<div class="flex flex-col items-center flex-1" data-v-38a17d51><div class="${ssrRenderClass([[
          currentStep.value > index ? "bg-green-500 text-white" : currentStep.value === index ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-600"
        ], "w-8 h-8 rounded-full flex items-center justify-center"])}" data-v-38a17d51>${ssrInterpolate(index + 1)}</div><div class="${ssrRenderClass([currentStep.value === index ? "text-pink-600 font-medium" : "text-gray-500", "text-sm mt-1"])}" data-v-38a17d51>${ssrInterpolate(step)}</div></div>`);
      });
      _push(`<!--]--></div><div class="mt-2 flex justify-between px-8" data-v-38a17d51><div class="${ssrRenderClass([currentStep.value > 0 ? "bg-pink-500" : "bg-gray-200", "h-1 flex-1 rounded"])}" data-v-38a17d51></div><div class="mx-2" data-v-38a17d51></div><div class="${ssrRenderClass([currentStep.value > 1 ? "bg-pink-500" : "bg-gray-200", "h-1 flex-1 rounded"])}" data-v-38a17d51></div><div class="mx-2" data-v-38a17d51></div><div class="${ssrRenderClass([currentStep.value > 2 ? "bg-pink-500" : "bg-gray-200", "h-1 flex-1 rounded"])}" data-v-38a17d51></div></div></div><div class="p-6" data-v-38a17d51>`);
      if (currentStep.value === 0) {
        _push(`<div class="space-y-6" data-v-38a17d51><h2 class="text-lg font-semibold text-gray-800" data-v-38a17d51>选择应用</h2>`);
        if (loading.value) {
          _push(`<div class="flex justify-center py-8" data-v-38a17d51><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" data-v-38a17d51></div></div>`);
        } else if (error.value) {
          _push(`<div class="bg-red-50 border-l-4 border-red-500 p-4" data-v-38a17d51><div class="flex" data-v-38a17d51><div class="flex-shrink-0" data-v-38a17d51><svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" data-v-38a17d51><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5v-1h2v1h-2zm0-3V7h2v1h-2z" clip-rule="evenodd" data-v-38a17d51></path></svg></div><div class="ml-3" data-v-38a17d51><p class="text-sm text-red-700" data-v-38a17d51>${ssrInterpolate(error.value)}</p></div></div></div>`);
        } else if (apps.value.length === 0) {
          _push(`<div class="text-center py-8 text-gray-500" data-v-38a17d51> 暂无可购买的应用 </div>`);
        } else {
          _push(`<div class="grid md:grid-cols-3 gap-6" data-v-38a17d51><!--[-->`);
          ssrRenderList(apps.value, (app) => {
            _push(`<div class="${ssrRenderClass([selectedApp.value && selectedApp.value.id === app.id ? "border-pink-500 bg-pink-50" : "", "border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"])}" data-v-38a17d51><h3 class="text-lg font-medium text-gray-900" data-v-38a17d51>${ssrInterpolate(app.name)}</h3><p class="mt-2 text-sm text-gray-600 line-clamp-3" data-v-38a17d51>${ssrInterpolate(app.description || "暂无描述")}</p></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`<div class="flex justify-end mt-6" data-v-38a17d51><button${ssrIncludeBooleanAttr(!selectedApp.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50" data-v-38a17d51> 下一步 </button></div></div>`);
      } else if (currentStep.value === 1) {
        _push(`<div class="space-y-6" data-v-38a17d51><h2 class="text-lg font-semibold text-gray-800" data-v-38a17d51>应用详情</h2><div class="grid md:grid-cols-2 gap-6" data-v-38a17d51><div class="border rounded-lg p-6" data-v-38a17d51><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-38a17d51>${ssrInterpolate(selectedApp.value.name)}</h3><div class="prose prose-sm" data-v-38a17d51><p data-v-38a17d51>${ssrInterpolate(selectedApp.value.description || "暂无应用描述")}</p></div></div><div class="border rounded-lg p-6" data-v-38a17d51><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-38a17d51>授权信息</h3><form class="space-y-4" data-v-38a17d51><div data-v-38a17d51><label for="domain" class="block text-sm font-medium text-gray-700" data-v-38a17d51>授权域名 <span class="text-red-500" data-v-38a17d51>*</span></label><input type="text" id="domain"${ssrRenderAttr("value", domain.value)} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="请输入域名，如：example.com" data-v-38a17d51><p class="mt-1 text-xs text-gray-500" data-v-38a17d51>请输入不含http://或https://的域名</p></div><div data-v-38a17d51><label for="contact" class="block text-sm font-medium text-gray-700" data-v-38a17d51>联系方式</label><input type="text" id="contact"${ssrRenderAttr("value", contact.value)} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="QQ或其他联系方式（可选）" data-v-38a17d51></div></form></div></div><div class="flex justify-between mt-6" data-v-38a17d51><button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none" data-v-38a17d51> 上一步 </button><button${ssrIncludeBooleanAttr(!domain.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50" data-v-38a17d51> 下一步 </button></div></div>`);
      } else if (currentStep.value === 2) {
        _push(`<div class="space-y-6" data-v-38a17d51><h2 class="text-lg font-semibold text-gray-800" data-v-38a17d51>选择授权版本</h2>`);
        if (!pricingPlans.value || pricingPlans.value.length === 0) {
          _push(`<div class="text-center py-8 text-gray-500" data-v-38a17d51> 暂无可用版本 </div>`);
        } else {
          _push(`<div class="grid md:grid-cols-3 gap-8" data-v-38a17d51><!--[-->`);
          ssrRenderList(pricingPlans.value, (plan, i) => {
            _push(`<div class="${ssrRenderClass([selectedPlan.value && selectedPlan.value.name === plan.name ? "border-pink-500 bg-pink-50" : "", "border rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition-shadow"])}" data-v-38a17d51><h3 class="text-xl font-bold mb-2" data-v-38a17d51>${ssrInterpolate(plan.name)}</h3><div class="text-3xl font-bold text-pink-600 mb-4" data-v-38a17d51>¥${ssrInterpolate(plan.price)}<span class="text-sm text-gray-500" data-v-38a17d51>/月</span></div><ul class="mb-6 text-left" data-v-38a17d51><!--[-->`);
            ssrRenderList(plan.features, (feature, j) => {
              _push(`<li class="mb-2 flex items-center" data-v-38a17d51><svg class="w-5 h-5 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20" data-v-38a17d51><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-38a17d51></path></svg> ${ssrInterpolate(feature)}</li>`);
            });
            _push(`<!--]--></ul></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`<div class="flex justify-between mt-6" data-v-38a17d51><button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none" data-v-38a17d51> 上一步 </button><button${ssrIncludeBooleanAttr(!selectedPlan.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50" data-v-38a17d51> 下一步 </button></div></div>`);
      } else if (currentStep.value === 3) {
        _push(`<div class="space-y-6" data-v-38a17d51><h2 class="text-lg font-semibold text-gray-800" data-v-38a17d51>确认订单</h2><div class="border rounded-lg p-6" data-v-38a17d51><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-38a17d51>订单摘要</h3><div class="space-y-4" data-v-38a17d51><div class="flex justify-between" data-v-38a17d51><span class="text-gray-700" data-v-38a17d51>应用名称：</span><span class="font-medium" data-v-38a17d51>${ssrInterpolate(selectedApp.value.name)}</span></div><div class="flex justify-between" data-v-38a17d51><span class="text-gray-700" data-v-38a17d51>授权域名：</span><span class="font-medium" data-v-38a17d51>${ssrInterpolate(domain.value)}</span></div><div class="flex justify-between" data-v-38a17d51><span class="text-gray-700" data-v-38a17d51>联系方式：</span><span class="font-medium" data-v-38a17d51>${ssrInterpolate(contact.value || "未提供")}</span></div><div class="flex justify-between" data-v-38a17d51><span class="text-gray-700" data-v-38a17d51>授权版本：</span><span class="font-medium" data-v-38a17d51>${ssrInterpolate(selectedPlan.value.name)}</span></div><div class="flex justify-between" data-v-38a17d51><span class="text-gray-700" data-v-38a17d51>授权价格：</span><span class="font-medium text-lg text-pink-600" data-v-38a17d51>¥${ssrInterpolate(selectedPlan.value.price)}</span></div><div class="pt-4 border-t border-gray-200" data-v-38a17d51><p class="text-sm text-gray-500" data-v-38a17d51>点击&quot;完成购买&quot;按钮将创建授权，如余额不足将无法完成购买。</p></div></div></div><div class="flex justify-between mt-6" data-v-38a17d51><button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none" data-v-38a17d51> 上一步 </button><button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50" data-v-38a17d51>`);
        if (processing.value) {
          _push(`<span class="flex items-center" data-v-38a17d51><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-38a17d51><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-38a17d51></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-38a17d51></path></svg> 处理中... </span>`);
        } else {
          _push(`<span data-v-38a17d51>完成购买</span>`);
        }
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/buy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const buy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38a17d51"]]);

export { buy as default };
//# sourceMappingURL=buy.vue.mjs.map
