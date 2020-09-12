import Vue from "vue";
import Vuex from "vuex";
import { User, USER_STAT, BASE_USER, USER_LEVELS } from "@/User.ts";
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
      state.user = { ...state.user, reloadingSpells: [] };
    },
    addReloadingSpell(state, spell: string) {
      if (state.monster) {
        state.user = {
          ...state.user,
          reloadingSpells: [...state.user.reloadingSpells, spell]
        };
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
      state.user = {
        ...state.user,
        reloadingSpells: state.user.reloadingSpells.filter(
          (s: string) => s !== spell
        )
      };
    },
    setLastGoldReward(state, lastGoldReward: number) {
      Vue.set(state.user, "lastGoldReward", lastGoldReward);
    },
    setLastExpReward(state, lastExpReward: number) {
      Vue.set(state.user, "lastExpReward", lastExpReward);
    },
    setLastItemReward(state, item: Item | undefined) {
      Vue.set(state.user, "lastItemReward", item);
    },
    addHealth(state, health: number) {
      state.user.health = Math.min(state.user.HP, state.user.health + health);

      if (state.user.health <= 0) {
        state.user = { ...BASE_USER };
      }
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
        state.user.level += 1;
        state.user.exp = 0;
        state.user.statPoints += 5;
      }
    },
    addGold(state, gold: number) {
      state.user.gold += gold;
    },
    addStatPoints(state, amount: number) {
      state.user.statPoints += amount;
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
      state.user.spells[spell.key] = spell;
    },
    equipSpellByKey(state, spellKey: string) {
      const spell = state.user.spells[spellKey];
      if (
        spell &&
        Object.keys(state.user.equippedSpells).length < state.user.maxSpells
      ) {
        state.user.equippedSpells[spellKey] = spell;
      }
    },
    unequipSpellByKey(state, spellKey: string) {
      delete state.user.equippedSpells[spellKey];
    },
    addItem(state, item: Item) {
      state.user.items.push(item);
    },
    removeItemByName(state, name: string) {
      Vue.set(
        state.user,
        "items",
        state.user.items.filter((item: Item) => item.name !== name)
      );
    },
    equipItemByKey(state, itemKey: string) {
      const item: Item = state.user.items.find(
        (item: Item) => item.key === itemKey
      );
      if (
        item &&
        Object.keys(state.user.equippedItems).length < state.user.inventorySize
      ) {
        Vue.set(state.user, "equippedItems", {
          ...state.user.equippedItems,
          [itemKey]: item
        });
      }
    },
    unequipItemByKey(state, itemKey: string) {
      const equippedItems = { ...state.user.equippedItems };
      delete equippedItems[itemKey];

      Vue.set(state.user, "equippedItems", equippedItems);
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

        context.commit("setLastItemReward", undefined); // Reset item reward.
        const itemRoll = Math.random();
        for (const item of context.state.user.map.items) {
          if (itemRoll <= item.probability) {
            context.commit("addItem", item.item);
            context.commit("setLastItemReward", item.item);
            break;
          }
        }

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
      if (context.state.user.gold >= spell.cost) {
        context.commit("addGold", -spell.cost);
        context.commit("addSpell", spell);
      }
    },
    sellItem(context, item: Item) {
      if (context.state.user.items.includes(item)) {
        context.commit("addGold", item.sellValue);
        context.commit("removeItemByName", item.name);
      }
    }
  },
  modules: {}
});
