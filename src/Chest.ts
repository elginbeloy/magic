import * as Item from "./Item";

export interface Chest {
  name: string;
  imagePath: string;
  rewards: Item.Item[];
  expReward: number;
  goldReward: number;
  timeLengthSeconds: number;
}

export class ChestTypes {
  name: string;
  imagePath: string;
  rewardOptions: { item: Item.Item; probability: number }[];
  rewardMultiplier: number;
  minRewardItems: number;
  maxRewardItems: number;
  timeLengthSeconds: number;

  constructor(
    name: string,
    imagePath: string,
    rewardOptions: { item: Item.Item; probability: number }[],
    rewardMultiplier: number,
    minRewardItems: number,
    maxRewardItems: number,
    timeLengthSeconds: number
  ) {
    this.name = name;
    this.imagePath = imagePath;
    this.rewardOptions = rewardOptions;
    this.rewardMultiplier = rewardMultiplier;
    this.minRewardItems = minRewardItems;
    this.maxRewardItems = maxRewardItems;
    this.timeLengthSeconds = timeLengthSeconds;
  }

  getChest(level: number): Chest {
    const rewards: Item.Item[] = [];
    do {
      for (const option of this.rewardOptions) {
        if (rewards.length >= this.maxRewardItems) break;
        if (Math.random() + level / 100 > option.probability) {
          rewards.push(option.item);
        }
      }
    } while (rewards.length < this.minRewardItems);

    return {
      name: this.name,
      imagePath: this.imagePath,
      rewards: rewards,
      expReward: level * this.rewardMultiplier,
      goldReward: 10 * level * this.rewardMultiplier,
      timeLengthSeconds: this.timeLengthSeconds
    };
  }
}

export const COMMON_CHEST = new ChestTypes(
  "Common Chest",
  require("@/assets/images/chests/common_chest.png"),
  [
    { item: Item.BASIC_WIZARD_HAT, probability: 0.25 },
    { item: Item.BASIC_STAFF, probability: 0.25 },
    { item: Item.BASIC_WAND, probability: 0.25 },
    { item: Item.APPRENTICE_WAND, probability: 0.25 }
  ],
  1,
  1,
  3,
  30
);

export const UNCOMMON_CHEST = new ChestTypes(
  "Uncommon Chest",
  require("@/assets/images/chests/uncommon_chest.png"),
  [
    { item: Item.APPRENTICE_WAND, probability: 0.25 },
    { item: Item.NATURE_WAND, probability: 0.25 },
    { item: Item.THE_OPAL_ROD, probability: 0.25 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.25 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.25 }
  ],
  2,
  1,
  5,
  60
);

export const RARE_CHEST = new ChestTypes(
  "Rare Chest",
  require("@/assets/images/chests/rare_chest.png"),
  [
    { item: Item.FIRE_EYE_STAFF, probability: 0.25 },
    { item: Item.SPARK_WAND, probability: 0.15 },
    { item: Item.APPRENTICE_WAND, probability: 0.1 },
    { item: Item.NATURE_WAND, probability: 0.1 },
    { item: Item.THE_OPAL_ROD, probability: 0.05 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.05 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.05 }
  ],
  3,
  2,
  5,
  300
);

export const ANCIENT_CHEST = new ChestTypes(
  "Ancient Chest",
  require("@/assets/images/chests/ancient_chest.png"),
  [
    { item: Item.BASIC_WIZARD_HAT, probability: 0.75 },
    { item: Item.BASIC_STAFF, probability: 0.75 },
    { item: Item.BASIC_WAND, probability: 0.75 },
    { item: Item.APPRENTICE_WAND, probability: 0.5 },
    { item: Item.NATURE_WAND, probability: 0.5 },
    { item: Item.THE_OPAL_ROD, probability: 0.35 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.25 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.25 },
    { item: Item.SPARK_WAND, probability: 0.15 },
    { item: Item.APPRENTICE_WAND, probability: 0.1 },
    { item: Item.NATURE_WAND, probability: 0.1 },
    { item: Item.THE_OPAL_ROD, probability: 0.05 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.05 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.05 }
  ],
  4,
  2,
  6,
  600
);

export const WIZARDS_CHEST = new ChestTypes(
  "Wizard's Chest",
  require("@/assets/images/chests/wizards_chest.png"),
  [
    { item: Item.BASIC_WIZARD_HAT, probability: 0.75 },
    { item: Item.BASIC_STAFF, probability: 0.75 },
    { item: Item.BASIC_WAND, probability: 0.75 },
    { item: Item.APPRENTICE_WAND, probability: 0.5 },
    { item: Item.NATURE_WAND, probability: 0.5 },
    { item: Item.THE_OPAL_ROD, probability: 0.35 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.25 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.25 },
    { item: Item.SPARK_WAND, probability: 0.15 },
    { item: Item.APPRENTICE_WAND, probability: 0.1 },
    { item: Item.NATURE_WAND, probability: 0.1 },
    { item: Item.THE_OPAL_ROD, probability: 0.05 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.05 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.05 }
  ],
  5,
  2,
  8,
  1200
);

export const getNextChest = (level: number): Chest => {
  const roll = Math.random();
  if (roll < 0.65) {
    return COMMON_CHEST.getChest(level);
  } else if (roll < 0.85) {
    return UNCOMMON_CHEST.getChest(level);
  } else if (roll < 0.96) {
    return RARE_CHEST.getChest(level);
  } else if (roll < 0.99) {
    return ANCIENT_CHEST.getChest(level);
  } else {
    return WIZARDS_CHEST.getChest(level);
  }
};
