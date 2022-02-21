import { Canvas, drawRectangle } from "../../../helpers";
import { state } from "../../../backend/state/state";
import { stageValues } from "../../../constants";
import "./upgradeBox.css";

const UPGRADE_BAR_WIDTH = 120;
const UPGRADE_BAR_HEIGHT = 20;

export function UpgradeBox(props) {
  // Takes in an upgrade from upgrade values, and creates a box that shows the upgrade's stats to the player.
  // TODO: Add in disabled option.
  let upgrade = props.upgrade;
  return (
    <div className={"upgradeBox"} title={upgrade.tooltipFlavor}>
      <div className="upgradeInfoRow">
        <div className="upgradeName">{upgrade.name}</div>
        <div className="upgradeLevel">Lv. {upgrade.level}</div>
      </div>
      <div className="upgradeBar">
        <UpgradeBar
          currentXP={upgrade.currentXPInvested}
          currentXPCost={upgrade.currentXPCost}
          currentXPRate={upgrade.currentXPRate}
        />
      </div>
      <div className="upgradeChiCost">
        Chi Cost: {Math.round(upgrade.currentInvestmentCost)}
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

function UpgradeBar(props) {
  return (
    <div>
      <div className="upgradeBarText">
        {Math.round(props.currentXP)} / {Math.round(props.currentXPCost)} (
        {Math.round(props.currentXPRate * 100) / 100}/s)
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
    <div className="disabledUpgradeBox">
      Requires {stageValues[upgrade.stageRequired - 1].name}{" "}
      {upgrade.advancementLevelRequired}
    </div>
  );
}

function UpgradeLevelUpButton(props) {
  return (
    <button
      className="upgradeLevelUpButton"
      onClick={() => increaseLevelUpRate(props)}
    >
      {"+"}
    </button>
  );
}

function DisabledUpgradeLevelUpButton(props) {
  return <button className="disabledUpgradeLevelUpButton">{"+"}</button>;
}

function increaseLevelUpRate(props) {
  console.log(props);
  state.resources.chi.currentChi -= props.upgrade.currentInvestmentCost;
  props.upgrade.currentInvestmentLevel += 1;
  props.upgrade.currentInvestmentCost =
    props.upgrade.baseInvestmentCost *
    (props.upgrade.currentInvestmentLevel + 1) ** 2;
  console.log(props);
}

function getUpgradeFillBarWidth(currentXP, currentXPCost) {
  return (currentXP / currentXPCost) * UPGRADE_BAR_WIDTH;
}

function shouldAllowLevelUp(upgrade) {
  return (
    state.resources.chi.currentChi >= upgrade.currentInvestmentCost &&
    isUnlocked(upgrade)
  );
}

export function isUnlocked(upgrade) {
  return (
    state.advancement.stage >= upgrade.stageRequired &&
    state.advancement.level >= upgrade.advancementLevelRequired
  );
}
