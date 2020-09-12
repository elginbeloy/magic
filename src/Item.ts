export class Item {
  key: string;
  name: string;
  desc: string;
  imagePath: string;
  sellValue: number;
  equip: (store: any) => void;
  unequip: (store: any) => void;

  constructor(
    key: string,
    name: string,
    desc: string,
    imagePath: string,
    sellValue: number,
    equip: (store: any) => void,
    unequip: (store: any) => void
  ) {
    this.key = key;
    this.name = name;
    this.desc = desc;
    this.imagePath = imagePath;
    this.sellValue = sellValue;
    this.equip = equip;
    this.unequip = unequip;
  }
}

export const WIZARD_HAT = new Item(
  "wizard_hat",
  "A Wizard's Hat",
  "Seems Basic. Adds +1 magicStrength.",
  require("@/assets/images/items/basic_wizard_hat.png"),
  10,
  (store: any) => {
    store.commit("addStat", "magicStrength", 1);
  },
  (store: any) => {
    store.commit("addStat", "magicStrength", -1);
  }
);

export const BASIC_STAFF = new Item(
  "basic_staff",
  "Basic Staff",
  "Seems Basic. Adds +3 total MP.",
  require("@/assets/images/items/basic_staff.png"),
  20,
  (store: any) => {
    store.commit("addStat", "MP", 3);
  },
  (store: any) => {
    store.commit("addStat", "MP", -3);
  }
);

export const BASIC_WAND = new Item(
  "basic_wand",
  "Basic Wand",
  "Seems Basic. Adds +2 magicStrength.",
  require("@/assets/images/items/basic_wand.png"),
  20,
  (store: any) => {
    store.commit("addStat", "magicStrength", 2);
  },
  (store: any) => {
    store.commit("addStat", "magicStrength", -2);
  }
);

export const FIRE_EYE_STAFF = new Item(
  "fire_eye_staff",
  "Fire Eye Staff",
  "You feel the magic burn in you. Adds +5 magicStrength.",
  require("@/assets/images/items/fire_eye_staff.png"),
  100,
  (store: any) => {
    store.commit("addStat", "magicStrength", 5);
  },
  (store: any) => {
    store.commit("addStat", "magicStrength", -5);
  }
);

export const SPARK_WAND = new Item(
  "spark_wand",
  "Spark Wand",
  "You can see sparks. Cool. +5 luck.",
  require("@/assets/images/items/spark_wand.png"),
  100,
  (store: any) => {
    store.commit("addStat", "luck", 5);
  },
  (store: any) => {
    store.commit("addStat", "luck", -5);
  }
);

export const MAGIC_STAFF = new Item(
  "magic_staff",
  "Magic Staff",
  "Just powerful magic. +5 magicStrength, +5 MP.",
  require("@/assets/images/items/magic_staff.png"),
  150,
  (store: any) => {
    store.commit("addStat", "magicStrength", 5);
    store.commit("addStat", "MP", 5);
  },
  (store: any) => {
    store.commit("addStat", "magicStrength", -5);
    store.commit("addStat", "MP", -5);
  }
);

export const MINOTAURS_MIGHT = new Item(
  "minotaurs_might",
  "Minotaur's Might",
  "Bullish power rushes through your veins. +20 HP, +5 magicStrength.",
  require("@/assets/images/items/minotaurs_might_staff.png"),
  250,
  (store: any) => {
    store.commit("addStat", "HP", 20);
    store.commit("addStat", "magicStrength", 5);
  },
  (store: any) => {
    store.commit("addStat", "HP", -20);
    store.commit("addStat", "magicStrength", -5);
  }
);

export const STAFF_OF_MANA = new Item(
  "staff_of_mana",
  "Staff of Mana",
  "Mana flows thats all it knows. +25 MP.",
  require("@/assets/images/items/staff_of_mana.png"),
  500,
  (store: any) => {
    store.commit("addStat", "MP", 25);
  },
  (store: any) => {
    store.commit("addStat", "MP", -25);
  }
);

export const WAND_OF_WEALTH = new Item(
  "wand_of_wealth",
  "Wand of Wealth",
  "You're going to be rich! +25 luck!",
  require("@/assets/images/items/wand_of_wealth.png"),
  750,
  (store: any) => {
    store.commit("addStat", "luck", 25);
  },
  (store: any) => {
    store.commit("addStat", "luck", -25);
  }
);

export const STAFF_OF_WEALTH = new Item(
  "staff_of_wealth",
  "Staff of Wealth",
  "You're going to be rich! +50 luck!",
  require("@/assets/images/items/staff_of_wealth.png"),
  1500,
  (store: any) => {
    store.commit("addStat", "luck", 50);
  },
  (store: any) => {
    store.commit("addStat", "luck", -50);
  }
);

export const STAFF_OF_HEALTH = new Item(
  "staff_of_health",
  "Staff of Health",
  "You feel ... healthy. +50 HP.",
  require("@/assets/images/items/staff_of_health.png"),
  1000,
  (store: any) => {
    store.commit("addStat", "HP", 50);
  },
  (store: any) => {
    store.commit("addStat", "HP", -50);
  }
);

export const WAND_OF_MAGIC = new Item(
  "wand_of_magic",
  "Wand of Magic",
  "It caries the magic. +66 MP, +6 magicStrength.",
  require("@/assets/images/items/wand_of_magic.png"),
  1500,
  (store: any) => {
    store.commit("addStat", "MP", 66);
    store.commit("addStat", "magicStrength", 6);
  },
  (store: any) => {
    store.commit("addStat", "MP", -66);
    store.commit("addStat", "magicStrength", -6);
  }
);
