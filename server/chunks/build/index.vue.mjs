import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { ref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const settings = ref(null);
    const heroContent = ref(null);
    const featuresContent = ref(null);
    const pricingContent = ref(null);
    const testimonialsContent = ref(null);
    const contactContent = ref(null);
    const resellerPricingContent = ref(null);
    const galleryContent = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-c037521d>`);
      if (settings.value && settings.value.home_sections) {
        _push(`<!--[-->`);
        ssrRenderList(settings.value.home_sections, (sectionType, index2) => {
          _push(`<section data-v-c037521d>`);
          if (sectionType === "hero") {
            _push(`<div class="via-purple-300 to-indigo-300 py-16 rounded-lg mb-12" data-v-c037521d><div class="max-w-4xl mx-auto text-center px-4" data-v-c037521d><h1 class="text-4xl md:text-5xl font-bold text mb-6" data-v-c037521d>${ssrInterpolate(heroContent.value.title)}</h1><p class="text-lg md:text-xl text mb-8" data-v-c037521d>${ssrInterpolate(heroContent.value.subtitle)}</p><div class="flex flex-wrap justify-center gap-4" data-v-c037521d>`);
            if (heroContent.value.primaryButton.show) {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: heroContent.value.primaryButton.link,
                class: "btn-primary py-3 px-8 text-lg"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(heroContent.value.primaryButton.text)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(heroContent.value.primaryButton.text), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            if (heroContent.value.secondaryButton.show) {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: heroContent.value.secondaryButton.link,
                class: "bg-white text-pink-600 hover:bg-pink-50 font-bold py-3 px-8 rounded text-lg"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(heroContent.value.secondaryButton.text)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(heroContent.value.secondaryButton.text), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></div>`);
          } else if (sectionType === "features") {
            _push(`<div class="py-16 mb-12" data-v-c037521d><div class="max-w-6xl mx-auto px-4" data-v-c037521d><h2 class="text-3xl font-bold text-center mb-12" data-v-c037521d>${ssrInterpolate(featuresContent.value.title)}</h2><div class="grid md:grid-cols-3 gap-8" data-v-c037521d><!--[-->`);
            ssrRenderList(featuresContent.value.items, (feature, i) => {
              _push(`<div class="card text-center" data-v-c037521d><div class="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" data-v-c037521d><span class="text-pink-600 text-2xl" data-v-c037521d>${ssrInterpolate(feature.icon)}</span></div><h3 class="text-xl font-bold mb-3" data-v-c037521d>${ssrInterpolate(feature.title)}</h3><p class="text-gray-600" data-v-c037521d>${ssrInterpolate(feature.description)}</p></div>`);
            });
            _push(`<!--]--></div></div></div>`);
          } else if (sectionType === "pricing") {
            _push(`<div class="bg-gray-50 py-16 mb-12" data-v-c037521d><div class="max-w-6xl mx-auto px-4" data-v-c037521d><h2 class="text-3xl font-bold text-center mb-12" data-v-c037521d>${ssrInterpolate(pricingContent.value.title)}</h2><div class="grid md:grid-cols-3 gap-8" data-v-c037521d><!--[-->`);
            ssrRenderList(pricingContent.value.plans, (plan, i) => {
              _push(`<div class="${ssrRenderClass([{ "border-pink-500 border-2": plan.featured }, "card text-center"])}" data-v-c037521d><h3 class="text-xl font-bold mb-2" data-v-c037521d>${ssrInterpolate(plan.name)}</h3><div class="text-3xl font-bold text-pink-600 mb-4" data-v-c037521d>¥${ssrInterpolate(plan.price)}<span class="text-sm text-gray-500" data-v-c037521d>/月</span></div><ul class="mb-6 text-left" data-v-c037521d><!--[-->`);
              ssrRenderList(plan.features, (feature, j) => {
                _push(`<li class="mb-2 flex items-center" data-v-c037521d><svg class="w-5 h-5 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20" data-v-c037521d><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-c037521d></path></svg> ${ssrInterpolate(feature)}</li>`);
              });
              _push(`<!--]--></ul>`);
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: plan.link,
                class: "btn-primary block w-full py-2"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(plan.buttonText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(plan.buttonText), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</div>`);
            });
            _push(`<!--]--></div></div></div>`);
          } else if (sectionType === "testimonials") {
            _push(`<div class="py-16 mb-12" data-v-c037521d><div class="max-w-6xl mx-auto px-4" data-v-c037521d><h2 class="text-3xl font-bold text-center mb-12" data-v-c037521d>${ssrInterpolate(testimonialsContent.value.title)}</h2><div class="grid md:grid-cols-2 gap-8" data-v-c037521d><!--[-->`);
            ssrRenderList(testimonialsContent.value.items, (testimonial, i) => {
              _push(`<div class="card" data-v-c037521d><div class="flex items-center mb-4" data-v-c037521d><img${ssrRenderAttr("src", testimonial.avatar)} alt="Avatar" class="w-12 h-12 rounded-full mr-4" data-v-c037521d><div data-v-c037521d><h4 class="font-bold" data-v-c037521d>${ssrInterpolate(testimonial.name)}</h4><p class="text-gray-600 text-sm" data-v-c037521d>${ssrInterpolate(testimonial.position)}</p></div></div><p class="text-gray-700" data-v-c037521d>${ssrInterpolate(testimonial.content)}</p></div>`);
            });
            _push(`<!--]--></div></div></div>`);
          } else if (sectionType === "contact") {
            _push(`<div class="py-16 mb-12" data-v-c037521d><div class="max-w-4xl mx-auto px-4" data-v-c037521d><h2 class="text-3xl font-bold text-center mb-12" data-v-c037521d>${ssrInterpolate(contactContent.value.title)}</h2><div class="card" data-v-c037521d><div class="grid md:grid-cols-2 gap-8" data-v-c037521d><div data-v-c037521d><h3 class="text-xl font-bold mb-4" data-v-c037521d>联系方式</h3><ul class="space-y-4" data-v-c037521d><!--[-->`);
            ssrRenderList(contactContent.value.items, (item, i) => {
              _push(`<li class="flex items-center" data-v-c037521d><span class="text-pink-600 text-xl mr-3" data-v-c037521d>${ssrInterpolate(item.icon)}</span><span data-v-c037521d>${ssrInterpolate(item.text)}</span></li>`);
            });
            _push(`<!--]--></ul></div><div data-v-c037521d><h3 class="text-xl font-bold mb-4" data-v-c037521d>发送消息</h3><form class="space-y-4" data-v-c037521d><div data-v-c037521d><label class="block text-gray-700 mb-2" data-v-c037521d>姓名</label><input type="text" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-c037521d></div><div data-v-c037521d><label class="block text-gray-700 mb-2" data-v-c037521d>邮箱</label><input type="email" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-c037521d></div><div data-v-c037521d><label class="block text-gray-700 mb-2" data-v-c037521d>消息</label><textarea rows="4" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500" data-v-c037521d></textarea></div><button type="submit" class="btn-primary" data-v-c037521d>发送消息</button></form></div></div></div></div></div>`);
          } else if (sectionType === "reseller_pricing") {
            _push(`<div class="py-16 mb-12 bg-gray-50" data-v-c037521d><div class="max-w-6xl mx-auto px-4" data-v-c037521d><h2 class="text-3xl font-bold text-center mb-12" data-v-c037521d>${ssrInterpolate(resellerPricingContent.value.title)}</h2><div class="grid md:grid-cols-3 gap-8" data-v-c037521d><!--[-->`);
            ssrRenderList(resellerPricingContent.value.plans, (plan, i) => {
              _push(`<div class="${ssrRenderClass([{ "border-blue-500 border-2": plan.featured }, "card text-center"])}" data-v-c037521d><h3 class="text-xl font-bold mb-2" data-v-c037521d>${ssrInterpolate(plan.name)}</h3><div class="text-3xl font-bold text-blue-600 mb-4" data-v-c037521d>¥${ssrInterpolate(plan.price)}<span class="text-sm text-gray-500" data-v-c037521d>/${ssrInterpolate(plan.unit)}</span></div><ul class="mb-6 text-left" data-v-c037521d><!--[-->`);
              ssrRenderList(plan.features, (feature, j) => {
                _push(`<li class="mb-2 flex items-center" data-v-c037521d><svg class="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" data-v-c037521d><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-c037521d></path></svg> ${ssrInterpolate(feature)}</li>`);
              });
              _push(`<!--]--></ul>`);
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: plan.link,
                class: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(plan.buttonText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(plan.buttonText), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</div>`);
            });
            _push(`<!--]--></div></div></div>`);
          } else if (sectionType === "gallery") {
            _push(`<div class="py-16 mb-12" data-v-c037521d><div class="max-w-6xl mx-auto px-4" data-v-c037521d><h2 class="text-3xl font-bold text-center mb-12" data-v-c037521d>${ssrInterpolate(galleryContent.value.title)}</h2><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-c037521d><!--[-->`);
            ssrRenderList(galleryContent.value.images, (image, i) => {
              _push(`<div class="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" data-v-c037521d><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", image.caption)} class="w-full h-64 object-cover" data-v-c037521d><div class="p-4 bg-white" data-v-c037521d><h3 class="font-bold text-lg mb-2" data-v-c037521d>${ssrInterpolate(image.caption)}</h3><p class="text-gray-600 text-sm" data-v-c037521d>${ssrInterpolate(image.description)}</p></div></div>`);
            });
            _push(`<!--]--></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</section>`);
        });
        _push(`<!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c037521d"]]);

export { index as default };
//# sourceMappingURL=index.vue.mjs.map
