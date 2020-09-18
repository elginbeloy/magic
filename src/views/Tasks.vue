<template>
  <div class="tasks">
    <div class="overlay"></div>
    <NavBar location="Task List" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import { mapState } from "vuex";
import { MAPS, LocationMap } from "@/LocationMap.ts";
import { User } from "@/User";

@Component({
  computed: mapState(["user"]),
  components: {
    NavBar
  }
})
export default class Tasks extends Vue {
  user!: User;
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.tasks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 40px;
  padding-top: 100px;

  background: url("../assets/images/land_background.png");
  background-size: cover;
  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #00000080, #00000000);
}
</style>
