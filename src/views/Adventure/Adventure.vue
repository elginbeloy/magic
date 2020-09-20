<template>
  <div
    class="adventure"
    :class="{ ouch: ouch }"
    :style="{ 'background-image': `url('${user.map.imagePath}'` }"
    @keydown="castSpellKey"
    @keydown.enter="confirm"
    tabindex="-1"
    id="app-content"
  >
    <div class="overlay"></div>
    <NavBar :location="user.map.name" />

    <alert-container
      v-if="user.dead"
      bannerText="You Died"
      nextButtonText="Fuck This Game!"
      :bannerIcon="false"
      :nextButtonIcon="fightImage"
      :onNext="confirm"
    ></alert-container>
    <alert-container
      v-else-if="user.levelUp"
      bannerText="Level Up"
      nextButtonText="Onward!"
      :nextButtonIcon="fightImage"
      :onNext="confirm"
      :stats="[
        {
          iconImage: fightImage,
          titleText: 'stat points',
          changeText: '+5'
        },
        {
          iconImage: shopImage,
          titleText: 'gold',
          changeText: user.lastGoldReward
        }
      ]"
    ></alert-container>
    <div class="enemy-container" v-else-if="monster">
      <a
        class="info"
        v-for="info of infos"
        :key="`info-${info.xOffset}-${info.text}`"
        :style="{
          color: info.colorHex,
          left: `calc(${info.xOffset || 0}% - 100px)`,
          top: `calc(${info.xOffset || 0}% - 25px)`
        }"
      >
        {{ info.text }}
      </a>
      <div class="stats-container">
        <a>{{ monster.name }}</a>
        <a>lvl. {{ monster.level }}</a>
      </div>
      <div class="health-indicator">
        <span
          class="health-indicator__progress-bar"
          :style="{ width: (monster.health / monster.maxHealth) * 100 + '%' }"
        />
        <a class="health-indicator__text">
          {{ monster.health }} / {{ monster.maxHealth }}
        </a>
      </div>
      <img :src="monster.imagePath" class="enemy" />
    </div>
    <alert-container
      v-else
      bannerText="Victory"
      nextButtonText="Onward!"
      :nextButtonIcon="fightImage"
      :onNext="confirm"
      :stats="[
        {
          iconImage: shopImage,
          titleText: 'gold',
          changeText: user.lastGoldReward
        },
        {
          iconImage: expImage,
          titleText: 'exp',
          changeText: user.lastExpReward
        }
      ]"
      :items="
        user.lastRewardItems.map(item => {
          return { iconImage: item.imagePath, titleText: item.name };
        })
      "
    ></alert-container>

    <div class="spells-container">
      <div
        class="spell"
        v-for="(spell, index) in Object.keys(user.equippedSpells)"
        :key="user.equippedSpells[spell].name"
        @click="castSpell(user.equippedSpells[spell])"
        :class="{
          disabled: user.reloadingSpells.includes(
            user.equippedSpells[spell].key
          )
        }"
      >
        <img :src="user.equippedSpells[spell].imagePath" />
        <div class="spell__key">{{ index + 1 }}</div>
        <div class="spell__mana">
          -{{ user.equippedSpells[spell].manaCost }} MP
        </div>
      </div>
      <div
        class="spell"
        v-for="(elm, index) in new Array(
          user.maxSpells - Object.keys(user.equippedSpells).length
        )"
        :key="`disabled-spell-${index}`"
        :class="{
          disabled: true
        }"
      >
        <img src="../../assets/images/lock.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "@/User";
import { Spell, InfoPopup } from "@/Spell";
import { Monster, getNextMonster } from "@/Monster.ts";
import LevelIndicator from "@/components/LevelIndicator.vue";
import NavBar from "@/components/NavBar.vue";
import AlertContainer from "./components/AlertContainer.vue";
import { mapState } from "vuex";

@Component({
  computed: mapState(["user", "monster"]),
  components: {
    LevelIndicator,
    NavBar,
    AlertContainer
  }
})
export default class Adventure extends Vue {
  user!: User;
  monster!: Monster | null;
  infos: InfoPopup[] = [];
  ouch = false;
  attackInterval: number | undefined = undefined;
  fightImage: string = require("@/assets/images/fight.png");
  shopImage: string = require("@/assets/images/shop.png");
  expImage: string = require("@/assets/images/exp.png");

  mounted() {
    this.getMonster();
  }

  confirm() {
    if (this.user.dead) {
      this.$store.commit("confirmDeath");
    } else if (this.user.levelUp) {
      this.$store.commit("confirmLevelUp");
    }

    this.getMonster();
  }

  castSpellKey(event: KeyboardEvent) {
    const keyArray = Object.keys(this.user.equippedSpells);
    const key = parseInt(event.key);
    if (!isNaN(key) && keyArray.length >= key) {
      this.castSpell(this.user.equippedSpells[keyArray[key - 1]]);
    }
  }

  getMonster() {
    if (this.monster === null) {
      const monster = getNextMonster(
        Math.round(Math.random() * (this.user.level - 1)) + 1,
        this.$store,
        this.user.map,
        this.addInfoPopups,
        this.addOuch
      );

      // Reset all spells to unloaded.
      this.$store.commit("setMonster", monster);
      for (const spellKey of Object.keys(this.user.equippedSpells)) {
        this.$store.commit("addReloadingSpell", spellKey);
        this.$store.commit(
          "addReloadRemovalTimeout",
          setTimeout(() => {
            this.$store.commit("removeReloadingSpell", spellKey);
          }, this.user.equippedSpells[spellKey].reloadTimeSeconds * 1000)
        );
      }
    }
  }

  castSpell(spell: Spell) {
    if (this.user.mana < spell.manaCost) {
      this.addInfoPopups([{ text: "Not Enough Mana!", colorHex: "blue" }]);
      return;
    }

    if (
      this.monster !== null &&
      !this.user.reloadingSpells.includes(spell.key)
    ) {
      spell.cast(
        { ...this.user },
        { ...this.monster },
        this.$store,
        this.addInfoPopups
      );

      if (this.monster) {
        this.$store.commit("addReloadingSpell", spell.key);
        this.$store.commit(
          "addReloadRemovalTimeout",
          setTimeout(() => {
            this.$store.commit("removeReloadingSpell", spell.key);
          }, spell.reloadTimeSeconds * 1000)
        );
      }
    }
  }

  addOuch() {
    this.ouch = true;
    setTimeout(() => {
      this.ouch = false;
    }, 800);
  }

  addInfoPopups(popups: InfoPopup[]) {
    // Assign random x offset.
    const xOffset = Math.round(Math.random() * 100);
    const yOffset = Math.round(Math.random() * 100);

    for (let index = 0; index < popups.length; index++) {
      setTimeout(() => {
        this.infos.push({
          ...popups[index],
          xOffset: popups[index].xOffset || xOffset,
          yOffset: popups[index].yOffset || yOffset
        });

        setTimeout(() => {
          this.infos.shift();
        }, 1800);
      }, 1 + 400 * index);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles.scss";

.adventure {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;

  background-size: cover;
  outline: 0 !important;

  display: flex;
  justify-content: center;
  align-items: center;
}

.ouch {
  box-shadow: inset 0 0 18px 6px $primary-red;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    #00000000 0%,
    #00000040 50%,
    #00000080 70%,
    #000000 100%
  );
}

.enemy-container {
  position: relative;
  width: 500px;
  height: 500px;
  overflow: visible;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.enemy {
  position: relative;
  width: 250px;
  height: 250px;
  padding: 10px;
  margin: 20px;
  transition: 0.1s linear all;
  cursor: pointer;
  filter: drop-shadow(0px 0px 12px $primary-blue);
}

.stats-container {
  position: relative;
  width: 100%;
  padding: 20px 10px;
  color: #fff;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 200px;
  height: 50px;

  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: infoPopup 2s ease-in-out;
}

@keyframes infoPopup {
  0% {
    font-size: 12px;
    opacity: 1;
  }
  100% {
    font-size: 32px;
    opacity: 0;
    transform: translateY(-96px);
  }
}

.health-indicator {
  @include progress-bar($color: $primary-red);
}

.spells-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  padding: 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.spell {
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 10px;
  margin-left: 10px;
  width: 80px;
  height: 80px;
  padding: 10px;

  border: 1px solid $primary-blue;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s linear all;

  &__key {
    position: absolute;
    top: -25px;
    left: 5px;
    font-size: 14px;
    color: #fff;
  }

  &__mana {
    position: absolute;
    top: -25px;
    right: 5px;
    font-size: 14px;
    color: $primary-blue;
  }

  &:hover {
    box-shadow: 0 0 12px 4px $primary-blue;
    transform: scale(1.05);
  }

  img {
    position: relative;
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
    transition: 0.3s linear all;
  }

  &:hover img {
    filter: none;
  }
}

.disabled {
  opacity: 0.75;
  border: 1px solid #212121;
  pointer-events: none;
  box-shadow: 0;

  &:hover {
    box-shadow: 0;
  }
}
</style>
