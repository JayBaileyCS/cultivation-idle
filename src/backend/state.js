import { upgradeValues } from "../constants";

//TODO: How to stop this becoming impossibly sprawling?

export let state = {
  resources: {
    chi: { currentChi: 80, baseChiPerSecond: 2, baseMaxChi: 100 },
  },
  advancement: { stage: 1, level: 1 },
  mainArea: "currentArea",
  upgrades: {
    meditation: {
      name: "Meditation",
      level: 0,
      currentLevel: 0,
      currentXPInvested: 0,
      levelCostXP: upgradeValues.Meditation.baseCostXP, // XP required to level up
      upgradeCost: upgradeValues.Meditation.upgradeCost, // Chi required to increase chi investment
      currentChiCost: 0,
      currentEffectSize: 1,
    },
  },
};
