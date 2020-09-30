<template>
  <div class="land">
    <div class="overlay"></div>
    <NavBar location="Your Land" />
    <ShopContainer :tabIcons="tabs" :items="items" />
    <div class="amount-stats">
      <a>
        {{ user.followers.length }} /
        {{ user.maxFollowers }}
        <img src="../assets/images/followers/knight.png" />
      </a>
    </div>
    <div class="location-container">
      <img
        class="building"
        :src="building.imagePath"
        v-for="(building, index) of user.buildings"
        :key="building.name + building.x"
        :style="{
          left: `${building.x}%`,
          bottom: `${20 - index / 3}px`,
          width: `${building.size}px`,
          height: `${building.size}px`
        }"
      />
      <img
        class="follower"
        :src="follower.imagePath"
        v-for="(follower, index) of user.followers"
        :key="follower.name + follower.x"
        :style="{
          left: `${follower.x}%`,
          bottom: `${20 - index / 3}px`,
          width: `${follower.size}px`,
          height: `${follower.size}px`
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import ShopContainer from "@/components/ShopContainer.vue";
import { mapState } from "vuex";
import { User } from "@/User";
import { FOLLOWERS } from "@/Follower";
import { BUILDINGS } from "@/Building";

@Component({
  computed: mapState(["user"]),
  components: {
    NavBar,
    ShopContainer
  }
})
export default class Land extends Vue {
  user!: User;
  tabs: string[] = [
    require("@/assets/images/buildings/tent.png"),
    require("@/assets/images/followers/knight.png")
  ];
  items = [BUILDINGS, FOLLOWERS];
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.land {
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

.amount-stats {
  position: absolute;
  top: 200px;
  right: 40px;

  display: flex;
  flex-direction: column;
  font-size: 32px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;

  a {
    margin-bottom: 10px;
  }

  img {
    width: 32px;
    height: 32px;
    margin-left: 20px;
  }
}

.location-container {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 200px;
  overflow: hidden;

  .building,
  .follower {
    position: absolute;
    bottom: 0;
    width: 40px;
    height: 40px;
  }
}
</style>
