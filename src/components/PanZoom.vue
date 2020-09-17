<template>
  <div class="container" ref="container">
    <div ref="content" :style="`transform: ${transform}`">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Emulator from "hammer-touchemulator";
import panzoom from "./panzoom";
if (process.env.NODE_ENV === "development") {
  Emulator();
}
export default Vue.extend({
  props: {
    maxZoom: {
      type: Number,
      default: 5
    },
    minZoom: {
      type: Number,
      default: 0.2
    },
    zoomStep: {
      type: Number,
      default: 0.2
    }
  },
  data() {
    return {
      transform: ""
    };
  },
  mounted() {
    const { container, content } = this.$refs;
    const setTransform = (tx: number, ty: number, s: number) => {
      this.transform = `translate(${tx}px, ${ty}px) scale(s)`;
    };
    panzoom(container as HTMLElement, content as HTMLElement, setTransform);
  }
});
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  user-select: none;
  touch-action: none;
}
</style>
