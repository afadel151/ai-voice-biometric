import { _ as __nuxt_component_0 } from './nuxt-link-CbjLLMUf.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { Mic } from 'lucide-vue-next';
import { u as useRouter } from './server.mjs';
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
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const agreeToTerms = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center px-4" }, _attrs))}><div class="w-full max-w-md"><div class="relative"><div class="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75"></div><div class="relative bg-zinc-900 p-8 rounded-lg border border-zinc-800"><div class="flex justify-center mb-6">`);
      _push(ssrRenderComponent(unref(Mic), { class: "h-10 w-10 text-purple-500" }, null, _parent));
      _push(`</div><h2 class="text-2xl font-bold text-center mb-6">Create your account</h2><form class="space-y-4"><div class="grid grid-cols-2 gap-4"><div class="space-y-2"><label for="firstName" class="block text-sm font-medium text-zinc-400">First name</label><input id="firstName"${ssrRenderAttr("value", firstName.value)} type="text" required class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"></div><div class="space-y-2"><label for="lastName" class="block text-sm font-medium text-zinc-400">Last name</label><input id="lastName"${ssrRenderAttr("value", lastName.value)} type="text" required class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"></div></div><div class="space-y-2"><label for="email" class="block text-sm font-medium text-zinc-400">Email</label><input id="email"${ssrRenderAttr("value", email.value)} type="email" required class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"></div><div class="space-y-2"><label for="password" class="block text-sm font-medium text-zinc-400">Password</label><input id="password"${ssrRenderAttr("value", password.value)} type="password" required class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"></div><div class="flex items-center"><input id="terms" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(agreeToTerms.value) ? ssrLooseContain(agreeToTerms.value, null) : agreeToTerms.value) ? " checked" : ""} required class="h-4 w-4 bg-zinc-800 border-zinc-700 rounded focus:ring-purple-500 text-purple-600"><label for="terms" class="ml-2 block text-sm text-zinc-400"> I agree to the <a href="#" class="text-purple-400 hover:text-purple-300">Terms of Service</a> and <a href="#" class="text-purple-400 hover:text-purple-300">Privacy Policy</a></label></div><button type="submit" class="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors transform hover:scale-105 font-medium"> Sign up </button></form><div class="mt-6 text-center text-sm text-zinc-400"> Already have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-purple-400 hover:text-purple-300 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Log in`);
          } else {
            return [
              createTextVNode("Log in")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=signup-u5ICppjh.mjs.map
