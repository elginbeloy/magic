export class Item {
  key: string;
  name: string;
  desc: string;
  imagePath: string;
  sellValue: number;
  effects: { statName: string; amount: number }[];

  constructor(
    key: string,
    name: string,
    desc: string,
    imagePath: string,
    sellValue: number,
    effects: { statName: string; amount: number }[]
  ) {
    this.key = key;
    this.name = name;
    this.desc = desc;
    this.imagePath = imagePath;
    this.sellValue = sellValue;
    this.effects = effects;
  }

  equip(store: any) {
    for (const effect of this.effects) {
      store.commit("addStatAmount", effect);
    }
  }

  unequip(store: any) {
    for (const effect of this.effects) {
      const undoEffect = { ...effect, amount: -effect.amount };
      store.commit("addStatAmount", undoEffect);
    }
  }
}

/* ====== Summoning Items ====== */

export const GHOST_STONE = new Item(
  "ghost_stone",
  "Ghost Stone",
  "You can barely make out ghosts floating inside. Adds +1 magicIQ.",
  require("@/assets/images/items/ghost_stone.png"),
  10,
  [{ statName: "magicIQ", amount: 1 }]
);

export const SOUL_STONE = new Item(
  "soul_stone",
  "Soul Stone",
  "It glows with life. You see memories inside. Adds +1 magicStrength.",
  require("@/assets/images/items/soul_stone.png"),
  20,
  [{ statName: "magicStrength", amount: 1 }]
);

/* ============================= */

export const WIZARD_HAT = new Item(
  "wizard_hat",
  "A Wizard's Hat",
  "Seems Basic. Adds +1 magicStrength.",
  require("@/assets/images/items/basic_wizard_hat.png"),
  10,
  [{ statName: "magicStrength", amount: 1 }]
);

export const BASIC_STAFF = new Item(
  "basic_staff",
  "Basic Staff",
  "Seems Basic. Adds +3 total MP.",
  require("@/assets/images/items/basic_staff.png"),
  20,
  [{ statName: "MP", amount: 3 }]
);

export const BASIC_WAND = new Item(
  "basic_wand",
  "Basic Wand",
  "Seems Basic. Adds +2 magicStrength.",
  require("@/assets/images/items/basic_wand.png"),
  20,
  [{ statName: "magicStrength", amount: 2 }]
);

export const FIRE_EYE_STAFF = new Item(
  "fire_eye_staff",
  "Fire Eye Staff",
  "You feel the magic burn in you. Adds +5 magicStrength.",
  require("@/assets/images/items/fire_eye_staff.png"),
  100,
  [{ statName: "magicStrength", amount: 5 }]
);

export const SPARK_WAND = new Item(
  "spark_wand",
  "Spark Wand",
  "You can see sparks. Cool. +5 luck.",
  require("@/assets/images/items/spark_wand.png"),
  100,
  [{ statName: "luck", amount: 5 }]
);

export const MAGIC_STAFF = new Item(
  "magic_staff",
  "Magic Staff",
  "Just powerful magic. +5 magicStrength, +5 MP.",
  require("@/assets/images/items/magic_staff.png"),
  150,
  [
    { statName: "magicStrength", amount: 5 },
    { statName: "MP", amount: 5 }
  ]
);

export const MINOTAURS_MIGHT = new Item(
  "minotaurs_might",
  "Minotaur's Might",
  "Bullish power rushes through your veins. +25 HP, +5 magicStrength.",
  require("@/assets/images/items/minotaurs_might_staff.png"),
  250,
  [
    { statName: "HP", amount: 25 },
    { statName: "magicStrength", amount: 5 }
  ]
);

export const STAFF_OF_MANA = new Item(
  "staff_of_mana",
  "Staff of Mana",
  "Mana flows thats all it knows. +25 MP.",
  require("@/assets/images/items/staff_of_mana.png"),
  500,
  [{ statName: "MP", amount: 25 }]
);

export const WAND_OF_WEALTH = new Item(
  "wand_of_wealth",
  "Wand of Wealth",
  "You're going to be rich! +25 luck!",
  require("@/assets/images/items/wand_of_wealth.png"),
  750,
  [{ statName: "luck", amount: 25 }]
);

export const STAFF_OF_WEALTH = new Item(
  "staff_of_wealth",
  "Staff of Wealth",
  "You're going to be rich! +50 luck!",
  require("@/assets/images/items/staff_of_wealth.png"),
  1500,
  [{ statName: "luck", amount: 50 }]
);

export const STAFF_OF_HEALTH = new Item(
  "staff_of_health",
  "Staff of Health",
  "You feel ... healthy. +100 HP.",
  require("@/assets/images/items/staff_of_health.png"),
  1000,
  [{ statName: "HP", amount: 100 }]
);

export const WAND_OF_MAGIC = new Item(
  "wand_of_magic",
  "Wand of Magic",
  "It caries the magic. +66 MP, +6 magicStrength.",
  require("@/assets/images/items/wand_of_magic.png"),
  1500,
  [
    { statName: "MP", amount: 66 },
    { statName: "magicStrength", amount: 6 }
  ]
);
