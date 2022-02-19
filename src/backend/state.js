import { upgradeValues } from "../constants";

//TODO: How to stop this becoming impossibly sprawling?

export let state = {
  resources: {
    chi: { currentChi: 80, chiPerSecond: 2, maxChi: 100 },
  },
  advancement: { stage: 1, level: 1 },
  mainArea: "currentArea",
  upgrades: {
    meditation: {
      name: "Meditation",
      level: 0,
      currentLevel: 0,
      currentXPInvested: 0,
      upgradeCost: upgradeValues.Meditation.upgradeCost,
      currentEffectSize: 1,
    },
  },
};
