<template>
  <div class="container" ref="container">
    <div ref="content" :style="`transform: ${transform};`">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Emulator from "hammer-touchemulator";
if (process.env.NODE_ENV === "development") {
  Emulator();
}
import panZoom from "./panZoom";
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
    panZoom(
      this.$refs.container as HTMLElement,
      this.$refs.content as HTMLElement,
      this.minZoom,
      this.maxZoom,
      this.zoomStep
    );
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
