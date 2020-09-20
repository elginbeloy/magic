import { InfoPopup } from "./Spell";
import { LocationMap } from "./LocationMap";
import * as Item from "./Item";

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
  itemOptions: { item: Item.Item; probability: number }[];
}

const attack = (
  strength: number,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void,
  addOuch: () => void
) => {
  const damage = getMonsterAttackDamage(strength);
  store.commit("addHealth", -damage);
  addInfoPopups([{ text: `-${damage} Health`, colorHex: "#d7263d" }]);

  addOuch();
};

export class MonsterType {
  name: string;
  imagePath: string;
  health: number;
  strength: number;
  attackIntervalSeconds: number;
  rewardMultiplier: number;
  itemOptions: { item: Item.Item; probability: number }[];

  constructor(
    name: string,
    imagePath: string,
    health: number,
    strength: number,
    rewardMultiplier: number,
    attackIntervalSeconds: number,
    itemOptions: { item: Item.Item; probability: number }[]
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
    const strength = this.strength * level;

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
    { item: Item.GHOST_STONE, probability: 1.0 },
    { item: Item.BASIC_WIZARD_HAT, probability: 0.05 }
  ]
);

export const ZOMBIE = new MonsterType(
  "Zombie",
  require("@/assets/images/monsters/zombie.png"),
  6,
  1,
  1.1,
  2,
  [
    { item: Item.BASIC_WIZARD_HAT, probability: 0.08 },
    { item: Item.BASIC_STAFF, probability: 0.06 },
    { item: Item.BASIC_WAND, probability: 0.05 },
    { item: Item.APPRENTICE_WAND, probability: 0.04 },
    { item: Item.NATURE_WAND, probability: 0.04 }
  ]
);

export const GOBLIN = new MonsterType(
  "Goblin",
  require("@/assets/images/monsters/goblin.png"),
  8,
  1.5,
  1.2,
  2,
  [
    { item: Item.BASIC_WIZARD_HAT, probability: 0.09 },
    { item: Item.BASIC_STAFF, probability: 0.07 },
    { item: Item.BASIC_WAND, probability: 0.06 },
    { item: Item.APPRENTICE_WAND, probability: 0.05 },
    { item: Item.NATURE_WAND, probability: 0.05 },
    { item: Item.THE_OPAL_ROD, probability: 0.03 }
  ]
);

export const WIZARD_HUNTING_WARRIOR = new MonsterType(
  "Wizard Hunting Warrior",
  require("@/assets/images/monsters/warrior.png"),
  15,
  2,
  1.5,
  2.25,
  [
    { item: Item.SOUL_STONE, probability: 1.0 },
    { item: Item.BASIC_WIZARD_HAT, probability: 0.15 },
    { item: Item.BASIC_STAFF, probability: 0.1 },
    { item: Item.BASIC_WAND, probability: 0.09 },
    { item: Item.APPRENTICE_WAND, probability: 0.08 },
    { item: Item.NATURE_WAND, probability: 0.08 },
    { item: Item.THE_OPAL_ROD, probability: 0.06 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.04 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.04 },
    { item: Item.SPARK_WAND, probability: 0.02 }
  ]
);

export const WIZARD_HUNTING_ARCHER = new MonsterType(
  "Wizard Hunting Archer",
  require("@/assets/images/monsters/archer.png"),
  10,
  2.5,
  1.5,
  1.75,
  [
    { item: Item.SOUL_STONE, probability: 1.0 },
    { item: Item.BASIC_WIZARD_HAT, probability: 0.15 },
    { item: Item.BASIC_STAFF, probability: 0.1 },
    { item: Item.BASIC_WAND, probability: 0.09 },
    { item: Item.APPRENTICE_WAND, probability: 0.08 },
    { item: Item.NATURE_WAND, probability: 0.08 },
    { item: Item.THE_OPAL_ROD, probability: 0.06 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.04 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.04 },
    { item: Item.SPARK_WAND, probability: 0.02 }
  ]
);

export const MECI_WOLF = new MonsterType(
  "Meci Wolf",
  require("@/assets/images/monsters/meci_wolf.png"),
  50,
  1.5,
  2,
  1.5,
  [
    { item: Item.APPRENTICE_WAND, probability: 0.12 },
    { item: Item.NATURE_WAND, probability: 0.12 },
    { item: Item.THE_OPAL_ROD, probability: 0.08 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.06 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.06 },
    { item: Item.SPARK_WAND, probability: 0.04 },
    { item: Item.STAFF_OF_HEALTH, probability: 0.01 }
  ]
);

export const OGRE = new MonsterType(
  "Ogre",
  require("@/assets/images/monsters/ogre.png"),
  25,
  4,
  2,
  4,
  [
    { item: Item.APPRENTICE_WAND, probability: 0.12 },
    { item: Item.NATURE_WAND, probability: 0.12 },
    { item: Item.THE_OPAL_ROD, probability: 0.08 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.06 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.06 },
    { item: Item.SPARK_WAND, probability: 0.04 },
    { item: Item.STAFF_OF_HEALTH, probability: 0.01 },
    { item: Item.MANA_HAT, probability: 0.01 },
    { item: Item.MAGIC_STAFF, probability: 0.01 }
  ]
);

export const MINOTAUR = new MonsterType(
  "Minotaur",
  require("@/assets/images/monsters/minotaur.png"),
  10,
  2.5,
  2,
  1.5,
  [
    { item: Item.MINOTAURS_MIGHT, probability: 0.15 },
    { item: Item.APPRENTICE_WAND, probability: 0.12 },
    { item: Item.NATURE_WAND, probability: 0.12 },
    { item: Item.THE_OPAL_ROD, probability: 0.08 }
  ]
);

export const CHIMERA = new MonsterType(
  "Chimera",
  require("@/assets/images/monsters/chimera.png"),
  30,
  5,
  3,
  2,
  [
    { item: Item.THE_OPAL_ROD, probability: 0.15 },
    { item: Item.DARK_SPELL_BOOK, probability: 0.08 },
    { item: Item.FIRE_EYE_STAFF, probability: 0.08 },
    { item: Item.SPARK_WAND, probability: 0.08 },
    { item: Item.STAFF_OF_HEALTH, probability: 0.04 },
    { item: Item.MANA_HAT, probability: 0.04 },
    { item: Item.MAGIC_STAFF, probability: 0.03 }
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
    { item: Item.SPARK_WAND, probability: 0.08 },
    { item: Item.STAFF_OF_HEALTH, probability: 0.06 },
    { item: Item.MANA_HAT, probability: 0.06 },
    { item: Item.MAGIC_STAFF, probability: 0.04 },
    { item: Item.MAGIC_SCROLL, probability: 0.02 },
    { item: Item.STAFF_OF_MANA, probability: 0.02 },
    { item: Item.WAND_OF_WEALTH, probability: 0.01 }
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
    { item: Item.SPARK_WAND, probability: 0.08 },
    { item: Item.STAFF_OF_HEALTH, probability: 0.06 },
    { item: Item.MANA_HAT, probability: 0.06 },
    { item: Item.MAGIC_STAFF, probability: 0.04 },
    { item: Item.MAGIC_SCROLL, probability: 0.02 },
    { item: Item.STAFF_OF_MANA, probability: 0.02 },
    { item: Item.WAND_OF_WEALTH, probability: 0.01 }
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
    { item: Item.SPARK_WAND, probability: 0.08 },
    { item: Item.STAFF_OF_HEALTH, probability: 0.06 },
    { item: Item.MANA_HAT, probability: 0.06 },
    { item: Item.MAGIC_STAFF, probability: 0.04 },
    { item: Item.MAGIC_SCROLL, probability: 0.02 },
    { item: Item.STAFF_OF_MANA, probability: 0.02 },
    { item: Item.WAND_OF_WEALTH, probability: 0.01 }
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
    { item: Item.SPARK_WAND, probability: 0.08 },
    { item: Item.STAFF_OF_HEALTH, probability: 0.06 },
    { item: Item.MANA_HAT, probability: 0.06 },
    { item: Item.MAGIC_STAFF, probability: 0.04 },
    { item: Item.MAGIC_SCROLL, probability: 0.02 },
    { item: Item.STAFF_OF_MANA, probability: 0.02 },
    { item: Item.WAND_OF_WEALTH, probability: 0.01 }
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
    { item: Item.MANA_HAT, probability: 0.1 },
    { item: Item.MAGIC_STAFF, probability: 0.9 },
    { item: Item.MAGIC_SCROLL, probability: 0.08 },
    { item: Item.STAFF_OF_MANA, probability: 0.08 },
    { item: Item.WAND_OF_WEALTH, probability: 0.05 },
    { item: Item.STAFF_OF_WEALTH, probability: 0.03 },
    { item: Item.DARK_SPELL_BOOK_2, probability: 0.02 }
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
    { item: Item.MANA_HAT, probability: 0.1 },
    { item: Item.MAGIC_STAFF, probability: 0.9 },
    { item: Item.MAGIC_SCROLL, probability: 0.08 },
    { item: Item.STAFF_OF_MANA, probability: 0.08 },
    { item: Item.WAND_OF_WEALTH, probability: 0.05 },
    { item: Item.STAFF_OF_WEALTH, probability: 0.03 },
    { item: Item.DARK_SPELL_BOOK_2, probability: 0.02 }
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
    { item: Item.MANA_HAT, probability: 0.1 },
    { item: Item.MAGIC_STAFF, probability: 0.9 },
    { item: Item.MAGIC_SCROLL, probability: 0.08 },
    { item: Item.STAFF_OF_MANA, probability: 0.08 },
    { item: Item.WAND_OF_WEALTH, probability: 0.05 },
    { item: Item.STAFF_OF_WEALTH, probability: 0.03 },
    { item: Item.DARK_SPELL_BOOK_2, probability: 0.02 }
  ]
);

export const NICO_WOLF = new MonsterType(
  "Nico Wolf",
  require("@/assets/images/monsters/nico_wolf.png"),
  1000,
  10,
  25,
  1,
  [{ item: Item.WAND_OF_MAGIC, probability: 1.0 }]
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
