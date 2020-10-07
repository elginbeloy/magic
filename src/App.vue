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
@import url("https://fonts.googleapis.com/css?family=Montserrat:200,400,500,600,700&display=swap");
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

.ace_editor {
  border-radius: 4px !important;
  box-shadow: 0 0 8px $primary-blue !important;
  background-color: #1c1930 !important;
  color: #e3e3e3 !important;
  font-size: 14px !important;
  text-transform: none !important;
  line-height: 26px !important;

  &::selection {
    background: #ffffffa0 !important;
  }

  .ace_gutter {
    background-color: $primary-blue !important;
    color: #fff !important;
    width: 60px !important;
  }

  .ace_print-margin {
    width: 1px;
    background: #000;
  }

  .ace_fold {
    background-color: $primary-blue;
  }

  .ace_cursor {
    color: #fff;
  }

  .ace_invisible {
    color: rgb(191, 191, 191);
  }

  .ace_storage,
  .ace_keyword {
    color: #1bc5bc;
  }

  .ace_constant {
    color: rgb(197, 6, 11);
  }

  .ace_constant.ace_buildin {
    color: #1bc5bc;
  }

  .ace_constant.ace_language {
    color: #1bc5bc;
  }

  .ace_constant.ace_library {
    color: rgb(6, 150, 14);
  }

  .ace_invalid {
    background-color: rgba(255, 0, 0, 0.1);
    color: red;
  }

  .ace_support.ace_function {
    color: rgb(60, 76, 114);
  }

  .ace_support.ace_constant {
    color: rgb(6, 150, 14);
  }

  .ace_support.ace_type,
  .ace_support.ace_class {
    color: rgb(109, 121, 222);
  }

  .ace_keyword.ace_operator {
    color: rgb(104, 118, 135);
  }

  .ace_string {
    color: #058e69;
  }

  .ace_comment {
    color: #ffffffa0;
  }

  .ace_comment.ace_doc {
    color: rgb(0, 102, 255);
  }

  .ace_comment.ace_doc.ace_tag {
    color: rgb(128, 159, 191);
  }

  .ace_constant.ace_numeric {
    color: $primary-blue;
  }

  .ace_variable {
    color: $primary-blue;
  }

  .ace_xml-pe {
    color: rgb(104, 104, 91);
  }

  .ace_entity.ace_name.ace_function {
    color: $primary-blue;
  }

  .ace_heading {
    color: rgb(12, 7, 255);
  }

  .ace_list {
    color: rgb(185, 6, 144);
  }

  .ace_meta.ace_tag {
    color: rgb(0, 22, 142);
  }

  .ace_string.ace_regex {
    color: rgb(255, 0, 0);
  }

  .ace_marker-layer .ace_selection {
    background: rgba($primary-blue, 0.2);
  }

  .ace-tm.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px 0px white;
  }

  .ace_marker-layer .ace_step {
    background: rgb(252, 255, 0);
  }

  .ace_marker-layer .ace_stack {
    background: rgb(164, 229, 101);
  }

  .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid rgb(192, 192, 192);
  }

  .ace_marker-layer .ace_active-line {
    background: rgba($primary-blue, 0.1);
    color: #ffffff;
  }

  .ace_gutter-active-line {
    background-color: #ffffff10;
  }

  .ace_marker-layer .ace_selected-word {
    background: rgba($primary-blue, 0.2);
    border: 0;
  }

  .ace_indent-guide {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==")
      right repeat-y;
  }
}
</style>
