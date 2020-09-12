<template>
  <div class="side-nav">
    <LevelIndicator />
    <div class="stats-container">
      <div class="stat">
        <a>Gold:</a>
        <div>
          <a>{{ user.gold }}</a>
        </div>
      </div>
      <div class="stat">
        <a>Stat Points</a>
        <div>
          <a>{{ user.statPoints }}</a>
        </div>
      </div>
      <div class="stat" v-for="stat of USER_STAT" :key="stat">
        <a>{{ USER_STAT_DISPLAY_NAME_MAP[stat] }}</a>
        <div>
          <a>{{ user[stat] }}</a>
          <button @click="addStat(stat)">+</button>
        </div>
      </div>
    </div>
    <div class="status-container">
      <div class="health-indicator">
        <span
          class="health-indicator__progress-bar"
          :style="{ width: (user.health / user.HP) * 100 + '%' }"
        />
        <a class="health-indicator__text">
          {{ user.health }} / {{ user.HP }}
        </a>
      </div>
      <div class="mana-indicator">
        <span
          class="mana-indicator__progress-bar"
          :style="{ width: (user.mana / user.MP) * 100 + '%' }"
        />
        <a class="mana-indicator__text"> {{ user.mana }} / {{ user.MP }} </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  User,
  USER_STAT,
  USER_STAT_DISPLAY_NAME_MAP,
  USER_LEVELS
} from "@/User.ts";
import LevelIndicator from "@/components/LevelIndicator.vue";
import { mapState } from "vuex";

@Component({
  computed: mapState(["user"]),
  components: {
    LevelIndicator
  }
})
export default class SideNav extends Vue {
  user!: User;
  USER_STAT = USER_STAT;
  USER_STAT_DISPLAY_NAME_MAP = USER_STAT_DISPLAY_NAME_MAP;
  USER_LEVELS = USER_LEVELS;

  addStat(stat: USER_STAT) {
    if (this.user.statPoints > 0) {
      this.$store.commit("addStat", stat);
    }
  }

  restart() {
    if (confirm("Woah, you lose it all, fr?")) {
      this.$store.commit("restart");
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.side-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  padding: 20px;
  background-color: #212121;
  box-shadow: 0 0 4px 1px #00000040;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.stats-container {
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}

.stat {
  height: 50px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background-color: transparent;
    margin-left: 15px;
    border: 0;
    outline: 0;
    padding: 5px 10px;
    border-radius: 8px;
    transition: 0.1s linear all;
    background-color: $primary-blue;
    cursor: pointer;
    font-family: inherit;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }

  button:active {
    outline: 0;
  }

  button:hover {
    box-shadow: inset 0 0 4px 1px #00000080;
  }
}

.status-container {
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px;

  margin-top: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.health-indicator {
  @include progress-bar($color: $primary-red);
  margin-bottom: 20px;
}

.mana-indicator {
  @include progress-bar($color: $primary-blue);
}
</style>
