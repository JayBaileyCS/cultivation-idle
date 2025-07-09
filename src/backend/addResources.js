import { GAME_LOOP_PER_SECOND } from "../constants";
import { stageValues } from "./state/stages";
import { state } from "./state/state";
import { upgradeRegistry } from "./upgrades";

export function addResources(state) {
  let stageValue = stageValues[state.advancement.stage - 1];
  calculateChi(stageValue);
  calculateXP(state.upgrades);
  state.resources.chi.currentChi = addChi(state.resources.chi);
  return state;
}

function calculateChi(stageValue) {
  state.resources.chi.chiPerSecond = calculateChiPerSecond(stageValue);
  state.resources.chi.maxChi = calculateMaxChi(stageValue);
}

function calculateChiPerSecond(stageValue) {
  let chiPerSecond =
    stageValue.baseChiPerSecond *
    stageValue.baseChiPerSecondIncrease ** (state.advancement.level - 1);
  
  // Apply all chi-affecting upgrades
  const chiUpgrades = upgradeRegistry.getUpgradesByResourceType("chi");
  for (const upgrade of chiUpgrades) {
    const upgradeState = state.upgrades[upgrade.index];
    if (upgradeState.chiLevel > 0) {
      // Copy current state to the upgrade class instance
      Object.assign(upgrade, upgradeState);
      chiPerSecond = upgrade.applyEffect(chiPerSecond);
      // Copy calculated effect back to state
      upgradeState.currentEffectSize = upgrade.currentEffectSize;
    }
  }
  
  return chiPerSecond;
}


function calculateMaxChi(stageValue) {
  return (
    stageValue.baseMaxChi *
    stageValue.baseMaxChiIncrease ** (state.advancement.level - 1)
  );
}

function calculateXP(upgrades) {
  // Get XP-affecting upgrades
  const xpUpgrades = upgradeRegistry.getUpgradesByResourceType("xp");
  const learningUpgrade = xpUpgrades.find(u => u.name === "Learning");
  const reinforcementUpgrade = xpUpgrades.find(u => u.name === "Reinforcement");
  
  // Calculate learning rate
  const learningState = state.upgrades[learningUpgrade.index];
  Object.assign(learningUpgrade, learningState);
  let learningRate = learningUpgrade.calculateEffect();
  learningState.currentEffectSize = learningUpgrade.currentEffectSize;
  
  // Calculate reinforcement and apply to all upgrades
  const reinforcementState = state.upgrades[reinforcementUpgrade.index];
  Object.assign(reinforcementUpgrade, reinforcementState);
  
  for (let i = 0; i < upgrades.length; i++) {
    if (upgrades[i].chiLevel > 0) {
      let baseRate = upgrades[i].baseXPRate * learningRate;
      upgrades[i].currentXPRate = reinforcementUpgrade.applyReinforcementEffect(baseRate, upgrades[i].chiLevel);
    }
  }
  
  reinforcementState.currentEffectSize = reinforcementUpgrade.currentEffectSize;
}

function addChi(chi) {
  let chiToAdd = (chi.chiPerSecond + 3) / GAME_LOOP_PER_SECOND; // TODO: Remove +3 when early game mechanic added.
  if (state.testMode) {
    chiToAdd *= 100; // TODO: Remove before production
  }
  return Math.min(chi.maxChi, chi.currentChi + chiToAdd);
}

