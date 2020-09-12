import {
  MonsterType,
  GHOST,
  ZOMBIE,
  MINOTAUR,
  OGRE,
  GOBLIN,
  WIZARD_HUNTING_WARRIOR,
  WIZARD_HUNTING_ARCHER,
  CHIMERA,
  HOSTILE_WIZARD,
  SHADOW_MONSTER,
  KRAKEN,
  SNOW_MONSTER,
  PROTECTOR_OF_THE_SEA,
  KAPPA,
  NECROMANCER
} from "./Monster";
import {
  Item,
  WIZARD_HAT,
  BASIC_STAFF,
  BASIC_WAND,
  SPARK_WAND,
  FIRE_EYE_STAFF,
  MAGIC_STAFF,
  MINOTAURS_MIGHT,
  STAFF_OF_MANA,
  WAND_OF_WEALTH,
  STAFF_OF_WEALTH,
  STAFF_OF_HEALTH,
  WAND_OF_MAGIC
} from "./Item";

export interface LocationMap {
  name: string;
  monsters: { monster: MonsterType; probability: number }[];
  items: { item: Item; probability: number }[];
  imagePath: string;
}

export const MAPS: LocationMap[] = [
  {
    name: "Mystical Forest",
    monsters: [
      { monster: GHOST, probability: 0.4 },
      { monster: ZOMBIE, probability: 0.3 },
      { monster: GOBLIN, probability: 0.15 },
      { monster: OGRE, probability: 0.1 },
      { monster: MINOTAUR, probability: 0.05 }
    ],
    items: [
      { item: WIZARD_HAT, probability: 0.1 },
      { item: BASIC_STAFF, probability: 0.05 },
      { item: BASIC_WAND, probability: 0.05 },
      { item: SPARK_WAND, probability: 0.025 },
      { item: FIRE_EYE_STAFF, probability: 0.02 },
      { item: MAGIC_STAFF, probability: 0.01 }
    ],
    imagePath: require("@/assets/images/mystical_forest.jpg")
  },
  {
    name: "Mountain Passage",
    monsters: [
      { monster: MINOTAUR, probability: 0.4 },
      { monster: OGRE, probability: 0.2 },
      { monster: GOBLIN, probability: 0.15 },
      { monster: WIZARD_HUNTING_WARRIOR, probability: 0.15 },
      { monster: CHIMERA, probability: 0.08 },
      { monster: HOSTILE_WIZARD, probability: 0.02 }
    ],
    items: [
      { item: WIZARD_HAT, probability: 0.1 },
      { item: BASIC_STAFF, probability: 0.08 },
      { item: BASIC_WAND, probability: 0.08 },
      { item: SPARK_WAND, probability: 0.05 },
      { item: FIRE_EYE_STAFF, probability: 0.05 },
      { item: MAGIC_STAFF, probability: 0.03 },
      { item: MINOTAURS_MIGHT, probability: 0.03 },
      { item: STAFF_OF_MANA, probability: 0.02 }
    ],
    imagePath: require("@/assets/images/mountain_passage.jpg")
  },
  {
    name: "Ocean Passage",
    monsters: [
      { monster: KRAKEN, probability: 0.3 },
      { monster: PROTECTOR_OF_THE_SEA, probability: 0.25 },
      { monster: KAPPA, probability: 0.25 },
      { monster: GHOST, probability: 0.1 },
      { monster: SHADOW_MONSTER, probability: 0.1 }
    ],
    items: [
      { item: MAGIC_STAFF, probability: 0.15 },
      { item: MINOTAURS_MIGHT, probability: 0.075 },
      { item: STAFF_OF_MANA, probability: 0.05 },
      { item: WAND_OF_WEALTH, probability: 0.03 },
      { item: STAFF_OF_WEALTH, probability: 0.01 }
    ],
    imagePath: require("@/assets/images/ocean_passage.png")
  },
  {
    name: "Village",
    monsters: [
      { monster: WIZARD_HUNTING_WARRIOR, probability: 0.25 },
      { monster: WIZARD_HUNTING_ARCHER, probability: 0.25 },
      { monster: HOSTILE_WIZARD, probability: 0.25 },
      { monster: NECROMANCER, probability: 0.15 },
      { monster: GOBLIN, probability: 0.1 }
    ],
    items: [
      { item: WIZARD_HAT, probability: 0.12 },
      { item: BASIC_STAFF, probability: 0.12 },
      { item: BASIC_WAND, probability: 0.1 },
      { item: SPARK_WAND, probability: 0.1 },
      { item: FIRE_EYE_STAFF, probability: 0.08 },
      { item: MAGIC_STAFF, probability: 0.08 },
      { item: MINOTAURS_MIGHT, probability: 0.08 },
      { item: STAFF_OF_MANA, probability: 0.08 },
      { item: WAND_OF_WEALTH, probability: 0.05 },
      { item: STAFF_OF_WEALTH, probability: 0.03 },
      { item: STAFF_OF_HEALTH, probability: 0.01 },
      { item: WAND_OF_MAGIC, probability: 0.01 }
    ],
    imagePath: require("@/assets/images/village.png")
  },
  {
    name: "Frozen Passage",
    monsters: [{ monster: SNOW_MONSTER, probability: 1.0 }],
    items: [
      { item: WIZARD_HAT, probability: 0.12 },
      { item: BASIC_STAFF, probability: 0.12 },
      { item: BASIC_WAND, probability: 0.1 },
      { item: SPARK_WAND, probability: 0.1 },
      { item: FIRE_EYE_STAFF, probability: 0.08 },
      { item: MAGIC_STAFF, probability: 0.08 },
      { item: MINOTAURS_MIGHT, probability: 0.08 },
      { item: STAFF_OF_MANA, probability: 0.08 },
      { item: WAND_OF_WEALTH, probability: 0.05 },
      { item: STAFF_OF_WEALTH, probability: 0.03 },
      { item: STAFF_OF_HEALTH, probability: 0.01 },
      { item: WAND_OF_MAGIC, probability: 0.01 }
    ],
    imagePath: require("@/assets/images/frozen_passage.png")
  },
  {
    name: "Cloud City",
    monsters: [{ monster: SNOW_MONSTER, probability: 1.0 }],
    items: [
      { item: WIZARD_HAT, probability: 0.12 },
      { item: BASIC_STAFF, probability: 0.12 },
      { item: BASIC_WAND, probability: 0.1 },
      { item: SPARK_WAND, probability: 0.1 },
      { item: FIRE_EYE_STAFF, probability: 0.08 },
      { item: MAGIC_STAFF, probability: 0.08 },
      { item: MINOTAURS_MIGHT, probability: 0.08 },
      { item: STAFF_OF_MANA, probability: 0.08 },
      { item: WAND_OF_WEALTH, probability: 0.05 },
      { item: STAFF_OF_WEALTH, probability: 0.03 },
      { item: STAFF_OF_HEALTH, probability: 0.01 },
      { item: WAND_OF_MAGIC, probability: 0.01 }
    ],
    imagePath: require("@/assets/images/cloud_city.jpg")
  },
  {
    name: "Jungle Passage",
    monsters: [{ monster: SNOW_MONSTER, probability: 1.0 }],
    items: [
      { item: WIZARD_HAT, probability: 0.12 },
      { item: BASIC_STAFF, probability: 0.12 },
      { item: BASIC_WAND, probability: 0.1 },
      { item: SPARK_WAND, probability: 0.1 },
      { item: FIRE_EYE_STAFF, probability: 0.08 },
      { item: MAGIC_STAFF, probability: 0.08 },
      { item: MINOTAURS_MIGHT, probability: 0.08 },
      { item: STAFF_OF_MANA, probability: 0.08 },
      { item: WAND_OF_WEALTH, probability: 0.05 },
      { item: STAFF_OF_WEALTH, probability: 0.03 },
      { item: STAFF_OF_HEALTH, probability: 0.01 },
      { item: WAND_OF_MAGIC, probability: 0.01 }
    ],
    imagePath: require("@/assets/images/jungle_passage.jpg")
  }
];
