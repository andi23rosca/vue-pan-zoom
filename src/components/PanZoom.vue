<template>
  <div class="container" ref="container">
    <div ref="content" :style="`transform: ${transform};`">
      <!-- @slot Content to be zoomed / panned -->
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import panZoom from "../utils/panZoom";
export default Vue.extend({
  props: {
    /**
     * The maximum zooming amount
     */
    maxZoom: {
      type: Number,
      default: 5
    },
    /**
     * The minimum zooming amount
     */
    minZoom: {
      type: Number,
      default: 0.2
    },
    /**
     * How much to zoom in/out when using the mouse wheel
     */
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
<docs>
## Usage
```ignore
npm install @andi23rosca/vue-pan-zoom
```

Import and register it into any component you need to use 
```ignore
import PanZoom from "@andi23rosca/vue-pan-zoom";

export default {
  components: { PanZoom }
}
```

See the example below on how to use it.

```vue
<div style="height: 500px; width: 100%; background-color: #DDDDDD;"> 
  <pan-zoom>
    <img src="/vue-pan-zoom/demo.jpg" style="width: 100%;"/>
  </pan-zoom>
</div>
```
```vue
<div style="height: 500px; width: 100%; background-color: #DDDDDD;"> 
  <pan-zoom :max-zoom="3" :min-zoom="0.5" :zoom-step="0.5">
    <img src="/vue-pan-zoom/demo.jpg" style="width: 100%;"/>
  </pan-zoom>
</div>
```
</docs>
