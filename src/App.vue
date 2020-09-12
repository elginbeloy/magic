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
import { User } from "@/User.ts";

@Component({
  components: {
    SideNav
  }
})
export default class App extends Vue {
  user!: User;

  mounted() {
    this.user = this.$store.state.user;
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap");
@import url("./assets/font/iconfont.css");
@import "./styles.scss";

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba($primary-blue, 0.8);
  border-radius: 6px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: $primary-blue;
}

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

a[href] {
  text-decoration: none;
}

.magic-word {
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 4px;
  padding: 1px 6px;
  color: $primary-blue;
  background-color: rgba($primary-blue, 0.2);
  cursor: pointer;
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
  left: 300px;
  width: calc(100% - 300px);
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
