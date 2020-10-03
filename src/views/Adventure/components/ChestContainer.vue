<template>
  <div class="chest-container">
    <a class="banner">{{ chest.name }}</a>
    <img class="chest" :src="chest.imagePath" v-if="!picking" />
    <iframe
      v-else
      class="chest-iframe"
      src="https://www.youtube.com/embed/UB1O30fR-EE"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div class="picking-progress" v-if="picking">
      <div
        class="picking-progress__progress-bar"
        :style="{
          width: (pickingProgressSeconds / chest.timeLengthSeconds) * 100 + '%'
        }"
      ></div>
      <a class="picking-progress__text">
        {{ pickingProgressSeconds }} / {{ chest.timeLengthSeconds }}
      </a>
    </div>
    <div class="pick-button" @click="startPicking" v-if="!picking">
      <img src="../../../assets/images/fight.png" /> Pick Lock
    </div>
  </div>
</template>

<script lang="ts">
import { Chest } from "@/Chest";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: mapState(["user", "chest"])
})
export default class AlertContainer extends Vue {
  chest!: Chest;
  picking = false;
  pickingProgressSeconds = 0;

  startPicking() {
    this.picking = true;
    const updateInterval = setInterval(() => {
      console.log(this.pickingProgressSeconds);
      this.pickingProgressSeconds += 1;
      if (this.pickingProgressSeconds >= this.chest.timeLengthSeconds) {
        this.$store.commit("pickChest");
        clearInterval(updateInterval);
      }
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
@import "../../../styles.scss";

.chest-container {
  position: relative;
  width: 500px;
  color: #fff;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.banner {
  position: relative;
  width: 100%;
  height: 80px;

  font-size: 28px;
  line-height: 72px;
  letter-spacing: 8px;
  text-align: center;
  filter: drop-shadow(0 0 8px #000000);
}

.chest {
  position: relative;
  width: 300px;
  filter: drop-shadow(0 0 16px $primary-blue);
}

.chest-iframe {
  position: relative;
  width: 500px;
  height: 300px;
}

.pick-button {
  position: relative;
  margin-top: 20px;

  font-size: 24px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 6px;
  transition: 0.2s linear all;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    position: relative;
    width: 32px;
    height: 32px;
    margin-right: 32px;
  }

  &:hover {
    filter: drop-shadow(0px 0px 8px $primary-blue);
  }
}

.picking-progress {
  @include progress-bar();
}
</style>
