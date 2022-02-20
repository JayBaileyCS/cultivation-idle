import { upgradeValues } from "../../../constants";
import { Canvas, drawRectangle } from "../../../helpers";
import { state } from "../../../backend/state";
import "./upgradeBox.css";

const UPGRADE_BAR_WIDTH = 120;
const UPGRADE_BAR_HEIGHT = 20;

export function UpgradeBox(props) {
  // Takes in an upgrade from upgrade values, and creates a box that shows the upgrade's stats to the player.
  // TODO: Figure out how to un-hardcode upgrade.
  // TODO: Actually study some CSS properly.
  // TODO: Move to an experience based system.
  // TODO: Get upgrade bar to work.
  return (
    <div className="upgradeBox">
      <div className="upgradeInfoRow">
        <div className="upgradeName">{state.upgrades.meditation.name}</div>
        <div className="upgradeLevel">
          Lv. {state.upgrades.meditation.level}
        </div>
      </div>
      <div className="upgradeBar">
        <UpgradeBar
          currentXP={state.upgrades.meditation.currentXPInvested}
          currentXPCost={state.upgrades.meditation.currentXPCost}
          currentXPRate={state.upgrades.meditation.currentXPRate}
        />
      </div>
      <div className="upgradeChiCost">
        Chi Cost: {Math.round(state.upgrades.meditation.currentInvestmentCost)}
      </div>
      <div className="upgradeLevelUpButton">
        <UpgradeLevelUpButton props={state.upgrades.meditation} plus={true} />
      </div>
      <div className="upgradeEffect">
        x{Math.round(state.upgrades.meditation.currentEffectSize * 100) / 100}{" "}
        {upgradeValues.Meditation.effectText}
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
  console.log("Hi");
  if (
    state.resources.chi.currentChi >=
    state.upgrades.meditation.currentInvestmentCost
  ) {
    state.resources.chi.currentChi -=
      state.upgrades.meditation.currentInvestmentCost;
    state.upgrades.meditation.currentXPRate += 1;
    state.upgrades.meditation.currentInvestmentLevel += 1;
    state.upgrades.meditation.currentInvestmentCost =
      upgradeValues.Meditation.chiUpgradeCost *
      (state.upgrades.meditation.currentInvestmentLevel + 1) ** 2;
  }
}

function getUpgradeFillBarWidth(currentXP, currentXPCost) {
  return (currentXP / currentXPCost) * UPGRADE_BAR_WIDTH;
}
