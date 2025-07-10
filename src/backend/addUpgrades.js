import { GAME_LOOP_PER_SECOND } from "../constants";
import { upgradeRegistry } from "./upgrades/UpgradeRegistry";

export function addUpgrades(gameState) {
  const insightUpgrade = upgradeRegistry.getUpgradeByName("Insight");
  for (let i = 0; i < gameState.upgrades.length; i++) {
    addUpgradeXP(gameState.upgrades[i], gameState);
    calculateUpgradeCost(
      gameState.upgrades[i],
      gameState.upgrades[insightUpgrade.index]
    );
  }
}

function addUpgradeXP(upgrade, gameState) {
  let xpToAdd = upgrade.currentXPRate / GAME_LOOP_PER_SECOND;
  if (gameState.testMode) {
    xpToAdd *= 50; // TODO: Remove before production
  }
  upgrade.currentXPInvested += xpToAdd;
  if (upgrade.currentXPInvested >= upgrade.currentXPCost) {
    // Level up XP
    upgrade.XPLevel += 1;
    upgrade.currentXPInvested = 0;
    upgrade.currentXPCost = Math.round(
      upgrade.currentXPCost +
        upgrade.baseXPCost *
          upgrade.currentXPCostIncrease ** Math.max(1, upgrade.XPLevel - 1)
    );
    
    // Recalculate effect using upgrade class
    const upgradeTemplate = upgradeRegistry.getUpgradeByName(upgrade.name);
    const upgradeInstance = Object.create(Object.getPrototypeOf(upgradeTemplate));
    Object.assign(upgradeInstance, upgradeTemplate, upgrade);
    upgrade.currentEffectSize = upgradeInstance.calculateEffect();
    if (upgrade.shouldReverse === true) {
      upgrade.currentEffectSize = 1 / upgrade.currentEffectSize;
    }
  }
}

function calculateUpgradeCost(upgrade, insight) {
  let currentChiCost = upgrade.baseChiCost * 2 ** upgrade.chiLevel;
  let insightMagnitude = 1;
  if (insight.chiLevel > 0) {
    // Copy state to insight upgrade class and calculate effect
    const insightUpgradeTemplate = upgradeRegistry.getUpgradeByName("Insight");
    const insightUpgradeInstance = Object.create(Object.getPrototypeOf(insightUpgradeTemplate));
    Object.assign(insightUpgradeInstance, insightUpgradeTemplate, insight);
    insightMagnitude = insightUpgradeInstance.calculateEffect();
    insight.currentEffectSize = insightUpgradeInstance.currentEffectSize;
  }
  upgrade.currentChiCost = currentChiCost * (1 / insightMagnitude);
}

// Note: levelUpUpgrade is now handled by the React component for chi leveling
// XP leveling is handled directly in addUpgradeXP function
