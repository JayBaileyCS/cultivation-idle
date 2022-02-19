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
          levelCostXP={state.upgrades.meditation.levelCostXP}
        />
      </div>
      <div className="upgradeChiCost">
        Chi Cost: {Math.round(state.upgrades.meditation.upgradeCost)}
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
        {Math.round(props.currentXP)} / {Math.round(props.levelCostXP)}
      </div>
      <div className="upgradeBarRectangle">
        <Canvas
          width={UPGRADE_BAR_WIDTH}
          height={UPGRADE_BAR_HEIGHT}
          draw={(ctx) => [
            drawRectangle(ctx, 2, 30, UPGRADE_BAR_WIDTH, 30, "white"),
            drawRectangle(ctx, 2, 30, UPGRADE_BAR_WIDTH / 2, 30, "lightblue"),
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
      onClick={() => levelUpUpgrade(props)}
    >
      {"+"}
    </button>
  );
}

function levelUpUpgrade(upgrade) {
  if (state.resources.chi.currentChi >= state.upgrades.meditation.upgradeCost) {
    state.resources.chi.currentChi -= state.upgrades.meditation.upgradeCost;
    state.upgrades.meditation.level += 1;
    state.upgrades.meditation.upgradeCost =
      upgradeValues.Meditation.upgradeCost *
      (state.upgrades.meditation.level + 1) ** 2;
    state.upgrades.meditation.currentEffectSize =
      upgradeValues.Meditation.effectMagnitude **
      state.upgrades.meditation.level;
  }
}

function getUpgradeFillBarWidth(props) {
  return (props.currentXP / props.levelCostXP) * UPGRADE_BAR_WIDTH;
}
