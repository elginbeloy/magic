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

export interface LocationMap {
  name: string;
  monsters: { monster: MonsterType; probability: number }[];
  imagePath: string;
  magicIQRequired: number;
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
    imagePath: require("@/assets/images/mystical_forest.jpg"),
    magicIQRequired: 0
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
    imagePath: require("@/assets/images/mountain_passage.jpg"),
    magicIQRequired: 10
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
    imagePath: require("@/assets/images/ocean_passage.png"),
    magicIQRequired: 20
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
    imagePath: require("@/assets/images/village.png"),
    magicIQRequired: 35
  },
  {
    name: "Frozen Passage",
    monsters: [{ monster: SNOW_MONSTER, probability: 1.0 }],
    imagePath: require("@/assets/images/frozen_passage.png"),
    magicIQRequired: 50
  },
  {
    name: "Cloud City",
    monsters: [{ monster: SNOW_MONSTER, probability: 1.0 }],
    imagePath: require("@/assets/images/cloud_city.jpg"),
    magicIQRequired: 75
  },
  {
    name: "Jungle Passage",
    monsters: [{ monster: SNOW_MONSTER, probability: 1.0 }],
    imagePath: require("@/assets/images/jungle_passage.jpg"),
    magicIQRequired: 100
  },
  {
    name: "Hallow's Passage",
    monsters: [
      { monster: NECROMANCER, probability: 0.4 },
      { monster: SHADOW_MONSTER, probability: 0.3 },
      { monster: GHOST, probability: 0.15 },
      { monster: ZOMBIE, probability: 0.15 }
    ],
    imagePath: require("@/assets/images/hallows_passage.jpg"),
    magicIQRequired: 150
  }
];
