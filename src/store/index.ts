import Vue from "vue";
import Vuex from "vuex";
import {
  User,
  USER_STAT,
  BASE_USER,
  USER_LEVELS,
  Follower,
  Building
} from "@/User.ts";
import { Monster } from "@/Monster";
import { Spell } from "@/Spell";
import { LocationMap } from "@/LocationMap";
import { Item } from "@/Item";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { ...BASE_USER },
    monster: null
  },
  mutations: {
    // Monster mutations
    // ==============================================================
    setMonster(state: any, monster: Monster | null) {
      monster?.effectIntervals.push;
      state.monster = monster;
    },
    damageMonster(state: any, damage: number) {
      if (state.monster) {
        state.monster.health -= damage;
      }
    },
    addEffectInterval(state: any, intervalId: number) {
      if (state.monster) {
        state.monster.effectIntervals.push(intervalId);
      } else {
        // Monster probably got killed by the same spell that caused this effect.
        clearInterval(intervalId);
      }
    },
    // User mutations
    // ==============================================================
    setUser(state, user: User) {
      state.user = user;
    },
    setMap(state, map: LocationMap) {
      Vue.set(state.user, "map", map);
    },
    clearReloadingSpells(state) {
      Vue.set(state.user, "reloadingSpells", []);
    },
    addReloadingSpell(state, spell: string) {
      if (state.monster) {
        Vue.set(state.user, "reloadingSpells", [
          ...state.user.reloadingSpells,
          spell
        ]);
      }
    },
    addReloadRemovalTimeout(state, id: number) {
      Vue.set(state.user, "reloadRemovalTimeouts", [
        ...state.user.reloadRemovalTimeouts,
        id
      ]);
    },
    clearReloadRemovalTimeouts(state) {
      Vue.set(state.user, "reloadRemovalTimeouts", []);
    },
    removeReloadingSpell(state, spell: string) {
      Vue.set(
        state.user,
        "reloadingSpells",
        state.user.reloadingSpells.filter((s: string) => s !== spell)
      );
    },
    setLastGoldReward(state, lastGoldReward: number) {
      Vue.set(state.user, "lastGoldReward", lastGoldReward);
    },
    setLastExpReward(state, lastExpReward: number) {
      Vue.set(state.user, "lastExpReward", lastExpReward);
    },
    setLastRewardItems(state, items: Item[]) {
      console.log(items);
      Vue.set(state.user, "lastRewardItems", items);
    },
    addHealth(state, health: number) {
      Vue.set(
        state.user,
        "health",
        Math.min(state.user.HP, state.user.health + health)
      );

      if (state.user.health <= 0) {
        state.user = { ...BASE_USER, dead: true };
        // Clear the current attack and effect intervals.
        clearInterval(state.monster.attackInterval);
        for (const effectInterval of state.monster.effectIntervals) {
          clearInterval(effectInterval);
        }
        state.monster = null;
      }
    },
    confirmDeath(state) {
      Vue.set(state.user, "dead", false);
    },
    confirmLevelUp(state) {
      Vue.set(state.user, "levelUp", false);
    },
    addMana(state, mana: number) {
      state.user.mana = Math.max(
        0,
        Math.min(state.user.MP, state.user.mana + mana)
      );
    },
    addExp(state, exp: number) {
      state.user.exp += exp;

      if (state.user.exp >= USER_LEVELS[state.user.level - 1]) {
        // Cleaner than doing hella vue.sets.
        state.user = {
          ...state.user,
          level: state.user.level + 1,
          exp: 0,
          statPoints: state.user.statPoints + (state.user.level + 1) * 5,
          levelUp: true,
          lastGoldReward: Math.round((state.user.level + 2) ** 2.75)
        };
      }
    },
    addGold(state, gold: number) {
      state.user.gold += gold;
    },
    addStatPoints(state, amount: number) {
      state.user.statPoints += amount;
    },
    addStatAmount(state, payload: { statName: USER_STAT; amount: number }) {
      Vue.set(
        state.user,
        payload.statName,
        state.user[payload.statName] + payload.amount
      );
    },
    addStat(state, statName: USER_STAT) {
      if (state.user.statPoints > 0) {
        state.user = {
          ...state.user,
          statPoints: state.user.statPoints - 1,
          [statName]: state.user[statName] + (statName === USER_STAT.HP ? 5 : 1)
        };
      }
    },
    addSpell(state, spell: Spell) {
      Vue.set(state.user, "spells", {
        ...state.user.spells,
        [spell.key]: spell
      });
    },
    equipSpellByKey(state, spellKey: string) {
      const spell = state.user.spells[spellKey];
      if (
        spell &&
        Object.keys(state.user.equippedSpells).length < state.user.maxSpells
      ) {
        Vue.set(state.user, "equippedSpells", {
          ...state.user.equippedSpells,
          [spellKey]: spell
        });
      }
    },
    unequipSpellByKey(state, spellKey: string) {
      const equippedSpells = { ...state.user.equippedSpells };
      delete equippedSpells[spellKey];
      Vue.set(state.user, "equippedSpells", equippedSpells);
    },
    addItem(state, item: Item) {
      Vue.set(state.user, "items", [...state.user.items, item]);
    },
    removeItemByKey(state, key: string) {
      const items = [...state.user.items];
      const firstIndex = items.findIndex(i => i.key == key);
      items.splice(firstIndex, 1);
      Vue.set(state.user, "items", items);
    },
    sellItem(state, item: Item) {
      const items = [...state.user.items];
      const firstIndex = items.findIndex(i => i.key == item.key);

      if (firstIndex === -1) {
        const equippedItems = { ...state.user.equippedItems };
        delete equippedItems[item.key];
        Vue.set(state.user, "equippedItems", equippedItems);
      } else {
        items.splice(firstIndex, 1);
        Vue.set(state.user, "items", items);
      }

      Vue.set(state.user, "gold", state.user.gold + item.sellValue);
    },
    equipItemByKey(state, itemKey: string) {
      const itemIndex: number = state.user.items.findIndex(
        (item: Item) => item.key === itemKey
      );
      if (
        state.user.items[itemIndex] &&
        Object.keys(state.user.equippedItems).length < state.user.inventorySize
      ) {
        Vue.set(state.user, "equippedItems", {
          ...state.user.equippedItems,
          [itemKey]: state.user.items[itemIndex]
        });

        const updatedItems = [...state.user.items];
        updatedItems.splice(itemIndex, 1);
        Vue.set(state.user, "items", updatedItems);
      }
    },
    unequipItemByKey(state, itemKey: string) {
      Vue.set(state.user, "items", [
        ...state.user.items,
        state.user.equippedItems[itemKey]
      ]);

      const equippedItems = { ...state.user.equippedItems };
      delete equippedItems[itemKey];
      Vue.set(state.user, "equippedItems", equippedItems);
    },
    addMaxKnights(state, amount: number) {
      Vue.set(state.user, "maxKnights", state.user.maxKnights + amount);
    },
    addMaxWizards(state, amount: number) {
      Vue.set(state.user, "maxWizards", state.user.maxWizards + amount);
    },
    addBuilding(state, building: Building) {
      Vue.set(state.user, "buildings", [...state.user.buildings, building]);
    },
    addFollower(state, follower: Follower) {
      Vue.set(state.user, "followers", [...state.user.followers, follower]);
    },
    restart(state) {
      state.user = { ...BASE_USER };
    }
  },
  actions: {
    attackMonster(context, damage: number) {
      context.commit("damageMonster", damage);

      if (context.state.monster.health <= 0) {
        // Get the experience and gold rewards.
        const goldReward = Math.round(
          context.state.monster.rewardMultiplier *
            (context.state.monster.level +
              Math.random() *
                (context.state.monster.level * (context.state.user.luck + 1)))
        );
        const expReward = Math.round(
          context.state.monster.rewardMultiplier *
            (context.state.monster.level +
              Math.random() * context.state.monster.level)
        );

        const rewardItems: Item[] = [];
        for (const item of context.state.monster.itemOptions) {
          const itemRoll =
            Math.random() * (1 / (context.state.user.luck / 5) ** 0.1);
          if (itemRoll <= item.probability) {
            context.commit("addItem", item.item);
            rewardItems.push(item.item);
          }
        }

        context.commit("setLastRewardItems", rewardItems);
        context.commit("addGold", goldReward);
        context.commit("addExp", expReward);
        context.commit("setLastGoldReward", goldReward);
        context.commit("setLastExpReward", expReward);

        for (const timeoutId of context.state.user.reloadRemovalTimeouts) {
          clearTimeout(timeoutId);
        }

        context.commit("clearReloadingSpells");
        context.commit("clearReloadRemovalTimeouts");

        // Clear the current attack and effect intervals.
        clearInterval(context.state.monster.attackInterval);
        for (const effectInterval of context.state.monster.effectIntervals) {
          clearInterval(effectInterval);
        }

        context.commit("setMonster", null);
      }
    },
    buySpell(context, spell: Spell) {
      if (
        context.state.user.gold >= spell.cost &&
        !context.state.user.spells[spell.key]
      ) {
        context.commit("addGold", -spell.cost);
        context.commit("addSpell", spell);
      }
    }
  },
  modules: {}
});
