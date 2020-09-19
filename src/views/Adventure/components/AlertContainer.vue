<template>
  <div class="alert-container">
    <div class="banner-background" v-if="bannerIcon">
      <img src="../../../assets/images/banner.png" />
    </div>
    <a class="banner">{{ bannerText }}</a>
    <div
      class="stat"
      v-for="stat of stats"
      :key="`stat-${stat.titleText}-${stat.changeText}`"
    >
      <img :src="stat.iconImage" />
      <a>{{ stat.titleText }}</a>
      <a>{{ stat.changeText }}</a>
    </div>
    <div class="items-container" v-if="items.length > 0">
      <div
        class="item"
        v-for="(item, index) of items"
        :key="`item-${item.titleText}-${index}`"
      >
        <img :src="item.iconImage" />
        <a class="item__title">{{ item.titleText }}</a>
      </div>
    </div>
    <div class="next" @click="onNext()">
      <img :src="nextButtonIcon" /> {{ nextButtonText }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class AlertContainer extends Vue {
  @Prop({ default: "" })
  bannerText!: string;

  @Prop({ default: true })
  bannerIcon!: boolean;

  @Prop({ default: [] })
  stats!: { iconImage: string; titleText: string; changeText: string }[];

  @Prop({ default: [] })
  items!: { iconImage: string; titleText: string }[];

  @Prop({ default: "" })
  nextButtonIcon!: string;

  @Prop({ default: "" })
  nextButtonText!: string;

  @Prop({ default: "" })
  onNext!: () => void;
}
</script>

<style scoped lang="scss">
@import "../../../styles.scss";

.alert-container {
  position: relative;
  width: 500px;
  color: #fff;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.banner-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  overflow: visible;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    position: relative;
    width: 80%;
    height: auto;
    opacity: 0.5;
    filter: drop-shadow(0 0 16px $primary-blue);
  }
}

.banner {
  position: relative;
  width: 100%;
  height: 80px;

  font-size: 44px;
  letter-spacing: 16px;
  text-align: center;
  filter: drop-shadow(0 0 8px #000000);
}

.stat {
  position: relative;
  min-width: 75%;
  height: 80px;

  font-size: 24px;
  letter-spacing: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 40px;
    height: 40px;
  }
}

.items-container {
  position: relative;
  max-width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  height: auto;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.item {
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;
  width: 80px;
  height: 80px;
  padding: 10px;
  margin-right: 40px;
  margin-left: 40px;
  margin-bottom: 60px;

  border: 1px solid $primary-blue;
  box-shadow: 0 0 12px 4px $primary-blue;
  background: #212121a0;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
  }

  &__title {
    position: absolute;
    bottom: -60px;
    left: -50%;
    width: 200%;
    height: 40px;

    color: #fff;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
  }
}

.next {
  position: relative;
  margin-top: 20px;

  font-size: 28px;
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
</style>
