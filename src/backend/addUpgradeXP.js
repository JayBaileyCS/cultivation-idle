import { GAME_LOOP_PER_SECOND } from "../constants";
import { upgradeValues } from "../constants";

export function addUpgrades(state) {
  // TODO: Array
  addUpgradeXP(state.upgrades.meditation);
}

function addUpgradeXP(upgrade) {
  upgrade.currentXPInvested += upgrade.currentXPRate / GAME_LOOP_PER_SECOND;
  if (upgrade.currentXPInvested >= upgrade.currentXPCost) {
    levelUpUpgrade(upgrade);
  }
}

function levelUpUpgrade(upgrade) {
  // TODO: Un-hardcode this.
  upgrade.level += 1;
  upgrade.currentXPCost = upgradeValues.Meditation.XPCost * (upgrade.level + 1);
  upgrade.currentEffectSize =
    1 + (upgradeValues.Meditation.effectMagnitude - 1) * upgrade.level;
  upgrade.currentXPInvested = 0;
}
