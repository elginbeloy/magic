<template>
  <div class="side-nav"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SideNav extends Vue {}
</script>

<style scoped lang="scss">
.side-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  background-color: #212121;
  box-shadow: 0 0 4px 1px #00000040;
}
</style>
