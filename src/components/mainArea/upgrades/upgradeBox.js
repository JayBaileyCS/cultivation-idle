import { Canvas, drawRectangle } from "../../../helpers";
import { state } from "../../../backend/state/state";
import { stageValues, NOT_YET_UNLOCKED_TOOLTIP } from "../../../constants";
import { levelUpUpgrade } from "../../../backend/addUpgrades";
import "./upgradeBox.css";
import { displayNumber } from "../../../helpers/numberDisplay";

const UPGRADE_BAR_WIDTH = 120;
const UPGRADE_BAR_HEIGHT = 20;

export function UpgradeBox(props) {
  // Takes in an upgrade from upgrade values, and creates a box that shows the upgrade's stats to the player.
  let upgrade = props.upgrade;
  return (
    <div className="upgradeBox" title={upgrade.tooltipFlavor}>
      <div className="upgradeInfoRow">
        <div className="upgradeName">{upgrade.name}</div>
        <div className="upgradeLevel">
          Lv. {displayNumber(upgrade.level, true)}
        </div>
      </div>
      <div className="upgradeBar">
        <UpgradeBar
          currentXP={upgrade.currentXPInvested}
          currentXPCost={upgrade.currentXPCost}
          currentXPRate={upgrade.currentXPRate}
        />
      </div>
      <div className="upgradeLevelUp">
        <div className="upgradeChiCost">
          Chi Cost: {displayNumber(upgrade.currentChiCost, true)}
        </div>
        <div className="upgradeLevelUpBtn">
          {shouldAllowLevelUp(upgrade) ? (
            <UpgradeLevelUpButton upgrade={upgrade} />
          ) : (
            <DisabledUpgradeLevelUpButton />
          )}
        </div>
        <div className="chiUpgradesDone">({upgrade.chiLevel})</div>
        <div className="upgradeEffect">
          x{displayNumber(upgrade.currentEffectSize, false)}{" "}
          {upgrade.effectText}
        </div>
      </div>
    </div>
  );
}

function UpgradeBar(props) {
  return (
    <div>
      <div className="upgradeBarText">
        {displayNumber(props.currentXP, true)} /{" "}
        {displayNumber(props.currentXPCost, true)} XP (
        {displayNumber(props.currentXPRate, false)}/s)
      </div>
      <div className="upgradeBarRectangle">
        <Canvas
          width={UPGRADE_BAR_WIDTH}
          height={UPGRADE_BAR_HEIGHT}
          draw={(ctx) => [
            drawRectangle(
              ctx,
              0,
              0,
              UPGRADE_BAR_WIDTH,
              30,
              "white",
              "black",
              2
            ),
            drawRectangle(
              ctx,
              0,
              0,
              getUpgradeFillBarWidth(props.currentXP, props.currentXPCost),
              30,
              "silver",
              "black",
              0
            ),
          ]}
        />
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
      onClick={() => levelUpUpgrade(props.upgrade, "chi")}
    >
      {"+"}
    </button>
  );
}

function DisabledUpgradeLevelUpButton(props) {
  return <button className="disabledUpgradeLevelUpButton">{"+"}</button>;
}

function getUpgradeFillBarWidth(currentXP, currentXPCost) {
  return (currentXP / currentXPCost) * UPGRADE_BAR_WIDTH;
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
