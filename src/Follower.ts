import { Avatar, USER_STAT } from "./User";
import { Item } from "./Item";

export class Follower {
  name: string;
  imagePath: string;
  effectText: string;
  desc: string;
  cost: string;
  costItemKey: string;
  effects: { statName: USER_STAT; amount: number }[];

  constructor(
    name: string,
    imagePath: string,
    effectText: string,
    desc: string,
    cost: string,
    costItemKey: string,
    effects: { statName: USER_STAT; amount: number }[]
  ) {
    this.name = name;
    this.imagePath = imagePath;
    this.effectText = effectText;
    this.desc = desc;
    this.cost = cost;
    this.costItemKey = costItemKey;
    this.effects = effects;
  }

  purchaseEffect(store: any) {
    const availableItems = store.state.user.items.filter(
      (item: Item) => item.key === this.costItemKey
    ).length;

    if (
      availableItems > 0 &&
      store.state.user.followers.length < store.state.user.maxFollowers
    ) {
      store.commit("removeItemByKey", this.costItemKey);
      store.commit("addFollower", {
        name: this.name,
        imagePath: this.imagePath,
        x: Math.round(Math.round(Math.random() * 100)),
        size: Math.round(32 + Math.random() * 3)
      });
    }
  }
}

export const UNDEAD = new Follower(
  "Undead",
  require("@/assets/images/followers/undead.png"),
  "+1 Undead (+1 magicPrecision / lvl)",
  "An undead follower loyal beyond life.",
  "Undead Stone",
  "undead_stone",
  [{ statName: USER_STAT.MAGIC_PRECISION, amount: 1 }]
);

export const KNIGHT = new Follower(
  "Knight",
  require("@/assets/images/followers/knight.png"),
  "+1 Knight (+1 magicIQ / lvl)",
  "A loyal knight follower",
  "Soul Stone",
  "soul_stone",
  [{ statName: USER_STAT.MAGIC_IQ, amount: 1 }]
);

export const GOBLIN = new Follower(
  "Goblin",
  require("@/assets/images/followers/goblin.png"),
  "+1 Goblin (+1 luck / lvl)",
  "A goblin that seems to love and learn from you.",
  "Goblin Stone",
  "goblin_stone",
  [{ statName: USER_STAT.LUCK, amount: 1 }]
);

export const WIZARD = new Follower(
  "Wizard",
  require("@/assets/images/followers/wizard.png"),
  "+1 Wizard (+1 magicStrength / lvl)",
  "A wizard that follows you to learn.",
  "Soul Stone",
  "soul_stone",
  [{ statName: USER_STAT.MAGIC_STRENGTH, amount: 1 }]
);

export const HEALER_YANG = new Follower(
  "Healer Yang",
  require("@/assets/images/followers/healer_yang.png"),
  "+1 Healer Yang (+5 HP / lvl)",
  "A powerful healer known to help wizards.",
  "Health Stone",
  "heath_stone",
  [{ statName: USER_STAT.HP, amount: 5 }]
);

export const FOLLOWERS = [UNDEAD, KNIGHT, GOBLIN, WIZARD, HEALER_YANG];
export const FOLLOWERS_MAP = {
  [UNDEAD.name]: UNDEAD,
  [KNIGHT.name]: KNIGHT,
  [GOBLIN.name]: GOBLIN,
  [WIZARD.name]: WIZARD,
  [HEALER_YANG.name]: HEALER_YANG
};
