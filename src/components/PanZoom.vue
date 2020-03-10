<template>
  <div
    class="container"
    @mousedown="mouseDown"
    @touchstart="touchStart"
    @mousewheel="mouseWheel"
    :style="{
      cursor: dragging ? 'grabbing' : 'grab'
    }"
  >
    <div :style="`transform: ${transform};`">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
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
      dragging: false,
      style: {
        x: 0,
        y: 0,
        zoom: 1
      },
      startX: 0,
      startY: 0
    };
  },
  methods: {
    reset() {
      this.dragging = false;
      this.style = { x: 0, y: 0, zoom: 1 };
      this.startX = 0;
      this.startY = 0;
    },
    mouseDown(e: MouseEvent) {
      this.dragging = true;
      this.startX = e.clientX - this.style.x;
      this.startY = e.clientY - this.style.y;

      window.addEventListener("mousemove", this.mouseMove);
      window.addEventListener("mouseup", this.stopDrag);
    },
    touchStart(e: TouchEvent) {
      this.dragging = true;
      this.startX = e.touches[0].clientX - this.style.x;
      this.startY = e.touches[0].clientY - this.style.y;
      window.addEventListener("touchmove", this.touchMove);
      window.addEventListener("touchend", this.stopDrag);
    },
    stopDrag() {
      this.dragging = false;
      window.removeEventListener("mousemove", this.mouseMove);
      window.removeEventListener("mouseup", this.stopDrag);
      window.removeEventListener("touchend", this.stopDrag);
    },
    mouseMove(e: MouseEvent) {
      this.drag(e.clientX, e.clientY);
    },
    touchMove(e: TouchEvent) {
      this.drag(e.touches[0].clientX, e.touches[0].clientY);
    },
    drag(x: number, y: number) {
      this.style.x = x - this.startX;
      this.style.y = y - this.startY;
    },
    doForAllSlots(cb: (el: HTMLElement) => void) {
      this.$slots.default?.forEach(slot => {
        cb(slot.elm as HTMLElement);
      });
    },
    mouseWheel(e: MouseWheelEvent) {
      if (e.deltaY > 0) this.zoomIn();
      else this.zoomOut();
    },
    zoomIn() {
      this.setZoom(this.style.zoom - this.zoomStep);
    },
    zoomOut() {
      this.setZoom(this.style.zoom + this.zoomStep);
    },
    setZoom(z: number) {
      this.style.zoom = Math.max(Math.min(z, this.maxZoom), this.minZoom);
    }
  },
  mounted() {
    this.doForAllSlots(el => {
      el.setAttribute("draggable", "false");
      el.style.position = "relative";
    });
  },
  computed: {
    transform(): string {
      const { x, y, zoom } = this.style;
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
}
</style>
