<template>
  <div class="shop-container">
    <div class="tab-icons">
      <div
        class="tab-icons__icon"
        :class="{ 'tab-icons__icon--selected': icon === selectedTabIcon }"
        @click="selectedTabIcon = icon"
        v-for="icon of tabIcons"
        :key="icon"
      >
        <img :src="icon" />
      </div>
    </div>
    <div class="items-container">
      <div
        class="item"
        v-for="item of tabItems"
        :key="item.name"
        @click="buyItem(item)"
      >
        <img :src="item.imagePath" />
        <div class="item__info-container">
          <a class="item__title">{{ item.name }}</a>
          <a class="item__effect">
            <span style="color: gold">{{ item.cost }}</span> ·
            {{ item.effectText }}
          </a>
          <a class="item__desc">{{ item.desc }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { User } from "@/User";

@Component({
  computed: mapState(["user"])
})
export default class ShopContainer extends Vue {
  user!: User;

  @Prop({ default: [] })
  tabIcons!: string[];

  @Prop({ default: [] })
  items!: {
    name: string;
    imagePath: string;
    effectText: string;
    cost: string | number;
    desc: string;
  }[][];

  selectedTabIcon: string = this.tabIcons[0];
  get tabItems() {
    return this.items[this.tabIcons.indexOf(this.selectedTabIcon)];
  }

  buyItem(item: any) {
    item.effect(this.$store);
  }
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.shop-container {
  position: absolute;
  top: 200px;
  left: 20px;
  width: 400px;
  height: 600px;
  overflow: hidden;
  border-radius: 8px;
  background: #00000080;
  display: flex;
  flex-direction: column;
}

.tab-icons {
  position: relative;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #212121;

  display: flex;
  flex-direction: row;

  &__icon {
    position: relative;
    height: 100%;
    flex-grow: 1;
    border-right: 1px solid #212121;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      position: relative;
      width: 40px;
      height: 40px;
      filter: grayscale(100%);
      transition: 0.2s linear all;
    }

    &--selected img,
    &:hover img {
      filter: none;
      transform: scale(1.1);
    }
  }

  &__icon:last-child {
    border-right: 0;
  }
}

.items-container {
  position: relative;
  width: 100%;
  height: calc(100% - 80px);
  overflow: auto;
}

.item {
  position: relative;
  width: 100%;
  height: 80px;
  padding: 10px;
  border-bottom: 1px solid #212121;
  overflow: hidden;
  cursor: pointer;

  color: #bbb;
  transition: 0.2s linear all;

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    color: #fff;
  }

  img {
    position: relative;
    width: 60px;
    height: 100%;
    opacity: 0.8;
    filter: grayscale(100%);
    transition: 0.2s linear all;
  }

  &:hover img {
    filter: none;
    opacity: 1;
  }

  &__info-container {
    position: relative;
    width: calc(100% - 100px);
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    opacity: 0.8;
  }

  &__info-container:hover {
    opacity: 1;
  }

  &__title {
    font-size: 18px;
  }

  &__effect {
    font-size: 10px;
    color: $primary-blue;
    margin-bottom: 5px;
  }

  &__desc {
    font-size: 12px;
  }
}
</style>
