import { insightUpgrade } from "./state/upgrades";

export function checkUpgrades(upgrades) {
  let insight = upgrades[insightUpgrade.index];
  for (let i = 0; i < upgrades.length; i++) {
    upgrades[i].currentChiCost = calculateUpgradeCost(upgrades[i], insight);
  }
}

function calculateUpgradeCost(upgrade, insight) {
  let currentChiCost = upgrade.baseChiCost * (upgrade.level + 1) ** 2;
  return currentChiCost * insight.currentEffectSize;
}
