import { upgradeValues } from "../../../constants";
import { Canvas, drawRectangle } from "../../../helpers";
import { state } from "../../../backend/state/state";
import "./upgradeBox.css";

const UPGRADE_BAR_WIDTH = 120;
const UPGRADE_BAR_HEIGHT = 20;

export function UpgradeBox(props) {
  let upgrade = props.upgrade;
  // Takes in an upgrade from upgrade values, and creates a box that shows the upgrade's stats to the player.
  // TODO: Figure out how to un-hardcode upgrade.
  return (
    <div className="upgradeBox">
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
        <UpgradeLevelUpButton upgrade={upgrade} />
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
        {props.currentXPRate}/s)
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

function UpgradeLevelUpButton(props) {
  //TODO: Add functionality, dimming if not enough chi.
  return (
    <button
      className="upgradeLevelUpButton"
      onClick={() => increaseLevelUpRate(props)}
    >
      {"+"}
    </button>
  );
}

function increaseLevelUpRate(props) {
  console.log(props.upgrade);
  if (state.resources.chi.currentChi >= props.upgrade.currentInvestmentCost) {
    state.resources.chi.currentChi -= props.upgrade.currentInvestmentCost;
    props.upgrade.currentXPRate += 1;
    props.upgrade.currentInvestmentLevel += 1;
    props.upgrade.currentInvestmentCost =
      props.upgrade.baseInvestmentCost *
      (props.upgrade.currentInvestmentLevel + 1) ** 2;
  }
}

function getUpgradeFillBarWidth(currentXP, currentXPCost) {
  return (currentXP / currentXPCost) * UPGRADE_BAR_WIDTH;
}
