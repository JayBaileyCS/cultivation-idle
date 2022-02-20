import { GAME_LOOP_PER_SECOND } from "../constants";

export function addUpgrades(state) {
  for (let i = 0; i < state.upgrades.length; i++) {
    addUpgradeXP(state.upgrades[i]);
  }
}

function addUpgradeXP(upgrade) {
  upgrade.currentXPInvested += upgrade.currentXPRate / GAME_LOOP_PER_SECOND;
  if (upgrade.currentXPInvested >= upgrade.currentXPCost) {
    levelUpUpgrade(upgrade);
  }
}

function levelUpUpgrade(upgrade) {
  upgrade.level += 1;
  upgrade.currentXPCost = Math.round(
    upgrade.currentXPCost +
      upgrade.baseXPCost * upgrade.currentXPRateIncrease ** upgrade.level
  );

  upgrade.currentEffectSize =
    1 + (upgrade.currentEffectMagnitude - 1) * upgrade.level;
  upgrade.currentXPInvested = 0;
}
