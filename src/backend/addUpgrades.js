import { GAME_LOOP_PER_SECOND } from "../constants";
import { connectionUpgrade } from "./state/upgrades";

export function addUpgrades(state) {
  for (let i = 0; i < state.upgrades.length; i++) {
    addUpgradeXP(state.upgrades[i]);
    calculateUpgradeCost(
      state.upgrades[i],
      state.upgrades[connectionUpgrade.index]
    );
  }
}

function addUpgradeXP(upgrade) {
  upgrade.currentXPInvested += upgrade.currentXPRate / GAME_LOOP_PER_SECOND;
  if (upgrade.currentXPInvested >= upgrade.currentXPCost) {
    levelUpUpgrade(upgrade);
  }
}

function calculateUpgradeCost(upgrade, connection) {
  let currentInvestmentCost =
    upgrade.baseInvestmentCost * (upgrade.currentInvestmentLevel + 1) ** 2;
  let connectionMagnitude =
    connection.level > 0
      ? connection.currentEffectMagnitude ** connection.level
      : 1;
  upgrade.currentInvestmentCost =
    currentInvestmentCost * (1 / connectionMagnitude);
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
  upgrade.currentXPInvested = 0;
}
