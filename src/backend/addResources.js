import { GAME_LOOP_PER_SECOND } from "../constants";
import { stageValues } from "./state/stages";
import { upgradeRegistry } from "./upgrades";

export function addResources(gameState) {
  let stageValue = stageValues[gameState.advancement.stage - 1];
  calculateChi(gameState, stageValue);
  calculateXP(gameState, gameState.upgrades);
  gameState.resources.chi.currentChi = addChi(gameState.resources.chi, gameState);
  return gameState;
}

function calculateChi(gameState, stageValue) {
  gameState.resources.chi.chiPerSecond = calculateChiPerSecond(gameState, stageValue);
  gameState.resources.chi.maxChi = calculateMaxChi(gameState, stageValue);
}

function calculateChiPerSecond(gameState, stageValue) {
  let chiPerSecond =
    stageValue.baseChiPerSecond *
    stageValue.baseChiPerSecondIncrease ** (gameState.advancement.level - 1);
  
  // Apply all chi-affecting upgrades
  const chiUpgrades = upgradeRegistry.getUpgradesByResourceType("chi");
  for (const upgradeTemplate of chiUpgrades) {
    const upgradeState = gameState.upgrades[upgradeTemplate.index];
    if (upgradeState.chiLevel > 0) {
      // Create a fresh upgrade instance to avoid modifying the global template
      const upgradeClass = upgradeRegistry.getUpgradeByName(upgradeTemplate.name);
      const upgrade = Object.create(Object.getPrototypeOf(upgradeClass));
      Object.assign(upgrade, upgradeClass, upgradeState);
      
      // Pass chi values for upgrades that need them (like CyclingUpgrade)
      if (upgrade.name === "Cycling") {
        chiPerSecond = upgrade.applyEffect(chiPerSecond, gameState.resources.chi.currentChi, gameState.resources.chi.maxChi);
      } else {
        chiPerSecond = upgrade.applyEffect(chiPerSecond);
      }
      // Copy calculated effect back to state
      upgradeState.currentEffectSize = upgrade.currentEffectSize;
    }
  }
  
  return chiPerSecond;
}


function calculateMaxChi(gameState, stageValue) {
  return (
    stageValue.baseMaxChi *
    stageValue.baseMaxChiIncrease ** (gameState.advancement.level - 1)
  );
}

function calculateXP(gameState, upgrades) {
  // Get XP-affecting upgrades
  const xpUpgrades = upgradeRegistry.getUpgradesByResourceType("xp");
  const learningUpgrade = xpUpgrades.find(u => u.name === "Learning");
  const reinforcementUpgrade = xpUpgrades.find(u => u.name === "Reinforcement");
  
  // Calculate learning rate
  const learningState = gameState.upgrades[learningUpgrade.index];
  const learningInstance = Object.create(Object.getPrototypeOf(learningUpgrade));
  Object.assign(learningInstance, learningUpgrade, learningState);
  let learningRate = learningInstance.calculateEffect();
  learningState.currentEffectSize = learningInstance.currentEffectSize;
  
  // Calculate reinforcement and apply to all upgrades
  const reinforcementState = gameState.upgrades[reinforcementUpgrade.index];
  const reinforcementInstance = Object.create(Object.getPrototypeOf(reinforcementUpgrade));
  Object.assign(reinforcementInstance, reinforcementUpgrade, reinforcementState);
  
  for (let i = 0; i < upgrades.length; i++) {
    if (upgrades[i].chiLevel > 0) {
      let baseRate = upgrades[i].baseXPRate * learningRate;
      upgrades[i].currentXPRate = reinforcementInstance.applyReinforcementEffect(baseRate, upgrades[i].chiLevel);
    }
  }
  
  reinforcementState.currentEffectSize = reinforcementInstance.currentEffectSize;
}

function addChi(chi, gameState) {
  let chiToAdd = chi.chiPerSecond / GAME_LOOP_PER_SECOND;
  if (gameState.testMode) {
    chiToAdd *= 100; // TODO: Remove before production
  }
  return Math.min(chi.maxChi, chi.currentChi + chiToAdd);
}

