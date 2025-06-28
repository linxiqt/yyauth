import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { reactive, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const formData = reactive({
      username: "",
      password: ""
    });
    const error = ref(null);
    const loading = ref(false);
    const settings = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center py-12" }, _attrs))} data-v-5acc5023><div class="w-full max-w-md" data-v-5acc5023><div class="card" data-v-5acc5023><div class="text-center mb-8" data-v-5acc5023><h1 class="text-2xl font-bold text-gray-800" data-v-5acc5023>欢迎回来</h1><p class="text-gray-600" data-v-5acc5023>登录到简授权</p></div>`);
      if (error.value) {
        _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-v-5acc5023>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-6" data-v-5acc5023><div data-v-5acc5023><label for="username" class="block text-sm font-medium text-gray-700 mb-1" data-v-5acc5023>用户名</label><input id="username"${ssrRenderAttr("value", formData.username)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="请输入用户名" data-v-5acc5023></div><div data-v-5acc5023><label for="password" class="block text-sm font-medium text-gray-700 mb-1" data-v-5acc5023>密码</label><input id="password"${ssrRenderAttr("value", formData.password)} type="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="请输入密码" data-v-5acc5023></div><div data-v-5acc5023><button type="submit" class="w-full btn-primary"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-5acc5023>${ssrInterpolate(loading.value ? "登录中..." : "登录")}</button></div></form><div class="mt-6 text-center text-sm" data-v-5acc5023>`);
      if ((_a = settings.value) == null ? void 0 : _a.allow_register) {
        _push(`<span data-v-5acc5023> 没有账号? `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/register",
          class: "text-pink-600 hover:text-pink-800"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`立即注册`);
            } else {
              return [
                createTextVNode("立即注册")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5acc5023"]]);

export { login as default };
//# sourceMappingURL=login.vue.mjs.map
