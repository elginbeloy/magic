<template>
  <div
    class="map"
    :style="{ 'background-image': `url('${user.map.imagePath}'` }"
  >
    <div class="overlay"></div>
    <NavBar location="Maps" />
    <div class="map-cards-container">
      <div
        class="map-card"
        v-for="(map, index) of MAPS"
        @click="selectMap(map)"
        :key="map.name"
        :style="{
          'background-image': `url('${map.imagePath}')`,
          'z-index': 100 - index
        }"
      >
        <div class="overlay"></div>
        <div class="title">{{ map.name }}</div>
      </div>
    </div>
    <div class="map-info">
      <div class="title">{{ user.map.name }}</div>
      <div class="subtitle">Monsters</div>
      <div class="monster-container">
        <div
          class="monster"
          v-for="monster of user.map.monsters"
          :key="monster.monster.name"
        >
          <img :src="monster.monster.imagePath" />
          <div>
            <a class="name">{{ monster.monster.name }}</a>
          </div>
          <div>
            <a>Probability</a>
            <a class="desc">{{ monster.probability * 100 }}%</a>
          </div>
          <div>
            <a>Reward Multiplier</a>
            <a class="desc">
              {{ Math.round((monster.monster.rewardMultiplier - 1) * 100) }}%
            </a>
          </div>
          <div>
            <a>Strength</a>
            <a class="desc">~{{ monster.monster.strength }} · &frac12; lvl</a>
          </div>
          <div>
            <a>Health</a>
            <a class="desc">~{{ monster.monster.health }} · lvl</a>
          </div>
          <div>
            <a>Speed</a>
            <a class="desc">
              {{ monster.monster.attackIntervalSeconds }}s / attack
            </a>
          </div>
        </div>
      </div>
      <div class="subtitle">Items</div>
      <div class="items-container">
        <div class="item" v-for="item of user.map.items" :key="item.item.name">
          <img :src="item.item.imagePath" />
          <div>
            <a class="name">{{ item.item.name }}</a>
          </div>
          <div>
            <a>Probability</a>
            <a class="desc">{{ item.probability * 100 }}%</a>
          </div>
          <div>
            <a>Sell Value</a>
            <a class="desc">{{ item.item.sellValue }} gold</a>
          </div>
          <div>
            {{ item.item.desc }}
          </div>
        </div>
      </div>
    </div>
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
export default class Map extends Vue {
  user!: User;
  MAPS = MAPS;

  selectMap(map: LocationMap) {
    this.$store.commit("setMap", map);
  }
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 40px;
  padding-top: 100px;

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

.map-info {
  position: relative;
  width: 100%;

  color: #fff;
  text-transform: uppercase;
  letter-spacing: 6px;

  display: flex;
  flex-direction: column;

  .title {
    font-size: 32px;
    margin-bottom: 40px;
  }

  .subtitle {
    font-size: 22px;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }
}

.monster-container,
.items-container {
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.monster,
.item {
  position: relative;
  width: 200px;
  padding: 12px;
  margin-right: 50px;
  margin-bottom: 50px;

  font-size: 11px;
  letter-spacing: normal;
  text-transform: none;
  color: #fff;
  line-height: 24px;
  background-color: #000000a0;
  box-shadow: 0 0 6px 2px #000000;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .name {
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .desc {
    letter-spacing: 1.5px;
  }

  div {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  img {
    width: 150px;
    margin-bottom: 20px;
  }
}

.item img {
  width: 100px;
  margin-top: 25px;
  margin-bottom: 45px;
}

.map-cards-container {
  position: relative;
  width: 100%;
  margin-bottom: 40px;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.map-card {
  position: relative;
  z-index: 1;
  width: 300px;
  height: 400px;
  padding: 20px;
  margin-right: -120px;
  background-size: cover;
  background-position: center;
  background-color: #00000050;
  box-shadow: 0 0 12px 3px #000000a0;
  border-radius: 8px;
  transition: 0.2s ease-out all;
  cursor: pointer;
  overflow: hidden;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    border-radius: 8px;
    background: #000000a0;
  }

  .title {
    position: relative;
    z-index: 1;
    font-size: 14px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 6px;
  }

  &:hover {
    z-index: 1000 !important;
    margin-right: 20px;
    margin-left: 20px;
    border: 1px solid $primary-blue;
    box-shadow: 0 0 16px 4px rgba($primary-blue, 0.5);
    transform: scale(1.075);
  }

  &:hover .overlay {
    background: #00000040;
  }
}
</style>
