<template>
  <div class="shop">
    <div class="overlay"></div>
    <NavBar location="Shop" />
    <div class="spells-container">
      <div class="equipped-container">
        <a class="equipped-container__title">Equipped Spells</a>
        <div
          class="spell spell--equipped"
          v-for="spell of Object.keys(user.equippedSpells)"
          :key="spell"
          @click="select(user.equippedSpells[spell])"
        >
          <img :src="user.equippedSpells[spell].imagePath" />
        </div>
      </div>
      <div
        class="spell"
        v-for="spell in Object.keys(SPELLS).filter(
          spell => !Object.keys(user.equippedSpells).includes(spell)
        )"
        :key="spell"
        @click="select(SPELLS[spell])"
        :class="{
          'spell--active': selected && spell === selected.key,
          'spell--purchased': !!user.spells[spell],
          'spell--equipped': !!user.equippedSpells[spell]
        }"
      >
        <img :src="SPELLS[spell].imagePath" />
      </div>
    </div>
    <div class="items-container">
      <div class="equipped-container">
        <a class="equipped-container__title">Equipped Items</a>
        <div
          class="item item--equipped"
          v-for="item of user.equippedItems"
          :key="item.key"
          @click="select(item)"
        >
          <img :src="item.imagePath" />
        </div>
      </div>
      <div
        class="item"
        v-for="item of user.items.filter(item => !user.equippedItems[item.key])"
        :key="item.key"
        @click="select(item)"
      >
        <img :src="item.imagePath" />
      </div>
    </div>
    <div class="information-container">
      <img :src="selected.imagePath" unselectable="on" />
      <a class="information-container__title">{{ selected.name }}</a>
      <a v-html="selected.desc"></a>
      <a v-if="selectedIsSpell">
        Regen Time: {{ selected.reloadTimeSeconds }}s
      </a>
      <a v-if="selectedIsSpell"> Mana Cost: {{ selected.manaCost }} </a>
      <div
        class="buy-button"
        v-if="selectedIsSpell && !userHasSpell()"
        @click="buySpell"
      >
        {{ selected.cost }} <img src="../assets/images/shop.png" />
      </div>
      <div class="buy-button" v-else @click="equip">
        {{
          !!user.equippedSpells[selected.key] ||
          !!user.equippedItems[selected.key]
            ? "Unequip"
            : "Equip"
        }}
        <img src="../assets/images/fight.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "@/User";
import { SPELLS, Spell } from "@/Spell";
import LevelIndicator from "@/components/LevelIndicator.vue";
import NavBar from "@/components/NavBar.vue";
import { mapState } from "vuex";
import { Item } from "@/Item";

@Component({
  computed: mapState(["user"]),
  components: {
    LevelIndicator,
    NavBar
  }
})
export default class Shop extends Vue {
  user!: User;
  SPELLS = SPELLS;
  selected: Spell | Item = SPELLS["healthRegain"];

  select(selected: Spell | Item) {
    this.selected = selected;
  }

  get selectedIsSpell(): boolean {
    return this.selected instanceof Spell;
  }

  userHasSpell(key: string): boolean {
    return SPELLS[key] && !!this.user.spells[key];
  }

  buySpell() {
    if (this.selected && this.selectedIsSpell) {
      this.$store.dispatch("buySpell", this.selected);
    }
  }

  equip() {
    if (this.selected && this.selectedIsSpell) {
      if (this.user.equippedSpells[this.selected.key]) {
        this.$store.commit("unequipSpellByKey", this.selected.key);
      } else {
        this.$store.commit("equipSpellByKey", this.selected.key);
      }
    } else if (this.selected) {
      if (this.user.equippedItems[this.selected.key]) {
        this.$store.commit("unequipItemByKey", this.selected.key);
      } else {
        this.$store.commit("equipItemByKey", this.selected.key);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.shop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-top: 120px;

  background-size: cover;
  background-image: url("../assets/images/shop_background.jpg");

  overflow: auto;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, #00000000 0%, #000000 100%);
}

.spells-container,
.items-container {
  position: relative;
  width: 700px;
  margin-right: 80px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}

.equipped-container {
  position: relative;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;

  box-shadow: 0 0 16px 4px #000000d0;
  border-radius: 8px;
  background: #121212d0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  &__title {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 14px;
    color: #fff;
  }
}

.spell,
.item {
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;
  width: 80px;
  height: 80px;
  padding: 10px;
  margin: 10px;

  border: 1px solid #212121;
  background: #212121a0;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s linear all;

  display: flex;
  justify-content: center;
  align-items: center;

  &--equipped,
  &--active,
  &:hover {
    border: 1px solid $primary-blue;
  }

  &--equipped,
  &--active,
  &:hover {
    box-shadow: 0 0 18px 4px rgba($primary-blue, 0.75);
  }

  &--active,
  &:hover {
    transform: scale(1.025);
  }

  img {
    position: relative;
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
    transition: 0.3s linear all;
  }

  &--equipped img,
  &--purchased img,
  &--active img,
  &:hover img {
    filter: none;
  }
}

.information-container {
  position: relative;
  place-self: flex-end;
  margin-top: auto;
  margin-right: auto;
  width: 680px;
  height: 240px;
  padding: 20px;
  margin: 10px;

  border-radius: 4px;
  box-shadow: 0 0 16px 4px #000000d0;
  border-radius: 8px;
  background: #121212d0;
  background: linear-gradient(to left, #121212a0, #121212e0);

  font-size: 16px;
  color: #fff;
  line-height: 32px;

  display: flex;
  flex-direction: column;

  &__title {
    font-size: 22px;
  }

  img {
    position: absolute;
    z-index: 0;
    user-select: none;
    pointer-events: none;
    top: 5%;
    right: 20px;
    height: 90%;
    opacity: 0.1;
  }
}

.buy-button {
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 10px;

  font-size: 20px;
  letter-spacing: 6px;
  color: #fff;
  text-transform: uppercase;
  filter: drop-shadow(0 0 4px gold);
  cursor: pointer;
  transition: 0.2s ease-out all;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    position: relative;
    height: 24px;
    margin-left: 20px;
    opacity: 1;
  }

  &:hover {
    filter: drop-shadow(0 0 4px $primary-blue);
    transform: scale(1.1);
  }
}
</style>
