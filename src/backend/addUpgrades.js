import { GAME_LOOP_PER_SECOND } from "../constants";
import { insightUpgrade } from "./state/upgrades";

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
  upgrade.currentXPInvested += upgrade.currentXPRate / GAME_LOOP_PER_SECOND;
  if (upgrade.currentXPInvested >= upgrade.currentXPCost) {
    levelUpUpgrade(upgrade);
  }
}

function calculateUpgradeCost(upgrade, insight) {
  let currentInvestmentCost =
    upgrade.baseInvestmentCost * (upgrade.currentInvestmentLevel + 1) ** 2;
  let insightMagnitude =
    insight.level > 0 ? insight.currentEffectMagnitude ** insight.level : 1;
  upgrade.currentInvestmentCost =
    currentInvestmentCost * (1 / insightMagnitude);
}

export function levelUpUpgrade(upgrade) {
  upgrade.level += 1;
  if (upgrade.level > 1) {
    upgrade.currentXPCost = Math.round(
      upgrade.currentXPCost +
        upgrade.baseXPCost *
          upgrade.currentXPCostIncrease ** (upgrade.level - 1)
    );
  }
  upgrade.currentEffectSize =
    1 + (upgrade.currentEffectMagnitude - 1) * upgrade.level;
  if (upgrade.shouldReverse === true) {
    upgrade.currentEffectSize = 1 / upgrade.currentEffectSize;
  }
  upgrade.currentXPInvested = 0;
}
