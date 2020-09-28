<template>
  <div class="land">
    <div class="overlay"></div>
    <NavBar location="Your Land" />
    <ShopContainer :tabIcons="tabs" :items="items" />
    <div class="amount-stats">
      <a>
        {{ user.knights.length }} / {{ user.maxKnights }}
        <img src="../assets/images/followers/knight.png" />
      </a>
      <a>
        {{ user.wizards.length }} / {{ user.maxWizards }}
        <img src="../assets/images/followers/wizard.png" />
      </a>
    </div>
    <div class="location-container">
      <img
        class="building"
        :src="building.image"
        v-for="(building, index) of user.buildings"
        :key="building.building + building.x"
        :style="{
          left: `${building.x}%`,
          bottom: `${20 - index / 3}px`,
          width: `${building.size}px`,
          height: `${building.size}px`
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
import { MAPS, LocationMap } from "@/LocationMap.ts";
import { User } from "@/User";

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
  items = [
    [
      {
        name: "Tent",
        image: require("@/assets/images/buildings/tent.png"),
        effectText: "+3 max knights.",
        desc: "A tent for knights to sleep unhappily.",
        cost: "$250",
        effect: (store: any) => {
          store.commit("addGold", -250);
          store.commit("addMaxKnights", 3);
          store.commit("addBuilding", {
            building: "tent",
            image: require("@/assets/images/buildings/tent.png"),
            x: Math.round(Math.random() * 100),
            size: 50
          });
        }
      },
      {
        name: "Hut",
        image: require("@/assets/images/buildings/hut.png"),
        effectText: "+15 max knights.",
        desc: "A hut for Knights to sleep content.",
        cost: "$1000",
        effect: (store: any) => {
          store.commit("addGold", -1000);
          store.commit("addMaxKnights", 15);
          store.commit("addBuilding", {
            building: "hut",
            image: require("@/assets/images/buildings/hut.png"),
            x: Math.round(Math.random() * 100),
            size: 65
          });
        }
      },
      {
        name: "Tower",
        image: require("@/assets/images/buildings/tower.png"),
        effectText: "+1 max wizards.",
        desc: "A simple tower, suitable for any Wizard.",
        cost: "$500",
        effect: (store: any) => {
          store.commit("addGold", -500);
          store.commit("addMaxWizards", 1);
          store.commit("addBuilding", {
            building: "tower",
            image: require("@/assets/images/buildings/tower.png"),
            x: Math.round(Math.random() * 100),
            size: 85
          });
        }
      },
      {
        name: "Wizard's Study",
        image: require("@/assets/images/buildings/wizards_study.png"),
        effectText: "+5 max wizards.",
        desc: "A double tower for Wizard's to stay and study.",
        cost: "$2000",
        effect: (store: any) => {
          store.commit("addGold", -2000);
          store.commit("addMaxWizards", 5);
          store.commit("addBuilding", {
            building: "wizards_study",
            image: require("@/assets/images/buildings/wizards_study.png"),
            x: Math.round(Math.random() * 100),
            size: 90
          });
        }
      },
      {
        name: "Castle",
        image: require("@/assets/images/buildings/castle.png"),
        effectText: "+10 max wizards, +25 max knights.",
        desc: "A simple castle.",
        cost: "$5000",
        effect: (store: any) => {
          store.commit("addGold", -5000);
          store.commit("addMaxKnights", 25);
          store.commit("addMaxWizards", 10);
          store.commit("addBuilding", {
            building: "castle",
            image: require("@/assets/images/buildings/castle.png"),
            x: Math.round(Math.random() * 100),
            size: 100
          });
        }
      },
      {
        name: "Magnificent Castle",
        image: require("@/assets/images/buildings/magnificent_castle.png"),
        effectText: "+50 max wizards, +250 max knights.",
        desc: "A magnificent castle and accompanying township.",
        cost: "$25000",
        effect: (store: any) => {
          store.commit("addGold", -25000);
          store.commit("addMaxKnights", 250);
          store.commit("addMaxWizards", 50);
          store.commit("addBuilding", {
            building: "magnificent_castle",
            image: require("@/assets/images/buildings/magnificent_castle.png"),
            x: Math.round(Math.random() * 100),
            size: 110
          });
        }
      },
      {
        name: "Wizard Temple",
        image: require("@/assets/images/buildings/wizard_temple.png"),
        effectText: "+500 max wizards, +50 magicIQ.",
        desc: "A powerful place where true Wizards reside.",
        cost: "$100000",
        effect: (store: any) => {
          store.commit("addGold", -50000);
          store.commit("addMaxWizards", 250);
          store.commit("addBuilding", {
            building: "wizard_temple",
            image: require("@/assets/images/buildings/wizard_temple.png"),
            x: Math.round(Math.random() * 100),
            size: 150
          });
        }
      }
    ],
    [
      {
        name: "Knight",
        image: require("@/assets/images/followers/knight.png"),
        effectText: "+1 Knight | +1 magicIQ.",
        desc: "A loyal knight follower",
        cost: "Soul Stone",
        effect: (store: any) => {
          store.commit("addMaxWizards", 5);
        }
      },
      {
        name: "Wizard",
        image: require("@/assets/images/followers/wizard.png"),
        effectText: "+1 Wizard | +1 magicStrength.",
        desc: "A loyal Wizard to follow and empower you.",
        cost: "Magic Stone",
        effect: (store: any) => {
          store.commit("addMaxWizards", 5);
        }
      }
    ]
  ];
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

  img {
    position: absolute;
    bottom: 0;
    width: 40px;
    height: 40px;
  }

  .building {
    width: 75px;
    height: 75px;
  }
}
</style>
