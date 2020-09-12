<template>
  <div class="level-indicator">
    <div class="level"><span>lvl</span> {{ user.level }}</div>
    <div class="level-progress">
      <div
        class="level-progress__progress-bar"
        :style="{ width: (user.exp / USER_LEVELS[user.level - 1]) * 100 + '%' }"
      ></div>
      <a class="level-progress__text">
        {{ user.exp }} / {{ USER_LEVELS[user.level - 1] }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User, USER_LEVELS } from "@/User.ts";
import { mapState } from "vuex";

@Component({
  computed: mapState(["user"])
})
export default class LevelIndicator extends Vue {
  user!: User;
  USER_LEVELS = USER_LEVELS;
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.level-indicator {
  position: relative;
  width: 100%;
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.level {
  font-size: 52px;
  color: $primary-blue;
  text-shadow: 0 0 3px rgba($primary-blue, 0.75);
  letter-spacing: 1px;

  span {
    color: #fff;
    font-size: 12px;
  }
}

.level-progress {
  @include progress-bar();
}
</style>
