import { Avatar } from "./User";

export class Building {
  name: string;
  imagePath: string;
  effectText: string;
  desc: string;
  cost: number;
  size: number;
  additionalMaxFollowers: number;

  constructor(
    name: string,
    imagePath: string,
    effectText: string,
    desc: string,
    cost: number,
    size: number,
    additionalMaxFollowers: number
  ) {
    this.name = name;
    this.imagePath = imagePath;
    this.effectText = effectText;
    this.desc = desc;
    this.cost = cost;
    this.size = size;
    this.additionalMaxFollowers = additionalMaxFollowers;
  }

  purchaseEffect(store: any) {
    if (store.state.user.gold < this.cost) return;

    store.commit("addGold", -this.cost);
    store.commit("addMaxFollowers", this.additionalMaxFollowers);
    store.commit("addBuilding", {
      name: this.name,
      imagePath: this.imagePath,
      x: Math.round(Math.round(Math.random() * 100)),
      size: Math.round(this.size + Math.random() * this.size * 0.1)
    });
  }
}

export const TENT = new Building(
  "Tent",
  require("@/assets/images/buildings/tent.png"),
  "+2 max followers",
  "A tent for followers to camp out until they have a real home.",
  100,
  50,
  2
);

export const HUT = new Building(
  "Hut",
  require("@/assets/images/buildings/hut.png"),
  "+5 max followers",
  "A hut for followers to stay in temporarily.",
  250,
  60,
  5
);

export const TOWER = new Building(
  "Tower",
  require("@/assets/images/buildings/tower.png"),
  "+10 max followers",
  "A simple tower, suitable for any Wizard, Knight, etc...",
  500,
  90,
  10
);

export const WIZARDS_STUDY = new Building(
  "Wizard's Study",
  require("@/assets/images/buildings/wizards_study.png"),
  "+25 max followers",
  "A double tower for Wizard's to stay and study. Many follower's can sleep here contently.",
  1000,
  110,
  25
);

export const CASTLE = new Building(
  "Castle",
  require("@/assets/images/buildings/castle.png"),
  "+100 max followers",
  "An amazing castle for your followers to stay and thrive.",
  3000,
  150,
  100
);

export const MAGNIFICENT_CASTLE = new Building(
  "Magnificent Castle",
  require("@/assets/images/buildings/magnificent_castle.png"),
  "+250 max followers",
  "A magnificent castle and accompanying township for your followers.",
  5000,
  180,
  250
);

export const WIZARD_TEMPLE = new Building(
  "Wizard Temple",
  require("@/assets/images/buildings/wizard_temple.png"),
  "+500 max followers.",
  "The ultimate place for followers to stay.",
  100000,
  200,
  500
);

export const BUILDINGS = [
  TENT,
  HUT,
  TOWER,
  WIZARDS_STUDY,
  CASTLE,
  MAGNIFICENT_CASTLE,
  WIZARD_TEMPLE
];
