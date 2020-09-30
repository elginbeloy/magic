<template>
  <div class="side-nav">
    <LevelIndicator />

    <div class="tasks-container">
      <router-link to="tasks">
        <div class="tasks-button">
          <img src="../assets/images/task_book.png" /> Task List
          <img src="../assets/images/task_book.png" />
        </div>
      </router-link>
    </div>

    <div class="stats-container">
      <div class="stat">
        <div class="stat__title">
          <img class="stat__icon" src="../assets/images/shop.png" />
          Gold
        </div>
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
      <div class="stat" v-for="stat of stats" :key="stat.stat">
        <div class="stat__title">
          <img class="stat__icon" :src="stat.imagePath" />
          {{ stat.name }}
        </div>
        <div>
          <a> {{ user[stat.stat] }} </a>
          <button @click="addStat(stat.stat)" v-if="user.statPoints > 0">
            +<sup v-if="stat.stat == 'HP'">5</sup>
          </button>
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
  stats = [
    {
      stat: USER_STAT.HP,
      name: USER_STAT_DISPLAY_NAME_MAP.HP,
      imagePath: require("@/assets/images/stats/hp.png")
    },
    {
      stat: USER_STAT.MP,
      name: USER_STAT_DISPLAY_NAME_MAP.MP,
      imagePath: require("@/assets/images/stats/mp.png")
    },
    {
      stat: USER_STAT.MAGIC_IQ,
      name: USER_STAT_DISPLAY_NAME_MAP.magicIQ,
      imagePath: require("@/assets/images/stats/magic_iq.png")
    },
    {
      stat: USER_STAT.MAGIC_STRENGTH,
      name: USER_STAT_DISPLAY_NAME_MAP.magicStrength,
      imagePath: require("@/assets/images/stats/magic_strength.png")
    },
    {
      stat: USER_STAT.MAGIC_PRECISION,
      name: USER_STAT_DISPLAY_NAME_MAP.magicPrecision,
      imagePath: require("@/assets/images/stats/magic_precision.png")
    },
    {
      stat: USER_STAT.LUCK,
      name: USER_STAT_DISPLAY_NAME_MAP.luck,
      imagePath: require("@/assets/images/stats/luck.png")
    }
  ];

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
  z-index: 1000;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  padding: 20px;
  background-color: #28222a;
  box-shadow: 0 0 24px 8px #28222a;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.stats-container {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.stat {
  height: 55px;
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

  sup {
    font-size: 10px;
    margin-left: 5px;
  }

  button:active {
    outline: 0;
  }

  button:hover {
    box-shadow: inset 0 0 4px 1px #00000080;
  }

  &__title {
    position: relative;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 4px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__icon {
    position: relative;
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
}

.tasks-container {
  position: relative;
  width: 100%;
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    width: 100%;
  }

  .tasks-button {
    width: 100%;
    font-size: 18px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 6px;
    color: #fff;
    transition: 0.1s linear all;

    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
    }
  }

  &:hover .tasks-button {
    letter-spacing: 8px;
    color: $primary-blue;
  }
}

.status-container {
  position: relative;
  width: 100%;
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
