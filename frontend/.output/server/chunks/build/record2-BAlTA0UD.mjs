import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { Mic, Play, Pause, Square, User, RefreshCw } from 'lucide-vue-next';
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
  __name: "record2",
  __ssrInlineRender: true,
  setup(__props) {
    const isRecording = ref(false);
    ref(null);
    ref([]);
    const audioBlob = ref(null);
    ref("");
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    const liveAudioLevels = ref(Array(50).fill(5));
    const resultAnimation = ref("opacity-0 translate-y-4");
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const playbackProgress = computed(() => {
      if (duration.value === 0) return 0;
      return currentTime.value / duration.value * 100;
    });
    const identificationResult = ref(null);
    ref([]);
    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950" }, _attrs))} data-v-3e30bd85><div class="container mx-auto max-w-4xl" data-v-3e30bd85><h1 class="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white" data-v-3e30bd85><span class="text-indigo-600 dark:text-indigo-400" data-v-3e30bd85>Speaker Identification</span></h1><div class="relative bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl" data-v-3e30bd85><div class="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center overflow-hidden" data-v-3e30bd85>`);
      if (!audioBlob.value && !isRecording.value) {
        _push(`<div class="text-gray-500 dark:text-gray-400 flex flex-col items-center" data-v-3e30bd85>`);
        _push(ssrRenderComponent(unref(Mic), { class: "h-12 w-12 mb-2" }, null, _parent));
        _push(`<p data-v-3e30bd85>Click &quot;Start Recording&quot; to begin</p></div>`);
      } else if (isRecording.value) {
        _push(`<div class="w-full h-full flex items-center justify-center p-4" data-v-3e30bd85><div class="flex items-end gap-1 w-full h-full" data-v-3e30bd85><!--[-->`);
        ssrRenderList(liveAudioLevels.value, (level, i) => {
          _push(`<div class="bg-indigo-500 dark:bg-indigo-400 w-2 rounded-full transition-all duration-75 ease-in-out" style="${ssrRenderStyle(`height: ${level}%`)}" data-v-3e30bd85></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<canvas class="w-full h-full bg-gray-200 dark:bg-gray-900" style="${ssrRenderStyle({ "min-height": "256px" })}" data-v-3e30bd85></canvas>`);
      }
      _push(`</div><div class="flex flex-col gap-6" data-v-3e30bd85>`);
      if (audioBlob.value) {
        _push(`<div class="flex items-center justify-center gap-4" data-v-3e30bd85><button class="p-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-all duration-300"${ssrIncludeBooleanAttr(isPlaying.value) ? " disabled" : ""} data-v-3e30bd85>`);
        if (!isPlaying.value) {
          _push(ssrRenderComponent(unref(Play), { class: "h-5 w-5 text-indigo-600 dark:text-indigo-400" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(Pause), { class: "h-5 w-5 text-indigo-600 dark:text-indigo-400" }, null, _parent));
        }
        _push(`</button><div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" data-v-3e30bd85><div class="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300" style="${ssrRenderStyle(`width: ${playbackProgress.value}%`)}" data-v-3e30bd85></div></div><div class="text-sm text-gray-600 dark:text-gray-400" data-v-3e30bd85>${ssrInterpolate(formatTime(currentTime.value))} / ${ssrInterpolate(formatTime(duration.value))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-wrap gap-4 justify-center" data-v-3e30bd85>`);
      if (!isRecording.value && !audioBlob.value) {
        _push(`<button class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300 hover:shadow-md flex items-center gap-2" data-v-3e30bd85>`);
        _push(ssrRenderComponent(unref(Mic), { class: "h-5 w-5" }, null, _parent));
        _push(` Start Recording </button>`);
      } else {
        _push(`<!---->`);
      }
      if (isRecording.value) {
        _push(`<button class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-all duration-300 hover:shadow-md flex items-center gap-2" data-v-3e30bd85>`);
        _push(ssrRenderComponent(unref(Square), { class: "h-5 w-5" }, null, _parent));
        _push(` Stop Recording </button>`);
      } else {
        _push(`<!---->`);
      }
      if (audioBlob.value) {
        _push(`<button class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300 hover:shadow-md flex items-center gap-2" data-v-3e30bd85>`);
        _push(ssrRenderComponent(unref(User), { class: "h-5 w-5" }, null, _parent));
        _push(` Identify Speaker </button>`);
      } else {
        _push(`<!---->`);
      }
      if (audioBlob.value) {
        _push(`<button class="px-6 py-3 border border-gray-300 hover:border-indigo-500 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-md transition-all duration-300 hover:shadow-md flex items-center gap-2" data-v-3e30bd85>`);
        _push(ssrRenderComponent(unref(RefreshCw), { class: "h-5 w-5" }, null, _parent));
        _push(` Record Again </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (identificationResult.value) {
        _push(`<div class="${ssrRenderClass([resultAnimation.value, "mt-8 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 ease-out"])}" data-v-3e30bd85><h3 class="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white" data-v-3e30bd85>`);
        _push(ssrRenderComponent(unref(User), { class: "h-5 w-5 text-indigo-600 dark:text-indigo-400" }, null, _parent));
        _push(` Identification Results </h3><div class="space-y-4" data-v-3e30bd85><div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm" data-v-3e30bd85><div class="flex items-center gap-3" data-v-3e30bd85><div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center" data-v-3e30bd85>`);
        _push(ssrRenderComponent(unref(User), { class: "h-6 w-6 text-indigo-600 dark:text-indigo-400" }, null, _parent));
        _push(`</div><div data-v-3e30bd85><div class="font-medium text-gray-900 dark:text-white" data-v-3e30bd85>${ssrInterpolate(identificationResult.value.name)}</div><div class="text-sm text-gray-500 dark:text-gray-400" data-v-3e30bd85>Primary Speaker</div></div></div><div class="text-lg font-bold text-indigo-600 dark:text-indigo-400" data-v-3e30bd85>${ssrInterpolate(identificationResult.value.confidence)}%</div></div><!--[-->`);
        ssrRenderList(identificationResult.value.otherSpeakers, (speaker, index) => {
          _push(`<div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm" data-v-3e30bd85><div class="flex items-center gap-3" data-v-3e30bd85><div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center" data-v-3e30bd85>`);
          _push(ssrRenderComponent(unref(User), { class: "h-6 w-6 text-gray-500 dark:text-gray-400" }, null, _parent));
          _push(`</div><div data-v-3e30bd85><div class="font-medium text-gray-900 dark:text-white" data-v-3e30bd85>${ssrInterpolate(speaker.name)}</div><div class="text-sm text-gray-500 dark:text-gray-400" data-v-3e30bd85>Possible Match</div></div></div><div class="text-lg font-medium text-gray-600 dark:text-gray-400" data-v-3e30bd85>${ssrInterpolate(speaker.confidence)}%</div></div>`);
        });
        _push(`<!--]--></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/record2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const record2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3e30bd85"]]);

export { record2 as default };
//# sourceMappingURL=record2-BAlTA0UD.mjs.map
