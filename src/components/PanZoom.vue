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
      tr => {
        this.transform = tr;
      }
    );
  }
  // data() {
  //   return {
  //     dragging: false,
  //     style: {
  //       x: 0,
  //       y: 0,
  //       zoom: 1
  //     },
  //     startX: 0,
  //     startY: 0,
  //     startZoom: 0
  //   };
  // },
  // methods: {
  //   reset() {
  //     this.dragging = false;
  //     this.style = { x: 0, y: 0, zoom: 1 };
  //     this.startX = 0;
  //     this.startY = 0;
  //   },
  //   mouseDown(e: MouseEvent) {
  //     this.dragging = true;
  //     this.startX = e.clientX - this.style.x;
  //     this.startY = e.clientY - this.style.y;

  //     window.addEventListener("mousemove", this.mouseMove);
  //     window.addEventListener("mouseup", this.stopDrag);
  //   },
  //   touchStart(e: TouchEvent) {
  //     this.dragging = true;
  //     this.startX = e.touches[0].clientX - this.style.x;
  //     this.startY = e.touches[0].clientY - this.style.y;
  //     window.addEventListener("touchmove", this.touchMove, {
  //       passive: false
  //     });
  //     window.addEventListener("touchend", this.stopDrag, { passive: true });
  //     e.preventDefault();
  //   },
  //   touchMove(e: TouchEvent) {
  //     if (e.touches.length === 2) {
  //       const dist = getTouchDistance(e);
  //       const delta = dist - this.startZoom;
  //       this.startZoom = dist;
  //       this.setZoom(this.style.zoom + delta);
  //     }
  //     if (e.touches.length === 1) {
  //       this.drag(e.touches[0].clientX, e.touches[0].clientY);
  //     }
  //     e.preventDefault();
  //     e.stopImmediatePropagation();
  //   },
  //   stopDrag() {
  //     this.dragging = false;
  //     window.removeEventListener("mousemove", this.mouseMove);
  //     window.removeEventListener("mouseup", this.stopDrag);
  //     window.removeEventListener("touchmove", this.touchMove);
  //     window.removeEventListener("touchend", this.stopDrag);
  //   },
  //   mouseMove(e: MouseEvent) {
  //     this.drag(e.clientX, e.clientY);
  //   },
  //   drag(x: number, y: number) {
  //     this.style.x = x - this.startX;
  //     this.style.y = y - this.startY;
  //   },
  //   doForAllSlots(cb: (el: HTMLElement) => void) {
  //     this.$slots.default?.forEach(slot => {
  //       cb(slot.elm as HTMLElement);
  //     });
  //   },
  //   mouseWheel(e: MouseWheelEvent) {
  //     if (e.deltaY > 0) this.zoomIn();
  //     else this.zoomOut();
  //   },
  //   zoomIn() {
  //     this.setZoom(this.style.zoom - this.zoomStep);
  //   },
  //   zoomOut() {
  //     this.setZoom(this.style.zoom + this.zoomStep);
  //   },
  //   setZoom(z: number) {
  //     this.style.zoom = Math.max(Math.min(z, this.maxZoom), this.minZoom);
  //   }
  // },
  // mounted() {
  //   this.doForAllSlots(el => {
  //     el.setAttribute("draggable", "false");
  //     el.style.position = "relative";
  //   });
  // },
  // computed: {
  //   transform(): string {
  //     const { x, y, zoom } = this.style;
  //     return `translate(${x}px, ${y}px) scale(${zoom}, ${zoom})`;
  //   }
  // }
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
