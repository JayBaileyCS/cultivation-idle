import { upgradeValues } from "../../../constants";
import { Canvas, drawRectangle } from "../../../helpers";
import { state } from "../../../backend/state";

const UPGRADE_BAR_WIDTH = 120;
const UPGRADE_BAR_HEIGHT = 30;

export function UpgradeBox(props) {
  console.log(props);
  // Takes in an upgrade from upgrade values, and creates a box that shows the upgrade's stats to the player.
  // TODO: Figure out how to un-hardcode upgrade.
  return (
    <div className="upgradeBox">
      <div className="upgradeName">{state.upgrades.meditation.name}</div>
      <div className="upgradeLevel">
        Lv. {state.upgrades.meditation.upgradeLevel}
      </div>
      <div className="upgradeBar">
        <UpgradeBar
          currentXP={state.upgrades.meditation.currentXPInvested}
          levelCostXP={state.upgrades.meditation.levelCostXP}
        />
      </div>
      <div className="chiCost">
        Chi Cost:{" "}
        {Math.round(state.upgrades.meditation.currentChiCost * 100) / 100}
        /second
      </div>
      <div className="plusButton">
        <CostButton props={state.upgrades.meditation} plus={true} />
      </div>
      <div className="minusButton">
        <CostButton props={state.upgrades.meditation} plus={false} />
      </div>
      <div className="effect">
        x{Math.round(state.upgrades.meditation.currentEffectSize * 100) / 100}{" "}
        {upgradeValues.Meditation.effectText}
      </div>
    </div>
  );
}

export function UpgradeBar(props) {
  return (
    <div>
      <div className="upgradeBarBorder"></div>;
      <div className="upgradeBarText">
        {Math.round(props.currentXP)} / {Math.round(props.levelCostXP)}
      </div>
      <div className="upgradeBarFill">
        <Canvas
          width={UPGRADE_BAR_WIDTH}
          height={UPGRADE_BAR_HEIGHT}
          draw={(ctx) =>
            drawRectangle(ctx, 2, 30, UPGRADE_BAR_WIDTH, 30, "lightblue")
          }
        />
      </div>
    </div>
  );
}

export function CostButton(props) {
  //TODO: Add functionality
  let buttonText = props.plus ? "+" : "-";
  return <button className="costButton">{buttonText}</button>;
}

export function getUpgradeFillBarWidth(props) {
  return (props.currentXP / props.levelCostXP) * UPGRADE_BAR_WIDTH;
}
