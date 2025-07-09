import { GAME_LOOP_PER_SECOND } from "../constants";
import { insightUpgrade } from "./state/upgrades";
import { state } from "./state/state";
import { upgradeRegistry } from "./upgrades";

export function addUpgrades(state) {
  for (let i = 0; i < state.upgrades.length; i++) {
    addUpgradeXP(state.upgrades[i]);
    calculateUpgradeCost(
      state.upgrades[i],
      state.upgrades[insightUpgrade.index]
    );
  }
}

function addUpgradeXP(upgrade) {
  let xpToAdd = upgrade.currentXPRate / GAME_LOOP_PER_SECOND;
  if (state.testMode) {
    xpToAdd *= 10; // TODO: Remove before production
  }
  upgrade.currentXPInvested += xpToAdd;
  if (upgrade.currentXPInvested >= upgrade.currentXPCost) {
    levelUpUpgrade(upgrade, "XP");
  }
}

function calculateUpgradeCost(upgrade, insight) {
  let currentChiCost = upgrade.baseChiCost * 2 ** upgrade.chiLevel;
  let insightMagnitude = 1;
  if (insight.chiLevel > 0) {
    // Copy state to insight upgrade class and calculate effect
    Object.assign(insightUpgrade, insight);
    insightMagnitude = insightUpgrade.calculateEffect();
    insight.currentEffectSize = insightUpgrade.currentEffectSize;
  }
  upgrade.currentChiCost = currentChiCost * (1 / insightMagnitude);
}

export function levelUpUpgrade(upgrade, source) {
  if (source === "XP") {
    upgrade.XPLevel += 1;
    upgrade.currentXPInvested = 0;
    upgrade.currentXPCost = Math.round(
      upgrade.currentXPCost +
        upgrade.baseXPCost *
          upgrade.currentXPCostIncrease ** Math.max(1, upgrade.XPLevel - 1)
    );
  }
  if (source === "chi") {
    upgrade.chiLevel += 1;
    state.resources.chi.currentChi -= upgrade.currentChiCost;
    if (upgrade.currentXPRate === 0) {
      upgrade.currentXPRate = upgrade.baseXPRate;
    }
  }

  // Use the upgrade class to calculate effect
  const upgradeClass = upgradeRegistry.getUpgradeByIndex(upgrade.index);
  Object.assign(upgradeClass, upgrade);
  upgrade.currentEffectSize = upgradeClass.calculateEffect();
  if (upgrade.shouldReverse === true) {
    upgrade.currentEffectSize = 1 / upgrade.currentEffectSize;
  }
}
