import { ref, computed, watch, mergeProps, unref, defineComponent, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, renderSlot, withModifiers, withDirectives, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderSlot, ssrRenderAttr } from 'vue/server-renderer';
import { Mic, Waves, BarChart3, Volume2, Play, Settings, Square, Pause, Loader2, User, RefreshCw, Info, Zap, Download, Share2, X, Users, UserPlus, Check, CheckCircle, AlertCircle } from 'lucide-vue-next';
import { useForwardPropsEmits, DialogRoot, DialogTrigger, DialogPortal, DialogContent, DialogClose, useForwardProps, DialogTitle, DialogDescription, Primitive, DialogOverlay, PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
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

const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Popover",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverRoot), mergeProps({ "data-slot": "popover" }, unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/Popover.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PopoverContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    side: {},
    sideOffset: { default: 4 },
    align: { default: "center" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean },
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PopoverContent), mergeProps({ "data-slot": "popover-content" }, { ...unref(forwarded), ..._ctx.$attrs }, {
              class: unref(cn)(
                "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md origin-(--reka-popover-content-transform-origin) outline-hidden",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(PopoverContent), mergeProps({ "data-slot": "popover-content" }, { ...unref(forwarded), ..._ctx.$attrs }, {
                class: unref(cn)(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md origin-(--reka-popover-content-transform-origin) outline-hidden",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/PopoverContent.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "PopoverTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverTrigger), mergeProps({ "data-slot": "popover-trigger" }, props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/PopoverTrigger.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {},
    size: {},
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "button",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        class: unref(cn)(unref(buttonVariants)({ variant: _ctx.variant, size: _ctx.size }), props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/button/Button.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$b = {
  __name: "AllSpeakers",
  __ssrInlineRender: true,
  setup(__props) {
    const speakers = ref([]);
    const isLoading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$f), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$d), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    variant: "outline",
                    class: "flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 border-white/20"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Users), { class: "h-5 w-5 text-purple-400" }, null, _parent4, _scopeId3));
                        _push4(` See speakers `);
                      } else {
                        return [
                          createVNode(unref(Users), { class: "h-5 w-5 text-purple-400" }),
                          createTextVNode(" See speakers ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$c), {
                      variant: "outline",
                      class: "flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 border-white/20"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Users), { class: "h-5 w-5 text-purple-400" }),
                        createTextVNode(" See speakers ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$e), { class: "w-96 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-xl p-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!isLoading.value && speakers.value.length) {
                    _push3(`<div class="text-center" data-v-43291686${_scopeId2}><div class="relative mb-6" data-v-43291686${_scopeId2}><div class="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto" data-v-43291686${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Users), { class: "h-12 w-12 text-purple-400" }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-20 animate-ping" data-v-43291686${_scopeId2}></div><div class="absolute inset-4 bg-pink-400 rounded-full blur-xl opacity-15 animate-ping animation-delay-1000" data-v-43291686${_scopeId2}></div></div><h3 class="text-lg font-bold text-white mb-3" data-v-43291686${_scopeId2}>Registered Speakers</h3><p class="text-white/60 text-base mb-4" data-v-43291686${_scopeId2}>Total: ${ssrInterpolate(speakers.value.length)} speakers</p><div class="grid grid-cols-1 gap-3" data-v-43291686${_scopeId2}><!--[-->`);
                    ssrRenderList(speakers.value, (speaker) => {
                      _push3(`<div class="backdrop-blur-sm bg-white/10 p-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300" data-v-43291686${_scopeId2}><div class="flex items-center gap-2" data-v-43291686${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(User), { class: "h-5 w-5 text-purple-400" }, null, _parent3, _scopeId2));
                      _push3(`<span class="text-white font-medium" data-v-43291686${_scopeId2}>${ssrInterpolate(speaker)}</span></div></div>`);
                    });
                    _push3(`<!--]--></div><p class="text-white/40 mt-4 text-sm" data-v-43291686${_scopeId2}>Click &quot;Start Recording&quot; to begin voice capture</p></div>`);
                  } else if (isLoading.value) {
                    _push3(`<div class="text-center" data-v-43291686${_scopeId2}><div class="relative mb-6" data-v-43291686${_scopeId2}><div class="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto" data-v-43291686${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Loader2), { class: "h-12 w-12 text-purple-400 animate-spin" }, null, _parent3, _scopeId2));
                    _push3(`</div></div><p class="text-white/60 text-base" data-v-43291686${_scopeId2}>Loading speakers...</p></div>`);
                  } else {
                    _push3(`<div class="text-center" data-v-43291686${_scopeId2}><div class="relative mb-6" data-v-43291686${_scopeId2}><div class="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto" data-v-43291686${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Users), { class: "h-12 w-12 text-purple-400" }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-20 animate-ping" data-v-43291686${_scopeId2}></div><div class="absolute inset-4 bg-pink-400 rounded-full blur-xl opacity-15 animate-ping animation-delay-1000" data-v-43291686${_scopeId2}></div></div><p class="text-white/60 text-base" data-v-43291686${_scopeId2}>No speakers registered</p><p class="text-white/40 mt-2 text-sm" data-v-43291686${_scopeId2}>Click &quot;Start Recording&quot; to begin voice capture</p></div>`);
                  }
                } else {
                  return [
                    !isLoading.value && speakers.value.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center"
                    }, [
                      createVNode("div", { class: "relative mb-6" }, [
                        createVNode("div", { class: "w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto" }, [
                          createVNode(unref(Users), { class: "h-12 w-12 text-purple-400" })
                        ]),
                        createVNode("div", { class: "absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-20 animate-ping" }),
                        createVNode("div", { class: "absolute inset-4 bg-pink-400 rounded-full blur-xl opacity-15 animate-ping animation-delay-1000" })
                      ]),
                      createVNode("h3", { class: "text-lg font-bold text-white mb-3" }, "Registered Speakers"),
                      createVNode("p", { class: "text-white/60 text-base mb-4" }, "Total: " + toDisplayString(speakers.value.length) + " speakers", 1),
                      createVNode("div", { class: "grid grid-cols-1 gap-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(speakers.value, (speaker) => {
                          return openBlock(), createBlock("div", {
                            key: speaker,
                            class: "backdrop-blur-sm bg-white/10 p-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(User), { class: "h-5 w-5 text-purple-400" }),
                              createVNode("span", { class: "text-white font-medium" }, toDisplayString(speaker), 1)
                            ])
                          ]);
                        }), 128))
                      ]),
                      createVNode("p", { class: "text-white/40 mt-4 text-sm" }, 'Click "Start Recording" to begin voice capture')
                    ])) : isLoading.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center"
                    }, [
                      createVNode("div", { class: "relative mb-6" }, [
                        createVNode("div", { class: "w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto" }, [
                          createVNode(unref(Loader2), { class: "h-12 w-12 text-purple-400 animate-spin" })
                        ])
                      ]),
                      createVNode("p", { class: "text-white/60 text-base" }, "Loading speakers...")
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "text-center"
                    }, [
                      createVNode("div", { class: "relative mb-6" }, [
                        createVNode("div", { class: "w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto" }, [
                          createVNode(unref(Users), { class: "h-12 w-12 text-purple-400" })
                        ]),
                        createVNode("div", { class: "absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-20 animate-ping" }),
                        createVNode("div", { class: "absolute inset-4 bg-pink-400 rounded-full blur-xl opacity-15 animate-ping animation-delay-1000" })
                      ]),
                      createVNode("p", { class: "text-white/60 text-base" }, "No speakers registered"),
                      createVNode("p", { class: "text-white/40 mt-2 text-sm" }, 'Click "Start Recording" to begin voice capture')
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$d), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), {
                    variant: "outline",
                    class: "flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 border-white/20"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Users), { class: "h-5 w-5 text-purple-400" }),
                      createTextVNode(" See speakers ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$e), { class: "w-96 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-xl p-6" }, {
                default: withCtx(() => [
                  !isLoading.value && speakers.value.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center"
                  }, [
                    createVNode("div", { class: "relative mb-6" }, [
                      createVNode("div", { class: "w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto" }, [
                        createVNode(unref(Users), { class: "h-12 w-12 text-purple-400" })
                      ]),
                      createVNode("div", { class: "absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-20 animate-ping" }),
                      createVNode("div", { class: "absolute inset-4 bg-pink-400 rounded-full blur-xl opacity-15 animate-ping animation-delay-1000" })
                    ]),
                    createVNode("h3", { class: "text-lg font-bold text-white mb-3" }, "Registered Speakers"),
                    createVNode("p", { class: "text-white/60 text-base mb-4" }, "Total: " + toDisplayString(speakers.value.length) + " speakers", 1),
                    createVNode("div", { class: "grid grid-cols-1 gap-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(speakers.value, (speaker) => {
                        return openBlock(), createBlock("div", {
                          key: speaker,
                          class: "backdrop-blur-sm bg-white/10 p-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                        }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(User), { class: "h-5 w-5 text-purple-400" }),
                            createVNode("span", { class: "text-white font-medium" }, toDisplayString(speaker), 1)
                          ])
                        ]);
                      }), 128))
                    ]),
                    createVNode("p", { class: "text-white/40 mt-4 text-sm" }, 'Click "Start Recording" to begin voice capture')
                  ])) : isLoading.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center"
                  }, [
                    createVNode("div", { class: "relative mb-6" }, [
                      createVNode("div", { class: "w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto" }, [
                        createVNode(unref(Loader2), { class: "h-12 w-12 text-purple-400 animate-spin" })
                      ])
                    ]),
                    createVNode("p", { class: "text-white/60 text-base" }, "Loading speakers...")
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "text-center"
                  }, [
                    createVNode("div", { class: "relative mb-6" }, [
                      createVNode("div", { class: "w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto" }, [
                        createVNode(unref(Users), { class: "h-12 w-12 text-purple-400" })
                      ]),
                      createVNode("div", { class: "absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-20 animate-ping" }),
                      createVNode("div", { class: "absolute inset-4 bg-pink-400 rounded-full blur-xl opacity-15 animate-ping animation-delay-1000" })
                    ]),
                    createVNode("p", { class: "text-white/60 text-base" }, "No speakers registered"),
                    createVNode("p", { class: "text-white/40 mt-2 text-sm" }, 'Click "Start Recording" to begin voice capture')
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AllSpeakers.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-43291686"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps({ "data-slot": "dialog" }, unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/Dialog.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DialogClose",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogClose), mergeProps({ "data-slot": "dialog-close" }, props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogClose.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DialogOverlay",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogOverlay), mergeProps({ "data-slot": "dialog-overlay" }, unref(delegatedProps), {
        class: unref(cn)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogOverlay.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DialogContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$8, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(DialogContent), mergeProps({ "data-slot": "dialog-content" }, unref(forwarded), {
              class: unref(cn)(
                "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(ssrRenderComponent(unref(DialogClose), { class: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(X), null, null, _parent4, _scopeId3));
                        _push4(`<span class="sr-only"${_scopeId3}>Close</span>`);
                      } else {
                        return [
                          createVNode(unref(X)),
                          createVNode("span", { class: "sr-only" }, "Close")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default"),
                    createVNode(unref(DialogClose), { class: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" }, {
                      default: withCtx(() => [
                        createVNode(unref(X)),
                        createVNode("span", { class: "sr-only" }, "Close")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$8),
              createVNode(unref(DialogContent), mergeProps({ "data-slot": "dialog-content" }, unref(forwarded), {
                class: unref(cn)(
                  "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  createVNode(unref(DialogClose), { class: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" }, {
                    default: withCtx(() => [
                      createVNode(unref(X)),
                      createVNode("span", { class: "sr-only" }, "Close")
                    ]),
                    _: 1
                  })
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogContent.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DialogDescription",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogDescription), mergeProps({ "data-slot": "dialog-description" }, unref(forwardedProps), {
        class: unref(cn)("text-muted-foreground text-sm", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogDescription.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DialogFooter",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "dialog-footer",
        class: unref(cn)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogFooter.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DialogHeader",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "dialog-header",
        class: unref(cn)("flex flex-col gap-2 text-center sm:text-left", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DialogTitle",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTitle), mergeProps({ "data-slot": "dialog-title" }, unref(forwardedProps), {
        class: unref(cn)("text-lg leading-none font-semibold", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogTitle.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DialogTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTrigger), mergeProps({ "data-slot": "dialog-trigger" }, props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogTrigger.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "AddSpeaker",
  __ssrInlineRender: true,
  props: {
    audioBlob: {
      type: Blob,
      default: null
    },
    audioDuration: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    const showDialog = ref(false);
    const speakerName = ref("");
    const isSubmitting = ref(false);
    const validationError = ref("");
    const showToast = ref(false);
    const toastMessage = ref("");
    const toastType = ref("success");
    const canSubmit = computed(() => {
      return speakerName.value.trim().length >= 2 && speakerName.value.trim().length <= 50 && props.audioBlob && props.audioDuration >= 3;
    });
    watch(speakerName, (newName) => {
      validationError.value = "";
      if (newName.trim().length === 0) {
        return;
      }
      if (newName.trim().length < 2) {
        validationError.value = "Name must be at least 2 characters";
      } else if (newName.trim().length > 50) {
        validationError.value = "Name must be less than 50 characters";
      } else if (!/^[a-zA-Z\s\-'\.]+$/.test(newName.trim())) {
        validationError.value = "Name can only contain letters, spaces, hyphens, apostrophes, and periods";
      }
    });
    const handleDialogChange = (open) => {
      if (!open && !isSubmitting.value) {
        showDialog.value = false;
        speakerName.value = "";
        validationError.value = "";
      }
    };
    const showToastMessage = (message, type = "success") => {
      toastMessage.value = message;
      toastType.value = type;
      showToast.value = true;
      setTimeout(() => {
        hideToast();
      }, 5e3);
    };
    const hideToast = () => {
      showToast.value = false;
    };
    const formatDuration = (seconds) => {
      if (isNaN(seconds)) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const getQualityText = (duration) => {
      if (duration >= 10) return "Excellent";
      if (duration >= 5) return "Good";
      if (duration >= 3) return "Fair";
      return "Poor";
    };
    const getQualityBarClass = (duration) => {
      if (duration >= 10) return "bg-gradient-to-r from-green-500 to-emerald-500";
      if (duration >= 5) return "bg-gradient-to-r from-yellow-500 to-orange-500";
      if (duration >= 3) return "bg-gradient-to-r from-orange-500 to-red-500";
      return "bg-gradient-to-r from-red-500 to-red-600";
    };
    const getQualityPercentage = (duration) => {
      if (duration >= 10) return 100;
      if (duration >= 5) return 75;
      if (duration >= 3) return 50;
      return 25;
    };
    const getQualityMessage = (duration) => {
      if (duration >= 10) return "Perfect for accurate speaker identification";
      if (duration >= 5) return "Good quality for speaker identification";
      if (duration >= 3) return "Minimum quality for speaker identification";
      return "Recording too short for reliable identification";
    };
    const submitSpeaker = async () => {
      if (!canSubmit.value || isSubmitting.value) return;
      if (!props.audioBlob || !(props.audioBlob instanceof Blob)) {
        showToastMessage("Invalid audio file provided", "error");
        return;
      }
      if (!speakerName.value.trim()) {
        showToastMessage("Speaker name cannot be empty", "error");
        return;
      }
      if (props.audioBlob.size > 10 * 1024 * 1024) {
        showToastMessage("Audio file exceeds 10MB limit", "error");
        return;
      }
      if (!["video/mp4", "audio/mp4"].includes(props.audioBlob.type)) {
        showToastMessage("Only MP4 or M4A files are supported", "error");
        return;
      }
      isSubmitting.value = true;
      try {
        const formData = new FormData();
        formData.append("speaker_name", speakerName.value.trim());
        formData.append("file", props.audioBlob, "recording.mp4");
        const backendUrl = "http://127.0.0.1:8000";
        const response = await fetch(`${backendUrl}/add_speaker`, {
          method: "POST",
          body: formData
        });
        const result = await response.json();
        console.log("Response:", result);
        if (response.ok) {
          showToastMessage(`Speaker "${speakerName.value.trim()}" added successfully!`, "success");
          showDialog.value = false;
          speakerName.value = "";
          validationError.value = "";
        } else {
          throw new Error(result.detail || result.error || "Failed to add speaker");
        }
      } catch (error) {
        console.error("Error adding speaker:", error);
        showToastMessage(error.message || "Failed to add speaker. Please try again.", "error");
      } finally {
        isSubmitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-382adbe3><button${ssrIncludeBooleanAttr(!__props.audioBlob) ? " disabled" : ""} class="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed" data-v-382adbe3>`);
      _push(ssrRenderComponent(unref(UserPlus), { class: "h-5 w-5" }, null, _parent));
      _push(` Add Speaker </button>`);
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        open: showDialog.value,
        "onUpdate:open": handleDialogChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$7), { class: "max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative group" data-v-382adbe3${_scopeId2}><div class="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" data-v-382adbe3${_scopeId2}></div><div class="relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20" data-v-382adbe3${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "mb-6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-3" data-v-382adbe3${_scopeId3}><div class="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10" data-v-382adbe3${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(UserPlus), { class: "h-6 w-6 text-orange-400" }, null, _parent4, _scopeId3));
                        _push4(`</div><div data-v-382adbe3${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$3), { class: "text-xl font-bold text-white" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add New Speaker`);
                            } else {
                              return [
                                createTextVNode("Add New Speaker")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-white/60 text-sm" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Register this voice in the database`);
                            } else {
                              return [
                                createTextVNode("Register this voice in the database")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10" }, [
                              createVNode(unref(UserPlus), { class: "h-6 w-6 text-orange-400" })
                            ]),
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$3), { class: "text-xl font-bold text-white" }, {
                                default: withCtx(() => [
                                  createTextVNode("Add New Speaker")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), { class: "text-white/60 text-sm" }, {
                                default: withCtx(() => [
                                  createTextVNode("Register this voice in the database")
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-6" data-v-382adbe3${_scopeId2}><div data-v-382adbe3${_scopeId2}><label for="speakerName" class="block text-sm font-medium text-white/80 mb-2" data-v-382adbe3${_scopeId2}> Speaker Name </label><div class="relative" data-v-382adbe3${_scopeId2}><input id="speakerName"${ssrRenderAttr("value", speakerName.value)} type="text" placeholder="Enter speaker&#39;s full name" class="${ssrRenderClass([{ "border-red-500/50 focus:ring-red-500/50": validationError.value }, "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"])}"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} maxlength="50" required aria-describedby="speakerNameError" data-v-382adbe3${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(User), { class: "absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex justify-between items-center mt-1" data-v-382adbe3${_scopeId2}>`);
                  if (validationError.value) {
                    _push3(`<p id="speakerNameError" class="text-red-400 text-sm" data-v-382adbe3${_scopeId2}>${ssrInterpolate(validationError.value)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span class="text-white/40 text-xs ml-auto" data-v-382adbe3${_scopeId2}>${ssrInterpolate(speakerName.value.length)}/50</span></div></div><div class="space-y-3" data-v-382adbe3${_scopeId2}><h4 class="text-sm font-medium text-white/80" data-v-382adbe3${_scopeId2}>Audio Information</h4><div class="bg-white/5 rounded-xl p-4 border border-white/10" data-v-382adbe3${_scopeId2}><div class="space-y-2 text-sm" data-v-382adbe3${_scopeId2}><div class="flex justify-between" data-v-382adbe3${_scopeId2}><span class="text-white/60" data-v-382adbe3${_scopeId2}>Duration:</span><span class="text-white font-mono" data-v-382adbe3${_scopeId2}>${ssrInterpolate(formatDuration(__props.audioDuration))}</span></div><div class="flex justify-between" data-v-382adbe3${_scopeId2}><span class="text-white/60" data-v-382adbe3${_scopeId2}>Format:</span><span class="text-white font-mono" data-v-382adbe3${_scopeId2}>MP4 (AAC)</span></div><div class="flex justify-between" data-v-382adbe3${_scopeId2}><span class="text-white/60" data-v-382adbe3${_scopeId2}>Quality:</span><span class="text-emerald-400 font-medium" data-v-382adbe3${_scopeId2}>${ssrInterpolate(getQualityText(__props.audioDuration))}</span></div></div><div class="mt-3" data-v-382adbe3${_scopeId2}><div class="flex items-center gap-2 mb-1" data-v-382adbe3${_scopeId2}><span class="text-xs text-white/60" data-v-382adbe3${_scopeId2}>Recording Quality:</span><div class="flex-1 h-1 bg-white/20 rounded-full overflow-hidden" data-v-382adbe3${_scopeId2}><div class="${ssrRenderClass([getQualityBarClass(__props.audioDuration), "h-full rounded-full transition-all duration-500"])}" style="${ssrRenderStyle(`width: ${getQualityPercentage(__props.audioDuration)}%`)}" data-v-382adbe3${_scopeId2}></div></div></div><p class="text-xs text-white/50" data-v-382adbe3${_scopeId2}>${ssrInterpolate(getQualityMessage(__props.audioDuration))}</p></div></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "flex gap-3 pt-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<button type="button"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="flex-1 px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white border border-white/20 hover:border-white/30 disabled:border-white/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium disabled:opacity-50" aria-label="Cancel adding speaker" data-v-382adbe3${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(` Cancel </button>`);
                            } else {
                              return [
                                createVNode("button", {
                                  type: "button",
                                  disabled: isSubmitting.value,
                                  class: "flex-1 px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white border border-white/20 hover:border-white/30 disabled:border-white/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium disabled:opacity-50",
                                  "aria-label": "Cancel adding speaker"
                                }, [
                                  createVNode(unref(X), { class: "h-4 w-4" }),
                                  createTextVNode(" Cancel ")
                                ], 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<button type="submit"${ssrIncludeBooleanAttr(!canSubmit.value || isSubmitting.value) ? " disabled" : ""} class="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Submit speaker" data-v-382adbe3${_scopeId3}>`);
                        if (isSubmitting.value) {
                          _push4(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 animate-spin" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        }
                        _push4(` ${ssrInterpolate(isSubmitting.value ? "Adding..." : "Add Speaker")}</button>`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$9), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode("button", {
                                type: "button",
                                disabled: isSubmitting.value,
                                class: "flex-1 px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white border border-white/20 hover:border-white/30 disabled:border-white/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium disabled:opacity-50",
                                "aria-label": "Cancel adding speaker"
                              }, [
                                createVNode(unref(X), { class: "h-4 w-4" }),
                                createTextVNode(" Cancel ")
                              ], 8, ["disabled"])
                            ]),
                            _: 1
                          }),
                          createVNode("button", {
                            type: "submit",
                            disabled: !canSubmit.value || isSubmitting.value,
                            class: "flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                            "aria-label": "Submit speaker"
                          }, [
                            isSubmitting.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "h-4 w-4 animate-spin"
                            })) : (openBlock(), createBlock(unref(Check), {
                              key: 1,
                              class: "h-4 w-4"
                            })),
                            createTextVNode(" " + toDisplayString(isSubmitting.value ? "Adding..." : "Add Speaker"), 1)
                          ], 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative group" }, [
                      createVNode("div", { class: "absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" }),
                      createVNode("div", { class: "relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20" }, [
                        createVNode(unref(_sfc_main$4), { class: "mb-6" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10" }, [
                                createVNode(unref(UserPlus), { class: "h-6 w-6 text-orange-400" })
                              ]),
                              createVNode("div", null, [
                                createVNode(unref(_sfc_main$3), { class: "text-xl font-bold text-white" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Add New Speaker")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), { class: "text-white/60 text-sm" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Register this voice in the database")
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode("form", {
                          onSubmit: withModifiers(submitSpeaker, ["prevent"]),
                          class: "space-y-6"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "speakerName",
                              class: "block text-sm font-medium text-white/80 mb-2"
                            }, " Speaker Name "),
                            createVNode("div", { class: "relative" }, [
                              withDirectives(createVNode("input", {
                                id: "speakerName",
                                "onUpdate:modelValue": ($event) => speakerName.value = $event,
                                type: "text",
                                placeholder: "Enter speaker's full name",
                                class: ["w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300", { "border-red-500/50 focus:ring-red-500/50": validationError.value }],
                                disabled: isSubmitting.value,
                                maxlength: "50",
                                required: "",
                                "aria-describedby": "speakerNameError"
                              }, null, 10, ["onUpdate:modelValue", "disabled"]), [
                                [vModelText, speakerName.value]
                              ]),
                              createVNode(unref(User), { class: "absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" })
                            ]),
                            createVNode("div", { class: "flex justify-between items-center mt-1" }, [
                              validationError.value ? (openBlock(), createBlock("p", {
                                key: 0,
                                id: "speakerNameError",
                                class: "text-red-400 text-sm"
                              }, toDisplayString(validationError.value), 1)) : createCommentVNode("", true),
                              createVNode("span", { class: "text-white/40 text-xs ml-auto" }, toDisplayString(speakerName.value.length) + "/50", 1)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("h4", { class: "text-sm font-medium text-white/80" }, "Audio Information"),
                            createVNode("div", { class: "bg-white/5 rounded-xl p-4 border border-white/10" }, [
                              createVNode("div", { class: "space-y-2 text-sm" }, [
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", { class: "text-white/60" }, "Duration:"),
                                  createVNode("span", { class: "text-white font-mono" }, toDisplayString(formatDuration(__props.audioDuration)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", { class: "text-white/60" }, "Format:"),
                                  createVNode("span", { class: "text-white font-mono" }, "MP4 (AAC)")
                                ]),
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", { class: "text-white/60" }, "Quality:"),
                                  createVNode("span", { class: "text-emerald-400 font-medium" }, toDisplayString(getQualityText(__props.audioDuration)), 1)
                                ])
                              ]),
                              createVNode("div", { class: "mt-3" }, [
                                createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                                  createVNode("span", { class: "text-xs text-white/60" }, "Recording Quality:"),
                                  createVNode("div", { class: "flex-1 h-1 bg-white/20 rounded-full overflow-hidden" }, [
                                    createVNode("div", {
                                      class: ["h-full rounded-full transition-all duration-500", getQualityBarClass(__props.audioDuration)],
                                      style: `width: ${getQualityPercentage(__props.audioDuration)}%`
                                    }, null, 6)
                                  ])
                                ]),
                                createVNode("p", { class: "text-xs text-white/50" }, toDisplayString(getQualityMessage(__props.audioDuration)), 1)
                              ])
                            ])
                          ]),
                          createVNode(unref(_sfc_main$5), { class: "flex gap-3 pt-4" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode("button", {
                                    type: "button",
                                    disabled: isSubmitting.value,
                                    class: "flex-1 px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white border border-white/20 hover:border-white/30 disabled:border-white/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium disabled:opacity-50",
                                    "aria-label": "Cancel adding speaker"
                                  }, [
                                    createVNode(unref(X), { class: "h-4 w-4" }),
                                    createTextVNode(" Cancel ")
                                  ], 8, ["disabled"])
                                ]),
                                _: 1
                              }),
                              createVNode("button", {
                                type: "submit",
                                disabled: !canSubmit.value || isSubmitting.value,
                                class: "flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                                "aria-label": "Submit speaker"
                              }, [
                                isSubmitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "h-4 w-4 animate-spin"
                                })) : (openBlock(), createBlock(unref(Check), {
                                  key: 1,
                                  class: "h-4 w-4"
                                })),
                                createTextVNode(" " + toDisplayString(isSubmitting.value ? "Adding..." : "Add Speaker"), 1)
                              ], 8, ["disabled"])
                            ]),
                            _: 1
                          })
                        ], 32)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$7), { class: "max-w-md" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "relative group" }, [
                    createVNode("div", { class: "absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" }),
                    createVNode("div", { class: "relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20" }, [
                      createVNode(unref(_sfc_main$4), { class: "mb-6" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10" }, [
                              createVNode(unref(UserPlus), { class: "h-6 w-6 text-orange-400" })
                            ]),
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$3), { class: "text-xl font-bold text-white" }, {
                                default: withCtx(() => [
                                  createTextVNode("Add New Speaker")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), { class: "text-white/60 text-sm" }, {
                                default: withCtx(() => [
                                  createTextVNode("Register this voice in the database")
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("form", {
                        onSubmit: withModifiers(submitSpeaker, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "speakerName",
                            class: "block text-sm font-medium text-white/80 mb-2"
                          }, " Speaker Name "),
                          createVNode("div", { class: "relative" }, [
                            withDirectives(createVNode("input", {
                              id: "speakerName",
                              "onUpdate:modelValue": ($event) => speakerName.value = $event,
                              type: "text",
                              placeholder: "Enter speaker's full name",
                              class: ["w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300", { "border-red-500/50 focus:ring-red-500/50": validationError.value }],
                              disabled: isSubmitting.value,
                              maxlength: "50",
                              required: "",
                              "aria-describedby": "speakerNameError"
                            }, null, 10, ["onUpdate:modelValue", "disabled"]), [
                              [vModelText, speakerName.value]
                            ]),
                            createVNode(unref(User), { class: "absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" })
                          ]),
                          createVNode("div", { class: "flex justify-between items-center mt-1" }, [
                            validationError.value ? (openBlock(), createBlock("p", {
                              key: 0,
                              id: "speakerNameError",
                              class: "text-red-400 text-sm"
                            }, toDisplayString(validationError.value), 1)) : createCommentVNode("", true),
                            createVNode("span", { class: "text-white/40 text-xs ml-auto" }, toDisplayString(speakerName.value.length) + "/50", 1)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("h4", { class: "text-sm font-medium text-white/80" }, "Audio Information"),
                          createVNode("div", { class: "bg-white/5 rounded-xl p-4 border border-white/10" }, [
                            createVNode("div", { class: "space-y-2 text-sm" }, [
                              createVNode("div", { class: "flex justify-between" }, [
                                createVNode("span", { class: "text-white/60" }, "Duration:"),
                                createVNode("span", { class: "text-white font-mono" }, toDisplayString(formatDuration(__props.audioDuration)), 1)
                              ]),
                              createVNode("div", { class: "flex justify-between" }, [
                                createVNode("span", { class: "text-white/60" }, "Format:"),
                                createVNode("span", { class: "text-white font-mono" }, "MP4 (AAC)")
                              ]),
                              createVNode("div", { class: "flex justify-between" }, [
                                createVNode("span", { class: "text-white/60" }, "Quality:"),
                                createVNode("span", { class: "text-emerald-400 font-medium" }, toDisplayString(getQualityText(__props.audioDuration)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "mt-3" }, [
                              createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                                createVNode("span", { class: "text-xs text-white/60" }, "Recording Quality:"),
                                createVNode("div", { class: "flex-1 h-1 bg-white/20 rounded-full overflow-hidden" }, [
                                  createVNode("div", {
                                    class: ["h-full rounded-full transition-all duration-500", getQualityBarClass(__props.audioDuration)],
                                    style: `width: ${getQualityPercentage(__props.audioDuration)}%`
                                  }, null, 6)
                                ])
                              ]),
                              createVNode("p", { class: "text-xs text-white/50" }, toDisplayString(getQualityMessage(__props.audioDuration)), 1)
                            ])
                          ])
                        ]),
                        createVNode(unref(_sfc_main$5), { class: "flex gap-3 pt-4" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), { "as-child": "" }, {
                              default: withCtx(() => [
                                createVNode("button", {
                                  type: "button",
                                  disabled: isSubmitting.value,
                                  class: "flex-1 px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white border border-white/20 hover:border-white/30 disabled:border-white/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium disabled:opacity-50",
                                  "aria-label": "Cancel adding speaker"
                                }, [
                                  createVNode(unref(X), { class: "h-4 w-4" }),
                                  createTextVNode(" Cancel ")
                                ], 8, ["disabled"])
                              ]),
                              _: 1
                            }),
                            createVNode("button", {
                              type: "submit",
                              disabled: !canSubmit.value || isSubmitting.value,
                              class: "flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                              "aria-label": "Submit speaker"
                            }, [
                              isSubmitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "h-4 w-4 animate-spin"
                              })) : (openBlock(), createBlock(unref(Check), {
                                key: 1,
                                class: "h-4 w-4"
                              })),
                              createTextVNode(" " + toDisplayString(isSubmitting.value ? "Adding..." : "Add Speaker"), 1)
                            ], 8, ["disabled"])
                          ]),
                          _: 1
                        })
                      ], 32)
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (showToast.value) {
        _push(`<div class="${ssrRenderClass([{ "translate-x-full": !showToast.value }, "fixed top-4 right-4 z-60 transform transition-all duration-300"])}" data-v-382adbe3><div class="relative group" data-v-382adbe3><div class="${ssrRenderClass([toastType.value === "success" ? "bg-gradient-to-r from-green-600 to-emerald-600" : "bg-gradient-to-r from-red-600 to-rose-600", "absolute -inset-1 rounded-2xl blur opacity-25"])}" data-v-382adbe3></div><div class="${ssrRenderClass([toastType.value === "success" ? "bg-green-900/20 border-green-500/30" : "bg-red-900/20 border-red-500/30", "relative backdrop-blur-xl p-4 rounded-2xl border max-w-sm"])}" data-v-382adbe3><div class="flex items-center gap-3" data-v-382adbe3><div class="${ssrRenderClass([toastType.value === "success" ? "bg-green-500/20" : "bg-red-500/20", "w-8 h-8 rounded-full flex items-center justify-center"])}" data-v-382adbe3>`);
        if (toastType.value === "success") {
          _push(ssrRenderComponent(unref(CheckCircle), { class: "h-5 w-5 text-green-400" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(AlertCircle), { class: "h-5 w-5 text-red-400" }, null, _parent));
        }
        _push(`</div><div class="flex-1" data-v-382adbe3><p class="font-medium text-white text-sm" data-v-382adbe3>${ssrInterpolate(toastMessage.value)}</p></div><button class="p-1 hover:bg-white/10 rounded-lg transition-colors" aria-label="Close toast" data-v-382adbe3>`);
        _push(ssrRenderComponent(unref(X), { class: "h-4 w-4 text-white/60" }, null, _parent));
        _push(`</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AddSpeaker.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-382adbe3"]]);
const _sfc_main = {
  __name: "record",
  __ssrInlineRender: true,
  setup(__props) {
    const isRecording = ref(false);
    ref(null);
    ref([]);
    const audioBlob = ref(null);
    ref("");
    const audioElement = ref(null);
    ref(null);
    ref(null);
    ref(null);
    const liveAudioLevels = ref(Array(80).fill(5));
    const isIdentifying = ref(false);
    const recordingTime = ref(0);
    const audioLevel = ref(0);
    const visualizationMode = ref("bars");
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const volume = ref(80);
    const isDialogOpen = ref(false);
    const identificationResult = ref(null);
    computed(() => {
      if (duration.value === 0) return 0;
      return currentTime.value / duration.value * 100;
    });
    computed(() => {
      if (isRecording.value) return "bg-red-500 animate-pulse";
      if (isPlaying.value) return "bg-green-500 animate-pulse";
      if (audioBlob.value) return "bg-blue-500";
      return "bg-gray-500";
    });
    computed(() => {
      if (isRecording.value) return "Recording in progress";
      if (isPlaying.value) return "Playing audio";
      if (audioBlob.value) return "Audio ready";
      return "Ready to record";
    });
    watch(volume, (newVolume) => {
      if (audioElement.value) {
        audioElement.value.volume = newVolume / 100;
      }
    });
    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AllSpeakers = __nuxt_component_0;
      const _component_AddSpeaker = __nuxt_component_1;
      const _component_Button = _sfc_main$c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-8 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden" }, _attrs))} data-v-09b9f5b3><div class="absolute inset-0 overflow-hidden" data-v-09b9f5b3><div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" data-v-09b9f5b3></div><div class="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" data-v-09b9f5b3></div><div class="absolute top-40 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" data-v-09b9f5b3></div><div class="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-6000" data-v-09b9f5b3></div></div><div class="absolute inset-0 pointer-events-none" data-v-09b9f5b3><!--[-->`);
      ssrRenderList(15, (i) => {
        _push(`<div class="absolute opacity-10" style="${ssrRenderStyle(`
             left: ${Math.random() * 100}%; 
             top: ${Math.random() * 100}%; 
             animation-delay: ${Math.random() * 8}s;
           `)}" data-v-09b9f5b3><div class="w-8 h-8 border-2 border-white rounded-full animate-ping" data-v-09b9f5b3></div></div>`);
      });
      _push(`<!--]--></div><div class="container mx-auto max-w-6xl relative z-10" data-v-09b9f5b3><div class="flex justify-between items-center mb-16" data-aos="fade-down" data-v-09b9f5b3><div class="inline-flex items-center gap-4 mb-6" data-v-09b9f5b3><div class="relative" data-v-09b9f5b3><div class="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20" data-v-09b9f5b3>`);
      _push(ssrRenderComponent(unref(Mic), { class: "h-8 w-8 text-purple-400" }, null, _parent));
      _push(`</div><div class="absolute inset-0 bg-purple-400 rounded-2xl blur-xl opacity-30 animate-pulse" data-v-09b9f5b3></div></div><div class="text-left" data-v-09b9f5b3><h1 class="text-5xl lg:text-6xl font-bold" data-v-09b9f5b3><span class="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent" data-v-09b9f5b3> Speaker Identification </span></h1><p class="text-white/60 text-lg mt-2" data-v-09b9f5b3>Advanced AI-powered voice recognition</p></div></div>`);
      _push(ssrRenderComponent(_component_AllSpeakers, null, null, _parent));
      _push(`</div><div class="grid lg:grid-cols-3 gap-8 mb-12" data-v-09b9f5b3><div class="lg:col-span-2" data-aos="fade-right" data-aos-delay="200" data-v-09b9f5b3><div class="relative group" data-v-09b9f5b3><div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" data-v-09b9f5b3></div><div class="relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20" data-v-09b9f5b3><div class="flex items-center justify-between mb-6" data-v-09b9f5b3><h3 class="text-xl font-bold text-white flex items-center gap-2" data-v-09b9f5b3>`);
      _push(ssrRenderComponent(unref(Waves), { class: "h-5 w-5 text-purple-400" }, null, _parent));
      _push(` Audio Visualization </h3><div class="flex items-center gap-2" data-v-09b9f5b3><button class="p-2 backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-300" data-v-09b9f5b3>`);
      if (visualizationMode.value === "waveform") {
        _push(ssrRenderComponent(unref(BarChart3), { class: "h-4 w-4 text-white/80" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Waves), { class: "h-4 w-4 text-white/80" }, null, _parent));
      }
      _push(`</button></div></div><div class="h-96 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl flex items-center justify-center overflow-hidden relative border border-white/10" data-v-09b9f5b3>`);
      if (!audioBlob.value && !isRecording.value) {
        _push(`<div class="text-center" data-v-09b9f5b3><div class="relative mb-8" data-v-09b9f5b3><div class="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto" data-v-09b9f5b3>`);
        _push(ssrRenderComponent(unref(Mic), { class: "h-16 w-16 text-purple-400" }, null, _parent));
        _push(`</div><div class="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-20 animate-ping" data-v-09b9f5b3></div><div class="absolute inset-4 bg-pink-400 rounded-full blur-xl opacity-15 animate-ping animation-delay-1000" data-v-09b9f5b3></div></div><p class="text-white/60 text-xl mb-4" data-v-09b9f5b3>Ready to Record</p><p class="text-white/40" data-v-09b9f5b3>Click &quot;Start Recording&quot; to begin voice capture</p></div>`);
      } else if (isRecording.value) {
        _push(`<div class="w-full h-full flex items-center justify-center p-8" data-v-09b9f5b3><div class="flex items-end gap-1 w-full h-full max-w-5xl" data-v-09b9f5b3><!--[-->`);
        ssrRenderList(liveAudioLevels.value, (level, i) => {
          _push(`<div class="${ssrRenderClass([visualizationMode.value === "bars" ? "w-3" : "w-1", "bg-gradient-to-t from-purple-500 to-cyan-300 rounded-full transition-all duration-100 ease-out shadow-lg"])}" style="${ssrRenderStyle(`
                        height: ${level}%; 
                        box-shadow: 0 0 ${level / 5}px rgba(168, 85, 247, 0.6);
                        animation-delay: ${i * 20}ms;
                      `)}" data-v-09b9f5b3></div>`);
        });
        _push(`<!--]--></div><div class="absolute top-6 right-6 flex items-center gap-3 backdrop-blur-sm bg-red-500/20 px-6 py-3 rounded-2xl border border-red-500/30" data-v-09b9f5b3><div class="relative" data-v-09b9f5b3><div class="w-4 h-4 bg-red-500 rounded-full animate-pulse" data-v-09b9f5b3></div><div class="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" data-v-09b9f5b3></div></div><div class="text-white" data-v-09b9f5b3><div class="text-sm font-medium" data-v-09b9f5b3>Recording</div><div class="text-xs opacity-80" data-v-09b9f5b3>${ssrInterpolate(formatTime(recordingTime.value))}</div></div></div><div class="absolute bottom-6 left-6 right-6" data-v-09b9f5b3><div class="backdrop-blur-sm bg-white/10 p-4 rounded-xl border border-white/20" data-v-09b9f5b3><div class="flex items-center gap-3" data-v-09b9f5b3>`);
        _push(ssrRenderComponent(unref(Volume2), { class: "h-5 w-5 text-white/80" }, null, _parent));
        _push(`<div class="flex-1 h-2 bg-white/20 rounded-full overflow-hidden" data-v-09b9f5b3><div class="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-100" style="${ssrRenderStyle(`width: ${audioLevel.value}%`)}" data-v-09b9f5b3></div></div><span class="text-white/80 text-sm font-mono" data-v-09b9f5b3>${ssrInterpolate(Math.round(audioLevel.value))}%</span></div></div></div></div>`);
      } else {
        _push(`<div class="w-full h-full relative" data-v-09b9f5b3><canvas class="w-full h-full rounded-xl cursor-pointer" style="${ssrRenderStyle({ "min-height": "384px" })}" data-v-09b9f5b3></canvas>`);
        if (audioBlob.value) {
          _push(`<div class="absolute inset-0 flex items-center justify-center pointer-events-none" data-v-09b9f5b3>`);
          if (!isPlaying.value) {
            _push(`<div class="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 pointer-events-auto cursor-pointer" data-v-09b9f5b3>`);
            _push(ssrRenderComponent(unref(Play), { class: "h-10 w-10 text-white ml-1" }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (audioBlob.value && isPlaying.value) {
          _push(`<div class="absolute top-4 left-4 right-4" data-v-09b9f5b3><div class="backdrop-blur-sm bg-white/10 p-3 rounded-xl border border-white/20" data-v-09b9f5b3><div class="flex items-center gap-3" data-v-09b9f5b3><div class="w-3 h-3 bg-green-500 rounded-full animate-pulse" data-v-09b9f5b3></div><div class="text-white/80 text-sm" data-v-09b9f5b3>Playing audio visualization</div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div></div></div><div class="space-y-6" data-aos="fade-left" data-aos-delay="400" data-v-09b9f5b3><div class="relative group" data-v-09b9f5b3><div class="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" data-v-09b9f5b3></div><div class="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20" data-v-09b9f5b3><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2" data-v-09b9f5b3>`);
      _push(ssrRenderComponent(unref(Settings), { class: "h-5 w-5 text-purple-400" }, null, _parent));
      _push(` Controls </h3><div class="space-y-4" data-v-09b9f5b3>`);
      if (!isRecording.value && !audioBlob.value) {
        _push(`<button class="w-full group px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 flex items-center justify-center gap-3 font-medium" data-v-09b9f5b3>`);
        _push(ssrRenderComponent(unref(Mic), { class: "h-5 w-5 group-hover:animate-pulse" }, null, _parent));
        _push(` Start Recording </button>`);
      } else {
        _push(`<!---->`);
      }
      if (isRecording.value) {
        _push(`<button class="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/30 flex items-center justify-center gap-3 font-medium" data-v-09b9f5b3>`);
        _push(ssrRenderComponent(unref(Square), { class: "h-5 w-5" }, null, _parent));
        _push(` Stop Recording </button>`);
      } else {
        _push(`<!---->`);
      }
      if (audioBlob.value) {
        _push(`<div class="space-y-3" data-v-09b9f5b3><button class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 font-medium"${ssrIncludeBooleanAttr(isPlaying.value) ? " disabled" : ""} data-v-09b9f5b3>`);
        if (!isPlaying.value) {
          _push(ssrRenderComponent(unref(Play), { class: "h-5 w-5" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(Pause), { class: "h-5 w-5" }, null, _parent));
        }
        _push(` ${ssrInterpolate(isPlaying.value ? "Playing" : "Play Audio")}</button>`);
        _push(ssrRenderComponent(_component_AddSpeaker, {
          audioBlob: audioBlob.value,
          audioDuration: duration.value
        }, null, _parent));
        _push(`<button${ssrIncludeBooleanAttr(isIdentifying.value) ? " disabled" : ""} class="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-3 font-medium" data-v-09b9f5b3>`);
        if (isIdentifying.value) {
          _push(ssrRenderComponent(unref(Loader2), { class: "h-5 w-5 animate-spin" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(User), { class: "h-5 w-5" }, null, _parent));
        }
        _push(` ${ssrInterpolate(isIdentifying.value ? "Analyzing..." : "Identify Speaker")}</button><button class="w-full px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 font-medium" data-v-09b9f5b3>`);
        _push(ssrRenderComponent(unref(RefreshCw), { class: "h-5 w-5" }, null, _parent));
        _push(` New Recording </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (audioBlob.value) {
        _push(`<div class="relative group" data-v-09b9f5b3><div class="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" data-v-09b9f5b3></div><div class="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20" data-v-09b9f5b3><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2" data-v-09b9f5b3>`);
        _push(ssrRenderComponent(unref(Info), { class: "h-5 w-5 text-blue-400" }, null, _parent));
        _push(` Audio Info </h3><div class="space-y-3 text-sm" data-v-09b9f5b3><div class="flex justify-between items-center" data-v-09b9f5b3><span class="text-white/60" data-v-09b9f5b3>Duration:</span><span class="text-white font-mono" data-v-09b9f5b3>${ssrInterpolate(formatTime(duration.value))}</span></div><div class="flex justify-between items-center" data-v-09b9f5b3><span class="text-white/60" data-v-09b9f5b3>Size:</span><span class="text-white font-mono" data-v-09b9f5b3>${ssrInterpolate(formatFileSize(audioBlob.value.size))}</span></div><div class="flex justify-between items-center" data-v-09b9f5b3><span class="text-white/60" data-v-09b9f5b3>Format:</span><span class="text-white font-mono" data-v-09b9f5b3>WAV</span></div><div class="flex justify-between items-center" data-v-09b9f5b3><span class="text-white/60" data-v-09b9f5b3>Quality:</span><span class="text-emerald-400 font-medium" data-v-09b9f5b3>High</span></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative group" data-v-09b9f5b3><div class="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" data-v-09b9f5b3></div><div class="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20" data-v-09b9f5b3><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2" data-v-09b9f5b3>`);
      _push(ssrRenderComponent(unref(Zap), { class: "h-5 w-5 text-orange-400" }, null, _parent));
      _push(` Quick Actions </h3><div class="grid grid-cols-2 gap-3" data-v-09b9f5b3><button${ssrIncludeBooleanAttr(!audioBlob.value) ? " disabled" : ""} class="p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white border border-white/20 hover:border-white/30 disabled:border-white/10 rounded-xl transition-all duration-300 hover:scale-105 flex flex-col items-center gap-2 text-sm disabled:opacity-50" data-v-09b9f5b3>`);
      _push(ssrRenderComponent(unref(Download), { class: "h-5 w-5" }, null, _parent));
      _push(` Download </button><button${ssrIncludeBooleanAttr(!audioBlob.value) ? " disabled" : ""} class="p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white border border-white/20 hover:border-white/30 disabled:border-white/10 rounded-xl transition-all duration-300 hover:scale-105 flex flex-col items-center gap-2 text-sm disabled:opacity-50" data-v-09b9f5b3>`);
      _push(ssrRenderComponent(unref(Share2), { class: "h-5 w-5" }, null, _parent));
      _push(` Share </button></div></div></div></div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        open: isDialogOpen.value,
        "onUpdate:open": ($event) => isDialogOpen.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { "as-child": "" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$7), { class: "sm:max-w-[425px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), { class: "text-2xl font-bold text-white flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(User), { class: "h-6 w-6 text-emerald-400" }, null, _parent5, _scopeId4));
                              _push5(` Identification Results `);
                            } else {
                              return [
                                createVNode(unref(User), { class: "h-6 w-6 text-emerald-400" }),
                                createTextVNode(" Identification Results ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-white/60" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Results of the speaker identification analysis `);
                            } else {
                              return [
                                createTextVNode(" Results of the speaker identification analysis ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$3), { class: "text-2xl font-bold text-white flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(User), { class: "h-6 w-6 text-emerald-400" }),
                              createTextVNode(" Identification Results ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), { class: "text-white/60" }, {
                            default: withCtx(() => [
                              createTextVNode(" Results of the speaker identification analysis ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (identificationResult.value) {
                    _push3(`<div class="space-y-6 mt-4" data-v-09b9f5b3${_scopeId2}><div class="p-4 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl border border-emerald-500/30" data-v-09b9f5b3${_scopeId2}><h4 class="text-lg font-semibold text-white" data-v-09b9f5b3${_scopeId2}>Best Match</h4><div class="mt-2 space-y-2" data-v-09b9f5b3${_scopeId2}><div class="flex justify-between items-center" data-v-09b9f5b3${_scopeId2}><span class="text-white/80" data-v-09b9f5b3${_scopeId2}>Speaker:</span><span class="text-white font-medium" data-v-09b9f5b3${_scopeId2}>${ssrInterpolate(identificationResult.value.speaker === "unknown stylizeds0t0eunknown" ? "Unknown" : identificationResult.value.speaker)}</span></div><div class="flex justify-between items-center" data-v-09b9f5b3${_scopeId2}><span class="text-white/80" data-v-09b9f5b3${_scopeId2}>Confidence:</span><span class="text-emerald-400 font-medium" data-v-09b9f5b3${_scopeId2}>${ssrInterpolate(identificationResult.value.confidence ? identificationResult.value.confidence.toFixed(2) + "%" : "0")}</span></div>`);
                    if (identificationResult.value.message) {
                      _push3(`<div class="text-sm text-white/60" data-v-09b9f5b3${_scopeId2}>${ssrInterpolate(identificationResult.value.message)}</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                    if (identificationResult.value.otherSpeakers && identificationResult.value.otherSpeakers.length) {
                      _push3(`<div class="space-y-2" data-v-09b9f5b3${_scopeId2}><h4 class="text-lg font-semibold text-white" data-v-09b9f5b3${_scopeId2}>Other Possible Matches</h4><!--[-->`);
                      ssrRenderList(identificationResult.value.otherSpeakers, (speaker, index) => {
                        _push3(`<div class="p-3 bg-white/5 rounded-lg border border-white/10" data-v-09b9f5b3${_scopeId2}><div class="flex justify-between items-center" data-v-09b9f5b3${_scopeId2}><span class="text-white/80" data-v-09b9f5b3${_scopeId2}>${ssrInterpolate(speaker.name)}</span><span class="text-white/60" data-v-09b9f5b3${_scopeId2}>${ssrInterpolate(speaker.confidence)}%</span></div></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (identificationResult.value.error) {
                      _push3(`<div class="p-4 bg-red-500/20 rounded-xl border border-red-500/30" data-v-09b9f5b3${_scopeId2}><h4 class="text-lg font-semibold text-white" data-v-09b9f5b3${_scopeId2}>Error</h4><p class="text-white/80 mt-2" data-v-09b9f5b3${_scopeId2}>${ssrInterpolate(identificationResult.value.error)}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, {
                          type: "button",
                          variant: "secondary",
                          onClick: ($event) => isDialogOpen.value = false,
                          class: "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Close `);
                            } else {
                              return [
                                createTextVNode(" Close ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, {
                            type: "button",
                            variant: "secondary",
                            onClick: ($event) => isDialogOpen.value = false,
                            class: "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Close ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), { class: "text-2xl font-bold text-white flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(User), { class: "h-6 w-6 text-emerald-400" }),
                            createTextVNode(" Identification Results ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), { class: "text-white/60" }, {
                          default: withCtx(() => [
                            createTextVNode(" Results of the speaker identification analysis ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    identificationResult.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-6 mt-4"
                    }, [
                      createVNode("div", { class: "p-4 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl border border-emerald-500/30" }, [
                        createVNode("h4", { class: "text-lg font-semibold text-white" }, "Best Match"),
                        createVNode("div", { class: "mt-2 space-y-2" }, [
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-white/80" }, "Speaker:"),
                            createVNode("span", { class: "text-white font-medium" }, toDisplayString(identificationResult.value.speaker === "unknown stylizeds0t0eunknown" ? "Unknown" : identificationResult.value.speaker), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-white/80" }, "Confidence:"),
                            createVNode("span", { class: "text-emerald-400 font-medium" }, toDisplayString(identificationResult.value.confidence ? identificationResult.value.confidence.toFixed(2) + "%" : "0"), 1)
                          ]),
                          identificationResult.value.message ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-sm text-white/60"
                          }, toDisplayString(identificationResult.value.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      identificationResult.value.otherSpeakers && identificationResult.value.otherSpeakers.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2"
                      }, [
                        createVNode("h4", { class: "text-lg font-semibold text-white" }, "Other Possible Matches"),
                        (openBlock(true), createBlock(Fragment, null, renderList(identificationResult.value.otherSpeakers, (speaker, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "p-3 bg-white/5 rounded-lg border border-white/10"
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", { class: "text-white/80" }, toDisplayString(speaker.name), 1),
                              createVNode("span", { class: "text-white/60" }, toDisplayString(speaker.confidence) + "%", 1)
                            ])
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      identificationResult.value.error ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "p-4 bg-red-500/20 rounded-xl border border-red-500/30"
                      }, [
                        createVNode("h4", { class: "text-lg font-semibold text-white" }, "Error"),
                        createVNode("p", { class: "text-white/80 mt-2" }, toDisplayString(identificationResult.value.error), 1)
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          type: "button",
                          variant: "secondary",
                          onClick: ($event) => isDialogOpen.value = false,
                          class: "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Close ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { "as-child": "" }),
              createVNode(unref(_sfc_main$7), { class: "sm:max-w-[425px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "text-2xl font-bold text-white flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(User), { class: "h-6 w-6 text-emerald-400" }),
                          createTextVNode(" Identification Results ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { class: "text-white/60" }, {
                        default: withCtx(() => [
                          createTextVNode(" Results of the speaker identification analysis ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  identificationResult.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-6 mt-4"
                  }, [
                    createVNode("div", { class: "p-4 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl border border-emerald-500/30" }, [
                      createVNode("h4", { class: "text-lg font-semibold text-white" }, "Best Match"),
                      createVNode("div", { class: "mt-2 space-y-2" }, [
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("span", { class: "text-white/80" }, "Speaker:"),
                          createVNode("span", { class: "text-white font-medium" }, toDisplayString(identificationResult.value.speaker === "unknown stylizeds0t0eunknown" ? "Unknown" : identificationResult.value.speaker), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("span", { class: "text-white/80" }, "Confidence:"),
                          createVNode("span", { class: "text-emerald-400 font-medium" }, toDisplayString(identificationResult.value.confidence ? identificationResult.value.confidence.toFixed(2) + "%" : "0"), 1)
                        ]),
                        identificationResult.value.message ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-sm text-white/60"
                        }, toDisplayString(identificationResult.value.message), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    identificationResult.value.otherSpeakers && identificationResult.value.otherSpeakers.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      createVNode("h4", { class: "text-lg font-semibold text-white" }, "Other Possible Matches"),
                      (openBlock(true), createBlock(Fragment, null, renderList(identificationResult.value.otherSpeakers, (speaker, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "p-3 bg-white/5 rounded-lg border border-white/10"
                        }, [
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-white/80" }, toDisplayString(speaker.name), 1),
                            createVNode("span", { class: "text-white/60" }, toDisplayString(speaker.confidence) + "%", 1)
                          ])
                        ]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    identificationResult.value.error ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-4 bg-red-500/20 rounded-xl border border-red-500/30"
                    }, [
                      createVNode("h4", { class: "text-lg font-semibold text-white" }, "Error"),
                      createVNode("p", { class: "text-white/80 mt-2" }, toDisplayString(identificationResult.value.error), 1)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        type: "button",
                        variant: "secondary",
                        onClick: ($event) => isDialogOpen.value = false,
                        class: "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Close ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/record.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const record = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-09b9f5b3"]]);

export { record as default };
//# sourceMappingURL=record-Bga9XVsa.mjs.map
