<template>
  <div class="container" @mousewheel="mouseWheel">
    <div ref="content" :style="`transform: ${transformStyle}`">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Hammer from "hammerjs";
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
      transform: {
        x: 0,
        y: 0,
        zoom: 1
      },
      start: {
        x: 0,
        y: 0
      },
      lastScale: 0
    };
  },
  mounted() {
    this.doForAllSlots(el => {
      el.setAttribute("draggable", "false");
    });
    const container = new Hammer(this.$refs.content as HTMLElement, {});
    container.get("pinch").set({ enable: true });
    container.get("pan").set({ direction: Hammer.DIRECTION_ALL, threshold: 0 });

    container.on("panstart", e => {
      this.start.x = this.transform.x;
      this.start.y = this.transform.y;
    });
    container.on("panmove", e => {
      this.transform.x = this.start.x + e.deltaX;
      this.transform.y = this.start.y + e.deltaY;
    });

    container.on("pinchmove", e => {
      const delta = e.scale - this.lastScale;
      this.setZoom(delta + this.transform.zoom);
      this.lastScale = e.scale;
      // alert(delta);
    });
  },
  methods: {
    doForAllSlots(cb: (el: HTMLElement) => void) {
      this.$slots.default?.forEach(slot => {
        cb(slot.elm as HTMLElement);
      });
    },
    zoomIn() {
      this.setZoom(this.transform.zoom - this.zoomStep);
    },
    zoomOut() {
      this.setZoom(this.transform.zoom + this.zoomStep);
    },
    setZoom(z: number) {
      this.transform.zoom = Math.max(Math.min(z, this.maxZoom), this.minZoom);
    },
    mouseWheel(e: MouseWheelEvent) {
      if (e.deltaY > 0) this.zoomIn();
      else this.zoomOut();
    }
  },
  computed: {
    transformStyle(): string {
      const { x, y, zoom } = this.transform;
      return `translate(${x}px, ${y}px) scale(${zoom}, ${zoom})`;
    }
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
