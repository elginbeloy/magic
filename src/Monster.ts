import { InfoPopup } from "./Spell";
import { LocationMap } from "./LocationMap";
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

const getMonsterAttackDamage = (baseDamage: number): number => {
  return Math.round(0.8 * baseDamage + Math.random() * (0.4 * baseDamage));
};

export interface Monster {
  name: string;
  health: number;
  maxHealth: number;
  strength: number;
  rewardMultiplier: number;
  attackIntervalSeconds: number;
  attackInterval: number | undefined;
  effectIntervals: number[];
  level: number;
  imagePath: string;
  itemOptions: { item: Item; probability: number }[];
}

const attack = (
  strength: number,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void,
  addOuch: () => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  const damage = getMonsterAttackDamage(strength);
  store.commit("addHealth", -damage);
  addInfoPopups([{ text: `-${damage} Health`, colorHex: "#d7263d", xOffset }]);

  addOuch();
};

export class MonsterType {
  name: string;
  imagePath: string;
  health: number;
  strength: number;
  attackIntervalSeconds: number;
  rewardMultiplier: number;
  itemOptions: { item: Item; probability: number }[];

  constructor(
    name: string,
    imagePath: string,
    health: number,
    strength: number,
    rewardMultiplier: number,
    attackIntervalSeconds: number,
    itemOptions: { item: Item; probability: number }[]
  ) {
    this.name = name;
    this.imagePath = imagePath;
    this.health = health;
    this.strength = strength;
    this.rewardMultiplier = rewardMultiplier;
    this.attackIntervalSeconds = attackIntervalSeconds;
    this.itemOptions = itemOptions;
  }

  getMonster(
    level: number,
    store: any,
    addInfoPopups: (popups: InfoPopup[]) => void,
    addOuch: () => void
  ): Monster {
    const health = Math.round(
      this.health * level ** 2 +
        Math.random() * (this.health * level ** 2 * 0.2)
    );
    const strength = this.strength * level * 0.5;

    return {
      level,
      health: health,
      maxHealth: health,
      strength: strength,
      rewardMultiplier: this.rewardMultiplier,
      attackIntervalSeconds: this.attackIntervalSeconds,
      name: this.name,
      imagePath: this.imagePath,
      attackInterval: setInterval(
        () => attack(strength, store, addInfoPopups, addOuch),
        this.attackIntervalSeconds * 1000
      ),
      effectIntervals: [],
      itemOptions: this.itemOptions
    };
  }
}

export const GHOST = new MonsterType(
  "Ghost",
  require("@/assets/images/monsters/ghost.png"),
  5,
  1,
  1,
  2,
  [
    { item: WIZARD_HAT, probability: 0.1 },
    { item: BASIC_STAFF, probability: 0.05 },
    { item: BASIC_WAND, probability: 0.05 },
    { item: SPARK_WAND, probability: 0.025 }
  ]
);

export const ZOMBIE = new MonsterType(
  "Zombie",
  require("@/assets/images/monsters/zombie.png"),
  8,
  1.5,
  1.1,
  4,
  [
    { item: WIZARD_HAT, probability: 0.15 },
    { item: BASIC_WAND, probability: 0.05 },
    { item: SPARK_WAND, probability: 0.05 }
  ]
);

export const GOBLIN = new MonsterType(
  "Goblin",
  require("@/assets/images/monsters/goblin.png"),
  10,
  1.75,
  1.2,
  2,
  [
    { item: WIZARD_HAT, probability: 0.15 },
    { item: BASIC_STAFF, probability: 0.1 },
    { item: BASIC_WAND, probability: 0.1 },
    { item: SPARK_WAND, probability: 0.1 },
    { item: FIRE_EYE_STAFF, probability: 0.05 },
    { item: MAGIC_STAFF, probability: 0.05 }
  ]
);

export const WIZARD_HUNTING_WARRIOR = new MonsterType(
  "Wizard Hunting Warrior",
  require("@/assets/images/monsters/warrior.png"),
  15,
  2.5,
  1.5,
  3,
  [
    { item: WIZARD_HAT, probability: 0.25 },
    { item: BASIC_STAFF, probability: 0.15 },
    { item: BASIC_WAND, probability: 0.15 },
    { item: SPARK_WAND, probability: 0.15 },
    { item: FIRE_EYE_STAFF, probability: 0.1 },
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_WEALTH, probability: 0.05 }
  ]
);

export const WIZARD_HUNTING_ARCHER = new MonsterType(
  "Wizard Hunting Archer",
  require("@/assets/images/monsters/archer.png"),
  10,
  7.5,
  1.5,
  2,
  [
    { item: WIZARD_HAT, probability: 0.25 },
    { item: BASIC_STAFF, probability: 0.15 },
    { item: BASIC_WAND, probability: 0.15 },
    { item: SPARK_WAND, probability: 0.15 },
    { item: FIRE_EYE_STAFF, probability: 0.1 },
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_WEALTH, probability: 0.05 }
  ]
);

export const OGRE = new MonsterType(
  "Ogre",
  require("@/assets/images/monsters/ogre.png"),
  25,
  4,
  1.5,
  8,
  [
    { item: WIZARD_HAT, probability: 0.25 },
    { item: BASIC_STAFF, probability: 0.15 },
    { item: BASIC_WAND, probability: 0.15 },
    { item: SPARK_WAND, probability: 0.15 },
    { item: FIRE_EYE_STAFF, probability: 0.1 },
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_WEALTH, probability: 0.05 }
  ]
);

export const MINOTAUR = new MonsterType(
  "Minotaur",
  require("@/assets/images/monsters/minotaur.png"),
  15,
  3,
  1.5,
  2,
  [
    { item: MINOTAURS_MIGHT, probability: 0.25 },
    { item: STAFF_OF_HEALTH, probability: 0.05 }
  ]
);

export const CHIMERA = new MonsterType(
  "Chimera",
  require("@/assets/images/monsters/chimera.png"),
  30,
  5,
  2,
  2,
  [
    { item: FIRE_EYE_STAFF, probability: 0.1 },
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_MAGIC, probability: 0.01 }
  ]
);

export const PROTECTOR_OF_THE_SEA = new MonsterType(
  "Protector of the Sea",
  require("@/assets/images/monsters/protector_of_the_sea.png"),
  10,
  2.5,
  1.5,
  1,
  [
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_MAGIC, probability: 0.01 }
  ]
);

export const KAPPA = new MonsterType(
  "Kappa",
  require("@/assets/images/monsters/kappa.png"),
  50,
  2,
  1.6,
  2,
  [
    { item: FIRE_EYE_STAFF, probability: 0.1 },
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_MAGIC, probability: 0.01 }
  ]
);

export const KRAKEN = new MonsterType(
  "Kraken",
  require("@/assets/images/monsters/kraken.png"),
  80,
  2,
  1.75,
  4,
  [
    { item: FIRE_EYE_STAFF, probability: 0.1 },
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_MAGIC, probability: 0.01 }
  ]
);

export const SNOW_MONSTER = new MonsterType(
  "Snow Monster",
  require("@/assets/images/monsters/snowmonster.png"),
  50,
  5,
  2,
  2,
  [
    { item: FIRE_EYE_STAFF, probability: 0.1 },
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_MAGIC, probability: 0.01 }
  ]
);

export const SHADOW_MONSTER = new MonsterType(
  "Shadow Monster",
  require("@/assets/images/monsters/shadow_monster.png"),
  50,
  7.5,
  5,
  0.25,
  [
    { item: FIRE_EYE_STAFF, probability: 0.1 },
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_MAGIC, probability: 0.01 }
  ]
);

export const HOSTILE_WIZARD = new MonsterType(
  "Hostile Wizard",
  require("@/assets/images/monsters/wizard.png"),
  50,
  10,
  3.5,
  2,
  [
    { item: WIZARD_HAT, probability: 0.25 },
    { item: BASIC_STAFF, probability: 0.15 },
    { item: BASIC_WAND, probability: 0.15 },
    { item: SPARK_WAND, probability: 0.15 },
    { item: FIRE_EYE_STAFF, probability: 0.1 },
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_MAGIC, probability: 0.05 }
  ]
);

export const NECROMANCER = new MonsterType(
  "Necromancer",
  require("@/assets/images/monsters/necromancer.png"),
  500,
  5,
  5,
  5,
  [
    { item: WIZARD_HAT, probability: 0.25 },
    { item: BASIC_STAFF, probability: 0.15 },
    { item: BASIC_WAND, probability: 0.15 },
    { item: SPARK_WAND, probability: 0.15 },
    { item: FIRE_EYE_STAFF, probability: 0.1 },
    { item: MAGIC_STAFF, probability: 0.1 },
    { item: STAFF_OF_MANA, probability: 0.05 },
    { item: STAFF_OF_HEALTH, probability: 0.05 },
    { item: STAFF_OF_WEALTH, probability: 0.05 },
    { item: WAND_OF_MAGIC, probability: 0.05 }
  ]
);

export const getNextMonster = (
  level: number,
  store: any,
  map: LocationMap,
  addInfoPopups: (popups: InfoPopup[]) => void,
  addOuch: () => void
): Monster => {
  const roll = Math.random();
  let counter = 0;
  for (const monster of map.monsters) {
    counter += monster.probability;
    if (counter >= roll) {
      return monster.monster.getMonster(level, store, addInfoPopups, addOuch);
    }
  }

  return GHOST.getMonster(level, store, addInfoPopups, addOuch);
};
