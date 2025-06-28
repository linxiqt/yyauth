import { ref, reactive, computed, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, withDirectives, vModelCheckbox, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "homepage",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const loading = ref(true);
    const saving = ref(false);
    const error = ref(null);
    const showSuccess = ref(false);
    const settings = ref(null);
    const user = ref(null);
    const homeSections = ref([]);
    const heroContent = reactive({
      title: "",
      subtitle: "",
      primaryButton: {
        show: true,
        text: "",
        link: ""
      },
      secondaryButton: {
        show: true,
        text: "",
        link: ""
      }
    });
    const featuresContent = reactive({
      title: "",
      items: []
    });
    const pricingContent = reactive({
      title: "",
      plans: []
    });
    const testimonialsContent = reactive({
      title: "",
      items: []
    });
    const contactContent = reactive({
      title: "",
      items: []
    });
    const resellerPricingContent = reactive({
      title: "",
      plans: []
    });
    const galleryContent = reactive({
      title: "",
      images: []
    });
    const isAdmin = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.role) === "admin";
    });
    const sectionNames = {
      "hero": "英雄区块",
      "features": "功能展示",
      "pricing": "价格方案",
      "testimonials": "用户评价",
      "contact": "联系我们",
      "reseller_pricing": "授权商价格",
      "gallery": "图片展示",
      "reseller_pricing": "授权商价格",
      "gallery": "图片展示"
    };
    const getSectionName = (sectionId) => {
      return sectionNames[sectionId] || sectionId;
    };
    const updateHomeSections = () => {
      settings.value.home_sections = homeSections.value.filter((section) => section.enabled).map((section) => section.id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_draggable = resolveComponent("draggable");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-5f63315b><h1 class="text-2xl font-bold mb-6" data-v-5f63315b>主页设置</h1>`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-12" data-v-5f63315b><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" data-v-5f63315b></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-v-5f63315b>${ssrInterpolate(error.value)}</div>`);
      } else if (!isAdmin.value) {
        _push(`<div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4" data-v-5f63315b> 您没有权限访问主页设置页面。 </div>`);
      } else {
        _push(`<form class="space-y-8" data-v-5f63315b><div class="grid grid-cols-1 lg:grid-cols-2 gap-8" data-v-5f63315b><div class="space-y-8" data-v-5f63315b><div class="card" data-v-5f63315b><h2 class="text-xl font-bold mb-4" data-v-5f63315b>区块顺序</h2><div class="space-y-4" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5f63315b>首页区块</label><div class="border rounded-md p-3 bg-gray-50" data-v-5f63315b><p class="text-sm text-gray-600 mb-2" data-v-5f63315b>拖动调整区块顺序，取消勾选隐藏区块</p><div class="space-y-2" data-v-5f63315b>`);
        _push(ssrRenderComponent(_component_draggable, {
          modelValue: homeSections.value,
          "onUpdate:modelValue": ($event) => homeSections.value = $event,
          onEnd: updateHomeSections,
          class: "space-y-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(homeSections.value, (section, index) => {
                _push2(`<div class="flex items-center justify-between bg-white p-3 rounded border" data-v-5f63315b${_scopeId}><div class="flex items-center" data-v-5f63315b${_scopeId}><span class="text-gray-500 mr-3 cursor-move" data-v-5f63315b${_scopeId}>≡</span><label class="flex items-center" data-v-5f63315b${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(section.enabled) ? ssrLooseContain(section.enabled, null) : section.enabled) ? " checked" : ""} class="h-4 w-4 text-pink-600 mr-2" data-v-5f63315b${_scopeId}><span data-v-5f63315b${_scopeId}>${ssrInterpolate(getSectionName(section.id))}</span></label></div><span class="text-xs bg-gray-200 rounded px-2 py-1" data-v-5f63315b${_scopeId}>${ssrInterpolate(section.id)}</span></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(homeSections.value, (section, index) => {
                  return openBlock(), createBlock("div", {
                    key: section.id,
                    class: "flex items-center justify-between bg-white p-3 rounded border"
                  }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-gray-500 mr-3 cursor-move" }, "≡"),
                      createVNode("label", { class: "flex items-center" }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => section.enabled = $event,
                          class: "h-4 w-4 text-pink-600 mr-2"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, section.enabled]
                        ]),
                        createVNode("span", null, toDisplayString(getSectionName(section.id)), 1)
                      ])
                    ]),
                    createVNode("span", { class: "text-xs bg-gray-200 rounded px-2 py-1" }, toDisplayString(section.id), 1)
                  ]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div></div><div class="card" data-v-5f63315b><h2 class="text-xl font-bold mb-4" data-v-5f63315b>英雄区块</h2><div class="space-y-4" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>标题</label><input${ssrRenderAttr("value", heroContent.title)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>副标题</label><input${ssrRenderAttr("value", heroContent.subtitle)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div><div class="grid grid-cols-2 gap-4" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>主要按钮</label><div class="space-y-2" data-v-5f63315b><label class="flex items-center" data-v-5f63315b><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(heroContent.primaryButton.show) ? ssrLooseContain(heroContent.primaryButton.show, null) : heroContent.primaryButton.show) ? " checked" : ""} class="h-4 w-4 text-pink-600 mr-2" data-v-5f63315b><span data-v-5f63315b>显示按钮</span></label><input${ssrRenderAttr("value", heroContent.primaryButton.text)} type="text" placeholder="按钮文字" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", heroContent.primaryButton.link)} type="text" placeholder="按钮链接" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div></div><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>次要按钮</label><div class="space-y-2" data-v-5f63315b><label class="flex items-center" data-v-5f63315b><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(heroContent.secondaryButton.show) ? ssrLooseContain(heroContent.secondaryButton.show, null) : heroContent.secondaryButton.show) ? " checked" : ""} class="h-4 w-4 text-pink-600 mr-2" data-v-5f63315b><span data-v-5f63315b>显示按钮</span></label><input${ssrRenderAttr("value", heroContent.secondaryButton.text)} type="text" placeholder="按钮文字" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", heroContent.secondaryButton.link)} type="text" placeholder="按钮链接" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div></div></div></div></div><div class="card" data-v-5f63315b><h2 class="text-xl font-bold mb-4" data-v-5f63315b>功能区块</h2><div class="space-y-4" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>标题</label><input${ssrRenderAttr("value", featuresContent.title)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5f63315b>功能列表</label><div class="space-y-4" data-v-5f63315b><!--[-->`);
        ssrRenderList(featuresContent.items, (feature, index) => {
          _push(`<div class="border rounded-md p-4" data-v-5f63315b><div class="flex justify-between items-center mb-2" data-v-5f63315b><h3 class="font-medium" data-v-5f63315b>功能 #${ssrInterpolate(index + 1)}</h3><button type="button" class="text-red-500 hover:text-red-700" data-v-5f63315b> 删除 </button></div><div class="space-y-2" data-v-5f63315b><input${ssrRenderAttr("value", feature.icon)} type="text" placeholder="图标 (emoji)" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", feature.title)} type="text" placeholder="标题" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><textarea placeholder="描述" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b>${ssrInterpolate(feature.description)}</textarea></div></div>`);
        });
        _push(`<!--]--><button type="button" class="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-pink-500 hover:text-pink-500" data-v-5f63315b> 添加功能 </button></div></div></div></div><div class="card" data-v-5f63315b><h2 class="text-xl font-bold mb-4" data-v-5f63315b>图片展示区块</h2><div class="space-y-4" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>标题</label><input${ssrRenderAttr("value", galleryContent.title)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5f63315b>图片列表</label><div class="space-y-4" data-v-5f63315b><!--[-->`);
        ssrRenderList(galleryContent.images, (image, index) => {
          _push(`<div class="border rounded-md p-4" data-v-5f63315b><div class="flex justify-between items-center mb-2" data-v-5f63315b><h3 class="font-medium" data-v-5f63315b>图片 #${ssrInterpolate(index + 1)}</h3><button type="button" class="text-red-500 hover:text-red-700" data-v-5f63315b> 删除 </button></div><div class="space-y-2" data-v-5f63315b><input${ssrRenderAttr("value", image.url)} type="text" placeholder="图片URL" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", image.caption)} type="text" placeholder="图片标题" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><textarea placeholder="图片描述" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b>${ssrInterpolate(image.description)}</textarea></div></div>`);
        });
        _push(`<!--]--><button type="button" class="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-pink-500 hover:text-pink-500" data-v-5f63315b> 添加图片 </button></div></div></div></div></div><div class="space-y-8" data-v-5f63315b><div class="card" data-v-5f63315b><h2 class="text-xl font-bold mb-4" data-v-5f63315b>价格区块</h2><div class="space-y-4" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>标题</label><input${ssrRenderAttr("value", pricingContent.title)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5f63315b>价格方案</label><div class="space-y-4" data-v-5f63315b><!--[-->`);
        ssrRenderList(pricingContent.plans, (plan, index) => {
          _push(`<div class="border rounded-md p-4" data-v-5f63315b><div class="flex justify-between items-center mb-2" data-v-5f63315b><h3 class="font-medium" data-v-5f63315b>方案 #${ssrInterpolate(index + 1)}</h3><button type="button" class="text-red-500 hover:text-red-700" data-v-5f63315b> 删除 </button></div><div class="space-y-2" data-v-5f63315b><input${ssrRenderAttr("value", plan.name)} type="text" placeholder="方案名称" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", plan.price)} type="number" placeholder="价格" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>功能列表</label><div class="space-y-2" data-v-5f63315b><!--[-->`);
          ssrRenderList(plan.features, (feature, fIndex) => {
            _push(`<div class="flex items-center" data-v-5f63315b><input${ssrRenderAttr("value", plan.features[fIndex])} type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><button type="button" class="ml-2 text-red-500 hover:text-red-700" data-v-5f63315b> 删除 </button></div>`);
          });
          _push(`<!--]--><button type="button" class="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-pink-500 hover:text-pink-500" data-v-5f63315b> 添加功能 </button></div></div><input${ssrRenderAttr("value", plan.buttonText)} type="text" placeholder="按钮文字" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", plan.link)} type="text" placeholder="按钮链接" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><label class="flex items-center" data-v-5f63315b><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(plan.featured) ? ssrLooseContain(plan.featured, null) : plan.featured) ? " checked" : ""} class="h-4 w-4 text-pink-600 mr-2" data-v-5f63315b><span data-v-5f63315b>推荐方案</span></label></div></div>`);
        });
        _push(`<!--]--><button type="button" class="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-pink-500 hover:text-pink-500" data-v-5f63315b> 添加方案 </button></div></div></div></div><div class="card" data-v-5f63315b><h2 class="text-xl font-bold mb-4" data-v-5f63315b>评价区块</h2><div class="space-y-4" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>标题</label><input${ssrRenderAttr("value", testimonialsContent.title)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5f63315b>评价列表</label><div class="space-y-4" data-v-5f63315b><!--[-->`);
        ssrRenderList(testimonialsContent.items, (testimonial, index) => {
          _push(`<div class="border rounded-md p-4" data-v-5f63315b><div class="flex justify-between items-center mb-2" data-v-5f63315b><h3 class="font-medium" data-v-5f63315b>评价 #${ssrInterpolate(index + 1)}</h3><button type="button" class="text-red-500 hover:text-red-700" data-v-5f63315b> 删除 </button></div><div class="space-y-2" data-v-5f63315b><input${ssrRenderAttr("value", testimonial.avatar)} type="text" placeholder="头像URL" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", testimonial.name)} type="text" placeholder="姓名" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", testimonial.position)} type="text" placeholder="职位" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><textarea placeholder="评价内容" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b>${ssrInterpolate(testimonial.content)}</textarea></div></div>`);
        });
        _push(`<!--]--><button type="button" class="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-pink-500 hover:text-pink-500" data-v-5f63315b> 添加评价 </button></div></div></div></div><div class="card" data-v-5f63315b><h2 class="text-xl font-bold mb-4" data-v-5f63315b>联系区块</h2><div class="space-y-4" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>标题</label><input${ssrRenderAttr("value", contactContent.title)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5f63315b>联系方式</label><div class="space-y-4" data-v-5f63315b><!--[-->`);
        ssrRenderList(contactContent.items, (item, index) => {
          _push(`<div class="border rounded-md p-4" data-v-5f63315b><div class="flex justify-between items-center mb-2" data-v-5f63315b><h3 class="font-medium" data-v-5f63315b>联系方式 #${ssrInterpolate(index + 1)}</h3><button type="button" class="text-red-500 hover:text-red-700" data-v-5f63315b> 删除 </button></div><div class="space-y-2" data-v-5f63315b><input${ssrRenderAttr("value", item.icon)} type="text" placeholder="图标 (emoji)" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", item.text)} type="text" placeholder="文本内容" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div></div>`);
        });
        _push(`<!--]--><button type="button" class="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-pink-500 hover:text-pink-500" data-v-5f63315b> 添加联系方式 </button></div></div></div></div><div class="card" data-v-5f63315b><h2 class="text-xl font-bold mb-4" data-v-5f63315b>授权商价格区块</h2><div class="space-y-4" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>标题</label><input${ssrRenderAttr("value", resellerPricingContent.title)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b></div><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5f63315b>价格方案</label><div class="space-y-4" data-v-5f63315b><!--[-->`);
        ssrRenderList(resellerPricingContent.plans, (plan, index) => {
          _push(`<div class="border rounded-md p-4" data-v-5f63315b><div class="flex justify-between items-center mb-2" data-v-5f63315b><h3 class="font-medium" data-v-5f63315b>方案 #${ssrInterpolate(index + 1)}</h3><button type="button" class="text-red-500 hover:text-red-700" data-v-5f63315b> 删除 </button></div><div class="space-y-2" data-v-5f63315b><input${ssrRenderAttr("value", plan.name)} type="text" placeholder="方案名称" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", plan.price)} type="number" placeholder="价格" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", plan.unit)} type="text" placeholder="单位（如：月、年）" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><div data-v-5f63315b><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5f63315b>功能列表</label><div class="space-y-2" data-v-5f63315b><!--[-->`);
          ssrRenderList(plan.features, (feature, fIndex) => {
            _push(`<div class="flex items-center" data-v-5f63315b><input${ssrRenderAttr("value", plan.features[fIndex])} type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><button type="button" class="ml-2 text-red-500 hover:text-red-700" data-v-5f63315b> 删除 </button></div>`);
          });
          _push(`<!--]--><button type="button" class="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-pink-500 hover:text-pink-500" data-v-5f63315b> 添加功能 </button></div></div><input${ssrRenderAttr("value", plan.buttonText)} type="text" placeholder="按钮文字" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><input${ssrRenderAttr("value", plan.link)} type="text" placeholder="按钮链接" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-5f63315b><label class="flex items-center" data-v-5f63315b><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(plan.featured) ? ssrLooseContain(plan.featured, null) : plan.featured) ? " checked" : ""} class="h-4 w-4 text-pink-600 mr-2" data-v-5f63315b><span data-v-5f63315b>推荐方案</span></label></div></div>`);
        });
        _push(`<!--]--><button type="button" class="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-pink-500 hover:text-pink-500" data-v-5f63315b> 添加方案 </button></div></div></div></div></div></div><div class="flex justify-end" data-v-5f63315b><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} data-v-5f63315b>${ssrInterpolate(saving.value ? "保存中..." : "保存设置")}</button></div></form>`);
      }
      if (showSuccess.value) {
        _push(`<div class="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow-lg" data-v-5f63315b> 设置保存成功！ </div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/homepage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const homepage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5f63315b"]]);

export { homepage as default };
//# sourceMappingURL=homepage.vue.mjs.map
