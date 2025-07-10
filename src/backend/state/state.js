import { upgradeRegistry } from "../upgrades";
import { loadGameState } from "../saveSystem";

// Default state with fresh upgrade instances
const createDefaultState = () => {
  const freshUpgrades = upgradeRegistry.getAllUpgrades().map(upgradeTemplate => {
    const upgradeClass = upgradeTemplate.constructor;
    return new upgradeClass();
  });
  
  return {
    resources: {
      chi: { currentChi: 80, chiPerSecond: 2, maxChi: 100 },
    },
    advancement: { stage: 1, level: 1 },
    mainArea: "currentArea",
    testMode: false, // TODO: Remove before production
    upgrades: freshUpgrades,
  };
};

const defaultState = createDefaultState();

// Load saved state or use default
const savedState = loadGameState();
export let state = savedState || defaultState;