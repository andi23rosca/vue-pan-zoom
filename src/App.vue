<template>
  <div id="app">
    <pan-zoom>
      <!-- <img alt="Vue logo" src="./assets/logo.png" />
      <img alt="Vue logo" src="./assets/logo.png" /> -->
      <div style="height: 600px;"></div>
    </pan-zoom>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PanZoom from "./components/PanZoom.vue";

export default Vue.extend({
  name: "App",
  components: {
    PanZoom,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
