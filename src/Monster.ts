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
  items: Item.Item[];
  stone?: Item.Item;
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
  stone?: Item.Item;

  constructor(
    name: string,
    imagePath: string,
    health: number,
    strength: number,
    rewardMultiplier: number,
    attackIntervalSeconds: number,
    stone?: Item.Item
  ) {
    this.name = name;
    this.imagePath = imagePath;
    this.health = health;
    this.strength = strength;
    this.rewardMultiplier = rewardMultiplier;
    this.attackIntervalSeconds = attackIntervalSeconds;
    this.stone = stone;
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
      items: Item.getItems(store.state.user, this.rewardMultiplier),
      stone: this.stone
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
  Item.UNDEAD_STONE
);

export const ZOMBIE = new MonsterType(
  "Zombie",
  require("@/assets/images/monsters/zombie.png"),
  6,
  1,
  1.1,
  2,
  Item.UNDEAD_STONE
);

export const GOBLIN = new MonsterType(
  "Goblin",
  require("@/assets/images/monsters/goblin.png"),
  8,
  1.5,
  1.2,
  2,
  Item.GOBLIN_STONE
);

export const WIZARD_HUNTING_WARRIOR = new MonsterType(
  "Wizard Hunting Warrior",
  require("@/assets/images/monsters/warrior.png"),
  15,
  2,
  1.5,
  2.25,
  Item.SOUL_STONE
);

export const WIZARD_HUNTING_ARCHER = new MonsterType(
  "Wizard Hunting Archer",
  require("@/assets/images/monsters/archer.png"),
  10,
  2.5,
  1.5,
  1.75,
  Item.SOUL_STONE
);

export const MECI_WOLF = new MonsterType(
  "Meci Wolf",
  require("@/assets/images/monsters/meci_wolf.png"),
  50,
  1.5,
  2,
  1.5
);

export const OGRE = new MonsterType(
  "Ogre",
  require("@/assets/images/monsters/ogre.png"),
  25,
  4,
  2,
  4
);

export const MINOTAUR = new MonsterType(
  "Minotaur",
  require("@/assets/images/monsters/minotaur.png"),
  10,
  2.5,
  2,
  1.5
);

export const CHIMERA = new MonsterType(
  "Chimera",
  require("@/assets/images/monsters/chimera.png"),
  30,
  5,
  3,
  2,
  Item.SOUL_STONE // should be stone of health
);

export const PROTECTOR_OF_THE_SEA = new MonsterType(
  "Protector of the Sea",
  require("@/assets/images/monsters/protector_of_the_sea.png"),
  10,
  2.5,
  1.5,
  1
);

export const KAPPA = new MonsterType(
  "Kappa",
  require("@/assets/images/monsters/kappa.png"),
  50,
  2,
  1.6,
  2
);

export const KRAKEN = new MonsterType(
  "Kraken",
  require("@/assets/images/monsters/kraken.png"),
  80,
  2,
  1.75,
  4
);

export const SNOW_MONSTER = new MonsterType(
  "Snow Monster",
  require("@/assets/images/monsters/snowmonster.png"),
  50,
  5,
  2,
  2
);

export const SHADOW_MONSTER = new MonsterType(
  "Shadow Monster",
  require("@/assets/images/monsters/shadow_monster.png"),
  50,
  7.5,
  5,
  0.25,
  Item.SOUL_STONE // should be death stone
);

export const HOSTILE_WIZARD = new MonsterType(
  "Hostile Wizard",
  require("@/assets/images/monsters/wizard.png"),
  50,
  10,
  3.5,
  2,
  Item.MAGIC_STONE
);

export const NECROMANCER = new MonsterType(
  "Necromancer",
  require("@/assets/images/monsters/necromancer.png"),
  500,
  5,
  5,
  5,
  Item.MAGIC_STONE
);

export const NICO_WOLF = new MonsterType(
  "Nico Wolf",
  require("@/assets/images/monsters/nico_wolf.png"),
  1000,
  10,
  25,
  1
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
