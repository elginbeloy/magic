<template>
  <div class="home">
    <SideNav />
    <div class="page-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideNav from "@/components/SideNav.vue";

export default {
  name: "Home",
  components: {
    SideNav
  }
};
</script>
