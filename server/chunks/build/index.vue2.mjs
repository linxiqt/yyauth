import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { ref, computed, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
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
    const apps = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const currentPage = ref(1);
    const totalItems = ref(0);
    const pageSize = ref(9);
    const showDeleteConfirm = ref(false);
    const appToDelete = ref(null);
    const pageCount = computed(() => Math.ceil(totalItems.value / pageSize.value));
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-325e0552><div class="flex justify-between items-center mb-6" data-v-325e0552><h1 class="text-2xl font-bold" data-v-325e0552>应用列表</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/apps/new",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`创建应用`);
          } else {
            return [
              createTextVNode("创建应用")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-12" data-v-325e0552><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" data-v-325e0552></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-v-325e0552>${ssrInterpolate(error.value)}</div>`);
      } else if (apps.value.length === 0) {
        _push(`<div class="text-center py-12 bg-gray-50 rounded-lg" data-v-325e0552><div class="text-5xl mb-4" data-v-325e0552>📱</div><h3 class="text-xl font-bold text-gray-700 mb-2" data-v-325e0552>暂无应用</h3><p class="text-gray-600 mb-6" data-v-325e0552>您还没有创建任何应用，立即创建第一个应用</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/apps/new",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`创建应用`);
            } else {
              return [
                createTextVNode("创建应用")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-325e0552><!--[-->`);
        ssrRenderList(apps.value, (app) => {
          var _a2;
          _push(`<div class="card hover:shadow-lg" data-v-325e0552><div class="flex items-center mb-4" data-v-325e0552><div class="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-3" data-v-325e0552>`);
          if (app.icon) {
            _push(`<img${ssrRenderAttr("src", app.icon)} alt="应用图标" class="w-8 h-8" data-v-325e0552>`);
          } else {
            _push(`<span class="text-pink-600 text-xl" data-v-325e0552>📱</span>`);
          }
          _push(`</div><div data-v-325e0552><h3 class="font-bold text-lg" data-v-325e0552>${ssrInterpolate(app.name)}</h3><p class="text-gray-600 text-sm" data-v-325e0552>${ssrInterpolate(formatDate(app.created_at))}</p></div></div>`);
          if (app.description) {
            _push(`<p class="text-gray-700 mb-4" data-v-325e0552>${ssrInterpolate(app.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex justify-between mb-4" data-v-325e0552><div class="text-center px-3" data-v-325e0552><div class="text-xl font-bold text-pink-600" data-v-325e0552>${ssrInterpolate(app.auth_count || 0)}</div><div class="text-gray-600 text-sm" data-v-325e0552>授权总数</div></div><div class="border-r border-gray-200" data-v-325e0552></div><div class="text-center px-3" data-v-325e0552><div class="text-xl font-bold text-green-600" data-v-325e0552>${ssrInterpolate(((_a2 = app.update_config) == null ? void 0 : _a2.latest_version) || "未设置")}</div><div class="text-gray-600 text-sm" data-v-325e0552>最新版本</div></div></div><div class="flex flex-wrap justify-between pt-3 border-t" data-v-325e0552>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/apps/${app.id}`,
            class: "text-pink-600 hover:text-pink-800"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` 管理 `);
              } else {
                return [
                  createTextVNode(" 管理 ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="flex space-x-2" data-v-325e0552><button class="text-blue-600 hover:text-blue-800" data-v-325e0552> 编辑 </button><button class="text-red-600 hover:text-red-800" data-v-325e0552> 删除 </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (pageCount.value > 1) {
        _push(`<div class="flex justify-center mt-8" data-v-325e0552><div class="flex space-x-1" data-v-325e0552><!--[-->`);
        ssrRenderList(pageCount.value, (page) => {
          _push(`<button class="${ssrRenderClass([currentPage.value === page ? "bg-pink-500 text-white" : "bg-gray-200 hover:bg-gray-300", "px-3 py-1 rounded"])}" data-v-325e0552>${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showDeleteConfirm.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-325e0552><div class="bg-white rounded-lg p-6 max-w-md w-full" data-v-325e0552><h3 class="text-xl font-bold mb-4" data-v-325e0552>确认删除</h3><p class="mb-6" data-v-325e0552>您确定要删除应用 <span class="font-bold" data-v-325e0552>${ssrInterpolate((_a = appToDelete.value) == null ? void 0 : _a.name)}</span>？此操作不可逆，并将删除所有关联的授权、公告和更新日志。</p><div class="flex justify-end space-x-3" data-v-325e0552><button class="px-4 py-2 border rounded hover:bg-gray-100" data-v-325e0552> 取消 </button><button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" data-v-325e0552> 确定删除 </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/apps/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-325e0552"]]);

export { index as default };
//# sourceMappingURL=index.vue2.mjs.map
