<template>
  <div class="container" ref="container">
    <div class="content" ref="content">
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
      default: 5,
    },
    minZoom: {
      type: Number,
      default: 0.2,
    },
    zoomStep: {
      type: Number,
      default: 0.2,
    },
  },
  data() {
    return {
      transform: "",
    };
  },
  mounted() {
    const { container, content } = this.$refs;
    const setTransform = (tx: number, ty: number, s: number) => {
      this.transform = `translate(${tx}px, ${ty}px) scale(s)`;
    };
    panzoom(container as HTMLElement, content as HTMLElement);
  },
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
  background: grey;
}
.content {
  background-color: #efefef;
  background-image: linear-gradient(rgb(181, 189, 218) 1px, transparent 1px),
    linear-gradient(to right, rgb(181, 189, 218) 1px, transparent 1px);
  background-size: 10px 10px;
}
</style>
<style>
.rect {
  width: 3px;
  height: 3px;
  position: absolute;
  background: red;
  top: 0;
  left: 0;
}
</style>
