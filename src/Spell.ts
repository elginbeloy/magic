import { User } from "@/User.ts";
import { Monster } from "@/Monster.ts";

export interface InfoPopup {
  text: string;
  colorHex: string;
  xOffset?: number;
  yOffset?: number;
}

export interface Spell {
  key: string;
  name: string;
  desc: string;
  cast: (
    user: User,
    monster: Monster,
    store: any,
    addInfoPopups: (popups: InfoPopup[]) => void
  ) => void;
  reloadTimeSeconds: number;
  manaCost: number;
  imagePath: string;
  cost: number;
}

// Returns the attack damage result from a baseDamage.
const getAttackDamage = (baseDamage: number, magicPrecision: number) => {
  const chance = Math.random();
  const chanceOfMiss = 0.1 / (magicPrecision / 10);
  const chanceOfCrit = magicPrecision / 500;
  if (chance < chanceOfMiss) {
    // Miss does zero damage.
    return 0;
  } else if (chance > 1 - chanceOfCrit) {
    // Critical hit does up to 5x baseDamage.
    return Math.round(baseDamage * (1 + Math.random() * 5));
  }

  // Return a range of 0.8 baseDamage to 1.2 baseDamage.
  return Math.round(0.8 * baseDamage + Math.random() * 0.4 * baseDamage);
};

export class Spell {
  constructor({
    key,
    name,
    desc,
    reloadTimeSeconds,
    manaCost,
    imagePath,
    cost = 0
  }: Omit<Spell, "cast">) {
    this.key = key;
    this.name = name;
    this.desc = desc;
    this.reloadTimeSeconds = reloadTimeSeconds;
    this.manaCost = manaCost;
    this.imagePath = imagePath;
    this.cost = cost;
  }

  cast = (
    user: User,
    monster: Monster,
    store: any,
    addInfoPopups: (popups: InfoPopup[]) => void
  ) => {
    return;
  };
}

/* List of all available spells */

const healthRegain = new Spell({
  key: "healthRegain",
  name: "Life Regain",
  desc:
    "The first known healing spell. Regain <span class='magic-word'>magicStrength</span> HP.",
  reloadTimeSeconds: 5.0,
  manaCost: 2.0,
  imagePath: require("@/assets/images/spells/health_1.png"),
  cost: 0
});

healthRegain.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  store.commit("addHealth", user.magicStrength);
  store.commit("addMana", -healthRegain.manaCost);

  addInfoPopups([
    {
      text: `+${user.magicStrength} Health`,
      colorHex: "red"
    },
    { text: `-${healthRegain.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const manaRegain = new Spell({
  key: "manaRegain",
  name: "Magic Regain",
  desc:
    "The first known mana spell. Regain <span class='magic-word'>magicStrength</span> MP.",
  reloadTimeSeconds: 5.0,
  manaCost: 0.0,
  imagePath: require("@/assets/images/spells/mana_regain_1.png"),
  cost: 0
});

manaRegain.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  store.commit("addMana", user.magicStrength);

  addInfoPopups([
    {
      text: `+${user.magicStrength} Mana`,
      colorHex: "blue"
    }
  ]);
};

const magicAttack = new Spell({
  key: "magicAttack",
  name: "A Simple Attack Spell",
  desc:
    "You found it on page 1. ~0.25x<span class='magic-word'>magicStrength</span> DMG.",
  reloadTimeSeconds: 1.0,
  manaCost: 1.0,
  imagePath: require("@/assets/images/spells/magic_attack_1.png"),
  cost: 0
});

magicAttack.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
): void => {
  const damage = getAttackDamage(
    0.25 * user.magicStrength,
    user.magicPrecision
  );

  store.commit("addMana", -magicAttack.manaCost);
  store.dispatch("attackMonster", damage);

  addInfoPopups([
    {
      text: damage == 0 ? "Miss!" : `${damage} DMG`,
      colorHex: "red"
    },
    { text: `-${magicAttack.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const fireSpell = new Spell({
  key: "fireSpell",
  name: "Fire Spell",
  desc:
    "Shoot fire. Seems lit. ~0.5<span class='magic-word'>magicStrength</span> DMG. ~3 DMG / second burn effect.",
  reloadTimeSeconds: 5.0,
  manaCost: 5.0,
  imagePath: require("@/assets/images/spells/fire_spell_1.png"),
  cost: 50
});

fireSpell.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const damage = getAttackDamage(user.magicStrength * 0.5, user.magicPrecision);

  store.commit("addMana", -fireSpell.manaCost);
  store.dispatch("attackMonster", damage);

  store.commit(
    "addEffectInterval",
    setInterval(() => {
      const burn = getAttackDamage(3, user.magicPrecision);
      store.dispatch("attackMonster", burn);
      addInfoPopups([
        {
          text: `${burn} Burn DMG`,
          colorHex: "red"
        }
      ]);
    }, 1000)
  );

  addInfoPopups([
    {
      text: damage == 0 ? "Miss!" : `${damage} DMG`,
      colorHex: "red"
    },
    { text: `-${fireSpell.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const fireSpell2 = new Spell({
  key: "fireSpell2",
  name: "Fire Spell II",
  desc:
    "Shoot large fire blasts. ~<span class='magic-word'>magicStrength</span> DMG. ~5 DMG / second burn effect.",
  reloadTimeSeconds: 5.0,
  manaCost: 5.0,
  imagePath: require("@/assets/images/spells/fire_spell_2.png"),
  cost: 100
});

fireSpell2.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const damage = getAttackDamage(user.magicStrength, user.magicPrecision);

  store.commit("addMana", -fireSpell2.manaCost);
  store.dispatch("attackMonster", damage);

  store.commit(
    "addEffectInterval",
    setInterval(() => {
      const burn = getAttackDamage(5, user.magicPrecision);
      store.dispatch("attackMonster", burn);
      addInfoPopups([
        {
          text: `${burn} Burn DMG`,
          colorHex: "red"
        }
      ]);
    }, 1000)
  );

  addInfoPopups([
    {
      text: damage == 0 ? "Miss!" : `${damage} DMG`,
      colorHex: "red"
    },
    { text: `-${fireSpell2.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const fireSpell3 = new Spell({
  key: "fireSpell3",
  name: "Fire Spell III",
  desc:
    "Even more powerful fire magic. ~<span class='magic-word'>magicStrength</span> DMG with a ~10 DMG / second burn effect.",
  reloadTimeSeconds: 5.0,
  manaCost: 5.0,
  imagePath: require("@/assets/images/spells/fire_spell_3.png"),
  cost: 500
});

fireSpell3.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const damage = getAttackDamage(user.magicStrength * 2, user.magicPrecision);

  store.commit("addMana", -fireSpell3.manaCost);
  store.dispatch("attackMonster", damage);

  store.commit(
    "addEffectInterval",
    setInterval(() => {
      const burn = getAttackDamage(25, user.magicPrecision);
      store.dispatch("attackMonster", burn);
      addInfoPopups([
        {
          text: `${burn} Burn DMG`,
          colorHex: "red"
        }
      ]);
    }, 2000)
  );

  addInfoPopups([
    {
      text: damage == 0 ? "Miss!" : `${damage} DMG`,
      colorHex: "red"
    },
    { text: `-${fireSpell3.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const lifeLeach = new Spell({
  key: "lifeLeach",
  name: "Life Leach",
  desc:
    "Steal ~0.5x<span class='magic-word'>magicStrength</span> health points directly from your enemy.",
  reloadTimeSeconds: 5.0,
  manaCost: 3.0,
  imagePath: require("@/assets/images/spells/life_leach_1.png"),
  cost: 100
});

lifeLeach.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const damage = getAttackDamage(user.magicStrength * 0.5, user.magicPrecision);

  store.commit("addMana", -lifeLeach.manaCost);
  store.dispatch("attackMonster", damage);
  store.commit("addHealth", damage);

  addInfoPopups([
    {
      text: damage == 0 ? "Miss!" : `${damage} Life Stolen!`,
      colorHex: "red"
    },
    { text: `-${lifeLeach.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const lifeLeach2 = new Spell({
  key: "lifeLeach2",
  name: "Life Leach II",
  desc:
    "Steal ~<span class='magic-word'>magicStrength</span> health points from your enemy.",
  reloadTimeSeconds: 5.0,
  manaCost: 5.0,
  imagePath: require("@/assets/images/spells/life_leach_2.png"),
  cost: 250
});

lifeLeach2.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const damage = getAttackDamage(user.magicStrength, user.magicPrecision);

  store.commit("addMana", -lifeLeach2.manaCost);
  store.dispatch("attackMonster", damage);
  store.commit("addHealth", damage);

  addInfoPopups([
    {
      text: damage == 0 ? "Miss!" : `${damage} Life Stolen!`,
      colorHex: "red"
    },
    { text: `-${lifeLeach2.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const lifeLeach3 = new Spell({
  key: "lifeLeach3",
  name: "Life Leach III",
  desc:
    "Steal ~<span class='magic-word'>magicStrength</span> health points from your enemy.",
  reloadTimeSeconds: 3.0,
  manaCost: 5.0,
  imagePath: require("@/assets/images/spells/life_leach_3.png"),
  cost: 500
});

lifeLeach3.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const damage = getAttackDamage(user.magicStrength, user.magicPrecision);

  store.commit("addMana", -lifeLeach3.manaCost);
  store.dispatch("attackMonster", damage);
  store.commit("addHealth", damage);

  addInfoPopups([
    {
      text: "Life Stolen!",
      colorHex: "red"
    },
    { text: `-${lifeLeach3.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const brainExpander = new Spell({
  key: "brainExpander",
  name: "Brain Expander",
  desc: "Instantly expands the caster's brain. +1 Stat Points.",
  reloadTimeSeconds: 30.0,
  manaCost: 10.0,
  imagePath: require("@/assets/images/spells/brain_expander.png"),
  cost: 500
});

brainExpander.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  store.commit("addMana", -brainExpander.manaCost);
  store.commit("addStatPoints", 1);

  addInfoPopups([
    {
      text: "+1 Stat Point!",
      colorHex: "gold"
    },
    { text: `-${brainExpander.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const deathSpell = new Spell({
  key: "deathSpell",
  name: "Death Spell",
  desc:
    "A spell made solely for killing. ~5x<span class='magic-word'>magicStrength</span> DMG.",
  reloadTimeSeconds: 3.0,
  manaCost: 10.0,
  imagePath: require("@/assets/images/spells/death_spell.png"),
  cost: 500
});

deathSpell.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const damage = getAttackDamage(user.magicStrength * 5, user.magicPrecision);

  store.commit("addMana", -deathSpell.manaCost);
  store.dispatch("attackMonster", damage);

  addInfoPopups([
    {
      text: "Life Stolen!",
      colorHex: "red"
    },
    { text: `-${deathSpell.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const goldGain = new Spell({
  key: "goldGain",
  name: "Gold Generation",
  desc: "Instantly gain 5x<span class='magic-word'>magicStrength</span> gold.",
  reloadTimeSeconds: 30.0,
  manaCost: 5.0,
  imagePath: require("@/assets/images/spells/gold_gain_1.png"),
  cost: 100
});

goldGain.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  store.commit("addMana", -goldGain.manaCost);
  store.commit("addGold", 5 * user.magicStrength);

  addInfoPopups([
    {
      text: `+${5 * user.magicStrength} Gold!`,
      colorHex: "gold"
    },
    { text: `-${goldGain.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const goldGain2 = new Spell({
  key: "goldGain2",
  name: "Gold Generation II",
  desc: "Instantly gain 10x<span class='magic-word'>magicStrength</span> gold.",
  reloadTimeSeconds: 30.0,
  manaCost: 10.0,
  imagePath: require("@/assets/images/spells/gold_gain_2.png"),
  cost: 500
});

goldGain2.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  store.commit("addMana", -goldGain2.manaCost);
  store.commit("addGold", 10 * user.magicStrength);

  addInfoPopups([
    {
      text: `+${10 * user.magicStrength} Gold!`,
      colorHex: "gold"
    },
    { text: `-${goldGain2.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const goldGain3 = new Spell({
  key: "goldGain3",
  name: "Dead Man's Gold",
  desc:
    "Attack with ~<span class='magic-word'>magicStrength</span> DMG gaining 50xDMG in gold.",
  reloadTimeSeconds: 30.0,
  manaCost: 10.0,
  imagePath: require("@/assets/images/spells/gold_gain_3.png"),
  cost: 2500
});

goldGain3.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const damage = getAttackDamage(user.magicStrength, user.magicPrecision);

  store.dispatch("attackMonster", damage);
  store.commit("addMana", -goldGain3.manaCost);
  store.commit("addGold", 50 * damage);

  addInfoPopups([
    {
      text: `+${damage} Gold!`,
      colorHex: "gold"
    },
    {
      text: `${damage} DMG`,
      colorHex: "red"
    },
    { text: `-${goldGain3.manaCost} Mana`, colorHex: "blue" }
  ]);
};

const timeJump = new Spell({
  key: "timeJump",
  name: "Time Jump",
  desc: "Reloads all spells instantly. Except for itself of course.",
  reloadTimeSeconds: 30.0,
  manaCost: 10.0,
  imagePath: require("@/assets/images/spells/time_jump_1.png"),
  cost: 500
});

timeJump.cast = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  store.commit("clearReloadingSpells");

  addInfoPopups([
    {
      text: `Spells Cleared!`,
      colorHex: "gold"
    },
    { text: `-${timeJump.manaCost} Mana`, colorHex: "blue" }
  ]);
};

export const SPELLS: { [spellName: string]: Spell } = {
  healthRegain,
  manaRegain,
  magicAttack,
  fireSpell,
  fireSpell2,
  fireSpell3,
  lifeLeach,
  lifeLeach2,
  lifeLeach3,
  brainExpander,
  deathSpell,
  goldGain,
  goldGain2,
  goldGain3,
  timeJump
};

export const DEFAULT_SPELLS: { [spellName: string]: Spell } = {
  healthRegain: SPELLS["healthRegain"],
  manaRegain: SPELLS["manaRegain"],
  magicAttack: SPELLS["magicAttack"]
};
