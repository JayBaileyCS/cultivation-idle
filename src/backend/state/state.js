import { upgradeRegistry } from "../upgrades";
import { loadGameState } from "../saveSystem";

// Default state
const defaultState = {
  resources: {
    chi: { currentChi: 80, chiPerSecond: 2, maxChi: 100 },
  },
  advancement: { stage: 1, level: 1 },
  mainArea: "currentArea",
  testMode: false, // TODO: Remove before production
  upgrades: upgradeRegistry.getAllUpgrades(),
};

// Load saved state or use default
const savedState = loadGameState();
export let state = savedState || defaultState;

// Export upgrade instances from the current state for backward compatibility
export const meditationUpgrade = state.upgrades[0];
export const learningUpgrade = state.upgrades[1];
export const amplificationUpgrade = state.upgrades[2];
export const insightUpgrade = state.upgrades[3];
export const reinforcementUpgrade = state.upgrades[4];