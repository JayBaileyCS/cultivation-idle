import { state } from "../../../backend/state/state";
import { stageValues, NOT_YET_UNLOCKED_TOOLTIP } from "../../../constants";
import "./upgradeBox.css";

export function UpgradeBox(props) {
  // Takes in an upgrade from upgrade values, and creates a box that shows the upgrade's stats to the player.
  let upgrade = props.upgrade;
  return (
    <div className="upgradeBox" title={upgrade.tooltipFlavor}>
      <div className="upgradeInfoRow">
        <div className="upgradeName">{upgrade.name}</div>
        <div className="upgradeLevel">Lv. {upgrade.level}</div>
      </div>
      <div className="upgradeChiCost">
        Chi Cost: {Math.round(upgrade.currentChiCost)}
      </div>
      <div className="upgradeLevelUpButton">
        {shouldAllowLevelUp(upgrade) ? (
          <UpgradeLevelUpButton upgrade={upgrade} />
        ) : (
          <DisabledUpgradeLevelUpButton />
        )}
      </div>
      <div className="upgradeEffect">
        x{Math.round(upgrade.currentEffectSize * 100) / 100}{" "}
        {upgrade.effectText}
      </div>
    </div>
  );
}

export function DisabledUpgradeBox(props) {
  let upgrade = props.upgrade;
  return (
    <div className="disabledUpgradeBox" title={NOT_YET_UNLOCKED_TOOLTIP}>
      <div className="disabledUpgradeText">
        {stageValues[upgrade.stageRequired - 1].name}{" "}
        {upgrade.advancementLevelRequired}
      </div>
    </div>
  );
}

function UpgradeLevelUpButton(props) {
  return (
    <button
      className="upgradeLevelUpButton"
      onClick={() => levelUpUpgrade(props.upgrade)}
    >
      {"+"}
    </button>
  );
}

function DisabledUpgradeLevelUpButton(props) {
  return <button className="disabledUpgradeLevelUpButton">{"+"}</button>;
}

function levelUpUpgrade(upgrade) {
  state.resources.chi.currentChi -= upgrade.currentChiCost;
  upgrade.level += 1;
  let currentEffectSize =
    1 + (upgrade.currentEffectMagnitude - 1) * upgrade.level;
  upgrade.currentEffectSize = upgrade.shouldReverse
    ? 1 / currentEffectSize
    : currentEffectSize;
}

function shouldAllowLevelUp(upgrade) {
  return (
    state.resources.chi.currentChi >= upgrade.currentChiCost &&
    isUnlocked(upgrade)
  );
}

export function isUnlocked(upgrade) {
  return (
    state.advancement.stage >= upgrade.stageRequired &&
    state.advancement.level >= upgrade.advancementLevelRequired
  );
}
