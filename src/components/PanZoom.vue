<template>
  <div class="container" ref="container" @mousewheel.prevent="mouseWheel">
    <div class="content" ref="content" :style="style">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Emulator from "hammer-touchemulator";
import Point from "@/helpers/Point";
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
      origin: Point.origin(),
      translate: Point.origin(),
      translating: Point.origin(),
      contentOffset: Point.origin(),
      start: Point.origin(),
      zoom: 1,
      distance: 1,
      zooming: 1,
      distancing: 1,
      style: {
        transformOrigin: ``,
        transform: ``,
      },
      isMac: navigator.platform.toUpperCase().indexOf("MAC") >= 0,
    };
  },
  mounted() {
    const { container } = this.$refs;
    (container as HTMLElement).addEventListener("touchstart", this.touchStart);
  },
  methods: {
    setTransform(translate: Point, origin: Point, zoom: number) {
      this.style = {
        transformOrigin: `${origin.x}px ${origin.y}px`,
        transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
      };
    },
    touchStart(e: TouchEvent) {
      document.addEventListener("touchmove", this.touchMove);
      document.addEventListener("touchend", this.touchEnd);
      this.contentOffset = Point.fromClientRect(
        (this.$refs.content as HTMLElement).getBoundingClientRect()
      );
      const finger1 = Point.fromTouchEvent(e).subtract(this.contentOffset);

      if (e.touches.length > 1) {
        const finger2 = Point.fromTouchEvent(e, 1).subtract(this.contentOffset);
        const center = finger1.centerTo(finger2);
        this.start = center;
        this.distance = finger1.distanceTo(finger2) / this.zoom;
        return;
      } else {
        this.start = finger1;
      }

      const pOrigin = this.origin;
      this.zooming = this.zoom;
      this.distancing = this.distance;
      this.origin = this.start.divideS(this.zoom);
      this.translate = this.translate.subtract(
        this.origin.subtract(pOrigin).multiplyS(1 - this.zoom)
      );
      this.translating = this.translate;
      this.setTransform(this.translate, this.origin, this.zoom);
    },
    touchMove(e: TouchEvent) {
      const finger1 = Point.fromTouchEvent(e).subtract(this.contentOffset);
      let mover = finger1;

      if (e.touches.length > 1) {
        const finger2 = Point.fromTouchEvent(e, 1).subtract(this.contentOffset);
        const center = finger1.centerTo(finger2);
        mover = center;
        this.distancing = finger1.distanceTo(finger2);
        this.zooming = this.distancing / this.distance;
      }
      this.translating = mover.subtract(this.start).add(this.translate);

      this.setTransform(this.translating, this.origin, this.zooming);
    },
    touchEnd() {
      document.removeEventListener("touchmove", this.touchMove);
      document.removeEventListener("touchend", this.touchEnd);
      this.translate = this.translating;
      this.zoom = this.zooming;
      this.distance = this.distancing;
    },
    mouseWheel(e: MouseWheelEvent) {
      if (e.ctrlKey || !this.isMac) {
        this.zoom -= e.deltaY / 50;
        this.zooming = this.zoom;
        this.contentOffset = Point.fromClientRect(
          (this.$refs.content as HTMLElement).getBoundingClientRect()
        );
        this.start = Point.fromMouseEvent(e).subtract(this.contentOffset);
        const pOrigin = this.origin;
        this.distancing = this.distance;
        this.origin = this.start.divideS(this.zoom);
        this.translate = this.translate.subtract(
          this.origin.subtract(pOrigin).multiplyS(1 - this.zoom)
        );
        this.translating = this.translate;
      } else {
        //Move around
        this.translate = this.translate.add(new Point(-e.deltaX, -e.deltaY));
        this.translating = this.translate;
      }
      this.setTransform(this.translate, this.origin, this.zoom);
      console.log(e);
    },
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
  background-size: 50px 50px;
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
