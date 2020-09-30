import { Avatar } from "./User";
import { Item } from "./Item";

export class Follower {
  name: string;
  imagePath: string;
  effectText: string;
  desc: string;
  cost: string;
  costItemKey: string;
  effects: { statName: string; amount: number }[];
  avatar: Avatar;

  constructor(
    name: string,
    imagePath: string,
    effectText: string,
    desc: string,
    cost: string,
    costItemKey: string,
    effects: { statName: string; amount: number }[]
  ) {
    this.name = name;
    this.imagePath = imagePath;
    this.effectText = effectText;
    this.desc = desc;
    this.cost = cost;
    this.costItemKey = costItemKey;
    this.effects = effects;
    this.avatar = {
      name: name,
      image: imagePath,
      x: Math.round(Math.random() * 100),
      size: 32 + Math.random() * 3
    };
  }

  // Should override.
  purchaseEffect(store: any) {
    const soulStones = store.state.user.items.filter(
      (item: Item) => item.key === this.costItemKey
    ).length;
    const knights = store.state.user.followers.filter(
      (follower: Follower) => follower.name === this.name
    ).length;

    if (soulStones > 0 && knights < store.state.user.maxKnights) {
      store.commit("removeItemByKey", this.costItemKey);
      store.commit("addFollower", this.avatar);
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
  [{ statName: "magicPrecision", amount: 1 }]
);

export const KNIGHT = new Follower(
  "Knight",
  require("@/assets/images/followers/knight.png"),
  "+1 Knight (+1 magicIQ / lvl)",
  "A loyal knight follower",
  "Soul Stone",
  "soul_stone",
  [{ statName: "magicIQ", amount: 1 }]
);

export const WIZARD = new Follower(
  "Wizard",
  require("@/assets/images/followers/wizard.png"),
  "+1 Wizard (+1 magicStrength / lvl)",
  "A wizard that follows you to learn.",
  "Soul Stone",
  "soul_stone",
  [{ statName: "magicStrength", amount: 1 }]
);

export const HEALER_YANG = new Follower(
  "Healer Yang",
  require("@/assets/images/followers/healer_yang.png"),
  "+1 Healer Yang (+5 HP / lvl)",
  "A powerful healer known to help wizards.",
  "Health Stone",
  "heath_stone",
  [{ statName: "HP", amount: 5 }]
);

export const FOLLOWERS = [UNDEAD, KNIGHT, WIZARD, HEALER_YANG];
