import { _ as __nuxt_component_0 } from './nuxt-link-CbjLLMUf.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderVNode } from 'vue/server-renderer';
import { Mic, ArrowRight, Waves, Brain } from 'lucide-vue-next';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isRecording = ref(false);
    const features = [
      {
        icon: Mic,
        title: "Advanced Recording",
        description: "High-quality audio capture with noise reduction for optimal speaker identification."
      },
      {
        icon: Waves,
        title: "MFCC Analysis",
        description: "Extract Mel-frequency cepstral coefficients for precise voice feature extraction."
      },
      {
        icon: Brain,
        title: "CNN Network",
        description: "Convolutional Neural Network trained on thousands of voice samples for accurate identification."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden" }, _attrs))} data-v-b6277a2a><div class="absolute inset-0 overflow-hidden" data-v-b6277a2a><div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" data-v-b6277a2a></div><div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" data-v-b6277a2a></div><div class="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" data-v-b6277a2a></div></div><div class="absolute inset-0" data-v-b6277a2a><!--[-->`);
      ssrRenderList(20, (i) => {
        _push(`<div class="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float" style="${ssrRenderStyle(`
             left: ${Math.random() * 100}%; 
             top: ${Math.random() * 100}%; 
             animation-delay: ${Math.random() * 5}s;
             animation-duration: ${3 + Math.random() * 4}s;
           `)}" data-v-b6277a2a></div>`);
      });
      _push(`<!--]--></div><header class="relative z-10 container mx-auto px-6 lg:px-12 py-6" data-v-b6277a2a><nav class="flex justify-between items-center backdrop-blur-sm bg-white/5 rounded-2xl px-6 py-4 border border-white/10" data-v-b6277a2a><div class="flex items-center gap-3 group cursor-pointer" data-v-b6277a2a><div class="relative" data-v-b6277a2a>`);
      _push(ssrRenderComponent(unref(Mic), { class: "h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-all duration-300 group-hover:scale-110" }, null, _parent));
      _push(`<div class="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" data-v-b6277a2a></div></div><h1 class="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent" data-v-b6277a2a> VoiceID </h1></div><div class="flex gap-3" data-v-b6277a2a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "px-6 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Login `);
          } else {
            return [
              createTextVNode(" Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign Up `);
          } else {
            return [
              createTextVNode(" Sign Up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav></header><main class="relative z-10 container mx-auto px-6 lg:px-12 py-16" data-v-b6277a2a><div class="flex flex-col lg:flex-row items-center gap-16" data-v-b6277a2a><div class="flex-1 space-y-8" data-aos="fade-right" data-aos-duration="1000" data-v-b6277a2a><div class="space-y-6" data-v-b6277a2a><h2 class="text-6xl lg:text-7xl font-bold leading-tight" data-v-b6277a2a><span class="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent" data-v-b6277a2a> Identify Speakers </span><br data-v-b6277a2a><span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" data-v-b6277a2a> with AI Precision </span></h2><p class="text-xl text-white/70 leading-relaxed max-w-2xl" data-v-b6277a2a> Our advanced CNN network with MFCC coefficients provides state-of-the-art speaker identification. Record, analyze, and identify speakers with just a few clicks. </p></div><div class="flex flex-col sm:flex-row gap-4 pt-4" data-v-b6277a2a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 font-medium text-lg flex items-center justify-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-b6277a2a${_scopeId}>Get Started</span>`);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", null, "Get Started"),
              createVNode(unref(ArrowRight), { class: "h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "px-8 py-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 hover:scale-105 font-medium text-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Learn More `);
          } else {
            return [
              createTextVNode(" Learn More ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex-1 w-full max-w-lg" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200" data-v-b6277a2a><div class="relative group" data-v-b6277a2a><div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" data-v-b6277a2a></div><div class="relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 overflow-hidden" data-v-b6277a2a><div class="h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative" data-v-b6277a2a><div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" data-v-b6277a2a></div><div class="relative flex gap-1 items-end h-full w-full justify-center py-8" data-v-b6277a2a><!--[-->`);
      ssrRenderList(32, (i) => {
        _push(`<div class="w-2 bg-gradient-to-t from-purple-500 to-pink-400 rounded-full animate-wave opacity-80" style="${ssrRenderStyle(`
                      animation-delay: ${i * 0.05}s; 
                      height: ${Math.floor(Math.random() * 60) + 20}px;
                      animation-duration: ${1 + Math.random()}s;
                    `)}" data-v-b6277a2a></div>`);
      });
      _push(`<!--]--></div><div class="absolute inset-0 flex items-center justify-center" data-v-b6277a2a><div class="w-20 h-20 bg-white/10 rounded-full animate-ping" data-v-b6277a2a></div><div class="absolute w-12 h-12 bg-white/20 rounded-full animate-pulse" data-v-b6277a2a></div></div></div><div class="flex gap-3 w-full" data-v-b6277a2a><button class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 font-medium" data-v-b6277a2a>`);
      _push(ssrRenderComponent(unref(Mic), { class: "h-5 w-5" }, null, _parent));
      _push(`<span data-v-b6277a2a>${ssrInterpolate(isRecording.value ? "Recording..." : "Record")}</span></button><button class="flex-1 px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 hover:scale-105 font-medium" data-v-b6277a2a> Identify </button></div></div></div></div></div><div class="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8" data-v-b6277a2a><!--[-->`);
      ssrRenderList(features, (feature, index2) => {
        _push(`<div class="group relative" data-aos="fade-up"${ssrRenderAttr("data-aos-delay", 100 * (index2 + 1))} data-aos-duration="800" data-v-b6277a2a><div class="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000" data-v-b6277a2a></div><div class="relative backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10" data-v-b6277a2a><div class="relative mb-6" data-v-b6277a2a><div class="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300" data-v-b6277a2a>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(feature.icon), { class: "h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" }, null), _parent);
        _push(`</div><div class="absolute inset-0 bg-purple-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" data-v-b6277a2a></div></div><h3 class="text-2xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors duration-300" data-v-b6277a2a>${ssrInterpolate(feature.title)}</h3><p class="text-white/70 leading-relaxed" data-v-b6277a2a>${ssrInterpolate(feature.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></main><footer class="relative z-10 container mx-auto px-6 lg:px-12 py-12 mt-24" data-v-b6277a2a><div class="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10" data-v-b6277a2a><div class="flex flex-col md:flex-row justify-between items-center" data-v-b6277a2a><div class="flex items-center gap-3 mb-4 md:mb-0" data-v-b6277a2a>`);
      _push(ssrRenderComponent(unref(Mic), { class: "h-6 w-6 text-purple-400" }, null, _parent));
      _push(`<span class="font-bold text-xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent" data-v-b6277a2a>VoiceID</span></div><div class="text-white/60" data-v-b6277a2a>\xA9 2025 VoiceID. All rights reserved.</div></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b6277a2a"]]);

export { index as default };
//# sourceMappingURL=index-DsJog0TQ.mjs.map
