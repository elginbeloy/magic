import { Spell, DEFAULT_SPELLS } from "./Spell";
import { LocationMap, MAPS } from "./LocationMap";
import { Item, WIZARD_HAT, BASIC_STAFF, BASIC_WAND } from "./Item";

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
  luck: number;

  health: number;
  mana: number;
  gold: number;

  lastGoldReward?: number;
  lastExpReward?: number;
  lastItemReward?: Item;

  spells: { [spellName: string]: Spell };
  equippedSpells: { [spellName: string]: Spell };
  maxSpells: number;
  reloadingSpells: string[];
  reloadRemovalTimeouts: number[];

  items: Item[];
  equippedItems: { [itemName: string]: Item };
}

export enum USER_STAT {
  HP = "HP",
  MP = "MP",
  MAGIC_IQ = "magicIQ",
  MAGIC_STRENGTH = "magicStrength",
  LUCK = "luck"
}

export const USER_STAT_DISPLAY_NAME_MAP: { [key in USER_STAT]: string } = {
  [USER_STAT.HP]: "HP",
  [USER_STAT.MP]: "MP",
  [USER_STAT.MAGIC_IQ]: "Magic IQ",
  [USER_STAT.MAGIC_STRENGTH]: "Magic Strength",
  [USER_STAT.LUCK]: "Luck"
};

export const USER_LEVELS = [
  10,
  15,
  20,
  25,
  50,
  100,
  175,
  250,
  500,
  1000,
  1500,
  2000,
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
  luck: 5,
  health: 20,
  mana: 5,
  gold: 500,
  spells: { ...DEFAULT_SPELLS },
  equippedSpells: { ...DEFAULT_SPELLS },
  maxSpells: 5,
  reloadingSpells: [],
  reloadRemovalTimeouts: [],
  items: [WIZARD_HAT, BASIC_STAFF, BASIC_WAND],
  equippedItems: {}
};