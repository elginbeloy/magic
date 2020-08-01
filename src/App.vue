<template>
  <div id="app">
    <SideNav />
    <div class="page-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideNav from "./components/SideNav.vue";

@Component({
  components: {
    SideNav
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap");
@import url("./assets/font/iconfont.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-grow: 0;
}

html,
body {
  background-color: #1e2125;
}

#app {
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 600px;
  min-height: 600px;

  background-color: #1e2125;
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page-container {
  position: absolute;
  top: 0;
  left: 30%;
  width: 70%;
  height: 100%;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-colm {
  display: flex;
  flex-direction: column;
}
</style>
