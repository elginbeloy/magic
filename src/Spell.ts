import { User } from "@/User.ts";
import { Monster } from "@/Monster.ts";

export interface InfoPopup {
  text: string;
  colorHex: string;
  xOffset: number;
}

export interface Spell {
  key: string;
  name: string;
  desc: string;
  effect: (
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
const getAttackDamage = (baseDamage: number) => {
  const chance = Math.random();
  if (chance < 0.1) {
    // Miss does zero damage.
    return 0;
  } else if (chance > 0.9) {
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
  }: Omit<Spell, "effect">) {
    this.key = key;
    this.name = name;
    this.desc = desc;
    this.reloadTimeSeconds = reloadTimeSeconds;
    this.manaCost = manaCost;
    this.imagePath = imagePath;
    this.cost = cost;
  }

  effect = (
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
  reloadTimeSeconds: 12.0,
  manaCost: 2.0,
  imagePath: require("@/assets/images/spells/health_1.png"),
  cost: 0
});

healthRegain.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= healthRegain.manaCost) {
    store.commit("addHealth", user.magicStrength);
    store.commit("addMana", -healthRegain.manaCost);

    infos = [
      {
        text: `+${user.magicStrength} Health`,
        colorHex: "red",
        xOffset: Math.round(Math.random() * 250 - 150)
      },
      { text: `-${healthRegain.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const manaRegain = new Spell({
  key: "manaRegain",
  name: "Magic Regain",
  desc:
    "The first known mana spell. Regain <span class='magic-word'>magicStrength</span> MP.",
  reloadTimeSeconds: 12.0,
  manaCost: 0.0,
  imagePath: require("@/assets/images/spells/mana_regain_1.png"),
  cost: 0
});

manaRegain.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  store.commit("addMana", user.magicStrength);

  addInfoPopups([
    {
      text: `+${user.magicStrength} Mana`,
      colorHex: "blue",
      xOffset: Math.round(Math.random() * 250 - 150)
    }
  ]);
};

const magicAttack = new Spell({
  key: "magicAttack",
  name: "A Simple Attack Spell",
  desc:
    "You found it on page 1. Does ~0.5x<span class='magic-word'>magicStrength</span> DMG.",
  reloadTimeSeconds: 3.0,
  manaCost: 1.0,
  imagePath: require("@/assets/images/spells/magic_attack_1.png"),
  cost: 0
});

magicAttack.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
): void => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= magicAttack.manaCost) {
    const damage = getAttackDamage(0.5 * user.magicStrength);
    store.commit("addMana", -magicAttack.manaCost);
    store.dispatch("attackMonster", damage);

    infos = [
      {
        text: damage == 0 ? "Miss!" : `${damage} DMG`,
        colorHex: "red",
        xOffset
      },
      { text: `-${magicAttack.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const fireSpell = new Spell({
  key: "fireSpell",
  name: "Fire Spell",
  desc:
    "Shoot fire. Seems lit. ~<span class='magic-word'>magicStrength</span> DMG. ~5 DMG / 2 Second burn effect.",
  reloadTimeSeconds: 10.0,
  manaCost: 5.0,
  imagePath: require("@/assets/images/spells/fire_spell_1.png"),
  cost: 25
});

fireSpell.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= fireSpell.manaCost) {
    const damage = getAttackDamage(user.magicStrength);

    store.commit("addMana", -fireSpell.manaCost);
    store.dispatch("attackMonster", damage);

    store.commit(
      "addEffectInterval",
      setInterval(() => {
        const burn = getAttackDamage(5);
        store.dispatch("attackMonster", burn);
        addInfoPopups([
          {
            text: `${burn} Burn DMG`,
            colorHex: "red",
            xOffset
          }
        ]);
      }, 2000)
    );

    infos = [
      {
        text: damage == 0 ? "Miss!" : `${damage} DMG`,
        colorHex: "red",
        xOffset
      },
      { text: `-${fireSpell.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const fireSpell2 = new Spell({
  key: "fireSpell2",
  name: "Fire Spell II",
  desc:
    "Shoot large fire blasts. Does ~1.25x<span class='magic-word'>magicStrength</span> DMG with a 10 DMG / second burn effect.",
  reloadTimeSeconds: 3.0,
  manaCost: 5.0,
  imagePath: require("@/assets/images/spells/fire_spell_2.png"),
  cost: 100
});

fireSpell2.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= fireSpell2.manaCost) {
    const damage = getAttackDamage(user.magicStrength * 1.25);

    store.commit("addMana", -fireSpell2.manaCost);
    store.dispatch("attackMonster", damage);

    store.commit(
      "addEffectInterval",
      setInterval(() => {
        const burn = getAttackDamage(10);
        store.dispatch("attackMonster", burn);
        addInfoPopups([
          {
            text: `${burn} Burn DMG`,
            colorHex: "red",
            xOffset
          }
        ]);
      }, 2000)
    );

    infos = [
      {
        text: damage == 0 ? "Miss!" : `${damage} DMG`,
        colorHex: "red",
        xOffset
      },
      { text: `-${fireSpell2.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const fireSpell3 = new Spell({
  key: "fireSpell3",
  name: "Fire Spell III",
  desc:
    "Fire as far as the eye can see. Is the world fire? Does ~2x<span class='magic-word'>magicStrength</span> DMG with a 25 DMG / second burn effect.",
  reloadTimeSeconds: 5.0,
  manaCost: 15.0,
  imagePath: require("@/assets/images/spells/fire_spell_3.png"),
  cost: 500
});

fireSpell3.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= fireSpell3.manaCost) {
    const damage = getAttackDamage(user.magicStrength * 2);

    store.commit("addMana", -fireSpell3.manaCost);
    store.dispatch("attackMonster", damage);

    store.commit(
      "addEffectInterval",
      setInterval(() => {
        const burn = getAttackDamage(25);
        store.dispatch("attackMonster", burn);
        addInfoPopups([
          {
            text: `${burn} Burn DMG`,
            colorHex: "red",
            xOffset
          }
        ]);
      }, 2000)
    );

    infos = [
      {
        text: damage == 0 ? "Miss!" : `${damage} DMG`,
        colorHex: "red",
        xOffset
      },
      { text: `-${fireSpell3.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const lifeLeach = new Spell({
  key: "lifeLeach",
  name: "Life Leach",
  desc:
    "Steal ~0.5x<span class='magic-word'>magicStrength</span> health points directly from your enemy.",
  reloadTimeSeconds: 6.0,
  manaCost: 3.0,
  imagePath: require("@/assets/images/spells/life_leach_1.png"),
  cost: 250
});

lifeLeach.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= lifeLeach.manaCost) {
    const damage = getAttackDamage(user.magicStrength * 0.5);

    store.commit("addMana", -lifeLeach.manaCost);
    store.dispatch("attackMonster", damage);
    store.commit("addHealth", damage);

    infos = [
      {
        text: damage == 0 ? "Miss!" : `${damage} Life Stolen!`,
        colorHex: "red",
        xOffset
      },
      { text: `-${lifeLeach.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const lifeLeach2 = new Spell({
  key: "lifeLeach2",
  name: "Life Leach II",
  desc:
    "Steal ~<span class='magic-word'>magicStrength</span> health points from your enemy.",
  reloadTimeSeconds: 6.0,
  manaCost: 10.0,
  imagePath: require("@/assets/images/spells/life_leach_2.png"),
  cost: 1000
});

lifeLeach2.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= lifeLeach2.manaCost) {
    const damage = getAttackDamage(user.magicStrength);

    store.commit("addMana", -lifeLeach2.manaCost);
    store.dispatch("attackMonster", damage);
    store.commit("addHealth", damage);

    infos = [
      {
        text: damage == 0 ? "Miss!" : `${damage} Life Stolen!`,
        colorHex: "red",
        xOffset
      },
      { text: `-${lifeLeach2.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const lifeLeach3 = new Spell({
  key: "lifeLeach3",
  name: "Life Leach III",
  desc: "Instantly take half your enemies remaining life points for yourself.",
  reloadTimeSeconds: 60.0,
  manaCost: 30.0,
  imagePath: require("@/assets/images/spells/life_leach_3.png"),
  cost: 5000
});

lifeLeach3.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= lifeLeach3.manaCost) {
    const damage = Math.round(monster.health / 2);

    store.commit("addMana", -lifeLeach3.manaCost);
    store.dispatch("attackMonster", damage);
    store.commit("addHealth", damage);

    infos = [
      {
        text: "Life Stolen!",
        colorHex: "red",
        xOffset
      },
      { text: `-${lifeLeach3.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const brainExpander = new Spell({
  key: "brainExpander",
  name: "Brain Expander",
  desc: "Instantly expands the caster's brain. +1 Stat Points.",
  reloadTimeSeconds: 30.0,
  manaCost: 20.0,
  imagePath: require("@/assets/images/spells/brain_expander.png"),
  cost: 1000
});

brainExpander.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= brainExpander.manaCost) {
    store.commit("addMana", -brainExpander.manaCost);
    store.commit("addStatPoints", 1);

    infos = [
      {
        text: "+1 Stat Point!",
        colorHex: "gold",
        xOffset
      },
      { text: `-${brainExpander.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const deathSpell = new Spell({
  key: "deathSpell",
  name: "Death Spell",
  desc: "Decay half of any enemies life with a single spell.",
  reloadTimeSeconds: 10.0,
  manaCost: 5.0,
  imagePath: require("@/assets/images/spells/death_spell.png"),
  cost: 500
});

deathSpell.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= deathSpell.manaCost) {
    const damage = Math.round(monster.health / 2);

    store.commit("addMana", -deathSpell.manaCost);
    store.dispatch("attackMonster", damage);

    infos = [
      {
        text: "Life Stolen!",
        colorHex: "red",
        xOffset
      },
      { text: `-${deathSpell.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const goldGain = new Spell({
  key: "goldGain",
  name: "Gold Generation",
  desc: "Instantly gain 10x<span class='magic-word'>magicStrength</span> gold.",
  reloadTimeSeconds: 30.0,
  manaCost: 10.0,
  imagePath: require("@/assets/images/spells/gold_gain_1.png"),
  cost: 500
});

goldGain.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= goldGain.manaCost) {
    store.commit("addMana", -goldGain.manaCost);
    store.commit("addGold", 10 * user.magicStrength);

    infos = [
      {
        text: `+${10 * user.magicStrength} Gold!`,
        colorHex: "gold",
        xOffset
      },
      { text: `-${goldGain.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const goldGain2 = new Spell({
  key: "goldGain2",
  name: "Gold Generation II",
  desc: "Instantly gain 25x<span class='magic-word'>magicStrength</span> gold.",
  reloadTimeSeconds: 30.0,
  manaCost: 15.0,
  imagePath: require("@/assets/images/spells/gold_gain_2.png"),
  cost: 2500
});

goldGain2.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= goldGain2.manaCost) {
    store.commit("addMana", -goldGain2.manaCost);
    store.commit("addGold", 25 * user.magicStrength);

    infos = [
      {
        text: `+${25 * user.magicStrength} Gold!`,
        colorHex: "gold",
        xOffset
      },
      { text: `-${goldGain2.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
};

const goldGain3 = new Spell({
  key: "goldGain3",
  name: "Dead Man's Gold",
  desc: "Instantly take 50 X half of your enemies HP in gold.",
  reloadTimeSeconds: 30.0,
  manaCost: 20.0,
  imagePath: require("@/assets/images/spells/gold_gain_3.png"),
  cost: 2500
});

goldGain3.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= goldGain3.manaCost) {
    const damage = Math.round(monster.health / 2);

    store.dispatch("attackMonster", damage);
    store.commit("addMana", -goldGain3.manaCost);
    store.commit("addGold", 50 * damage);

    infos = [
      {
        text: `+${damage} Gold!`,
        colorHex: "gold",
        xOffset
      },
      { text: `-${goldGain3.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
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

timeJump.effect = (
  user: User,
  monster: Monster,
  store: any,
  addInfoPopups: (popups: InfoPopup[]) => void
) => {
  const xOffset = Math.round(Math.random() * 250 - 150);
  let infos: InfoPopup[] = [
    { text: "Not Enough Mana!", colorHex: "blue", xOffset }
  ];

  if (user.mana >= timeJump.manaCost) {
    store.commit("clearReloadingSpells");

    infos = [
      {
        text: `Spells Cleared!`,
        colorHex: "gold",
        xOffset
      },
      { text: `-${timeJump.manaCost} Mana`, colorHex: "blue", xOffset }
    ];
  }

  addInfoPopups(infos);
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
