import { Spell, DEFAULT_SPELLS } from "./Spell";
import { LocationMap, MAPS } from "./LocationMap";
import { Item } from "./Item";

export interface User {
  exp: number;
  level: number;
  statPoints: number;

  map: LocationMap;

  HP: number;
  MP: number;
  inventorySize: number;
  magicIQ: number;
  magicStrength: number;
  magicPrecision: number;
  luck: number;

  health: number;
  mana: number;
  gold: number;

  // Used to show the victory screen rewards.
  lastGoldReward?: number;
  lastExpReward?: number;
  lastRewardItems: Item[];

  // Used to show the death / level up screens.
  dead: boolean;
  levelUp: boolean;

  spells: { [spellName: string]: Spell };
  equippedSpells: { [spellName: string]: Spell };
  maxSpells: number;
  reloadingSpells: string[];
  reloadRemovalTimeouts: number[];

  // Building & Followers stats.
  maxFollowers: number;
  buildings: Avatar[];
  followers: Avatar[];

  items: Item[];
  equippedItems: { [itemName: string]: Item };
}

export interface Avatar {
  name: string;
  imagePath: string;
  x: number;
  size: number;
}

export enum USER_STAT {
  HP = "HP",
  MP = "MP",
  MAGIC_IQ = "magicIQ",
  MAGIC_STRENGTH = "magicStrength",
  MAGIC_PRECISION = "magicPrecision",
  LUCK = "luck"
}

export const USER_STAT_DISPLAY_NAME_MAP: { [key in USER_STAT]: string } = {
  [USER_STAT.HP]: "HP",
  [USER_STAT.MP]: "MP",
  [USER_STAT.MAGIC_IQ]: "Magic IQ",
  [USER_STAT.MAGIC_STRENGTH]: "Strength",
  [USER_STAT.MAGIC_PRECISION]: "Precision",
  [USER_STAT.LUCK]: "Luck"
};

export const USER_LEVELS = [
  5,
  10,
  25,
  50,
  100,
  250,
  500,
  1000,
  2500,
  5000,
  10000,
  25000,
  50000,
  100000,
  250000,
  500000,
  1000000,
  10000000
];

export const BASE_USER: User = {
  exp: 0,
  level: 1,
  statPoints: 10,
  map: MAPS[0],
  HP: 20,
  MP: 5,
  inventorySize: 5,
  magicIQ: 5,
  magicStrength: 5,
  magicPrecision: 5,
  luck: 5,
  health: 20,
  mana: 5,
  gold: 0,
  dead: false,
  levelUp: false,
  spells: { ...DEFAULT_SPELLS },
  equippedSpells: { ...DEFAULT_SPELLS },
  maxSpells: 5,
  reloadingSpells: [],
  reloadRemovalTimeouts: [],
  items: [],
  lastRewardItems: [],
  equippedItems: {},
  maxFollowers: 0,
  followers: [],
  buildings: []
};
