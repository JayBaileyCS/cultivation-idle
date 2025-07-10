import { Canvas, drawRectangle } from "../../../helpers";
import { NOT_YET_UNLOCKED_TOOLTIP } from "../../../constants";
import { stageValues } from "../../../backend/state/stages";
import "./upgradeBox.css";
import { displayNumber } from "../../../helpers/numberDisplay";

const UPGRADE_BAR_WIDTH = 160;
const UPGRADE_BAR_HEIGHT = 20;

export function UpgradeBox(props) {
  // Takes in an upgrade from upgrade values, and creates a box that shows the upgrade's stats to the player.
  let upgrade = props.upgrade;
  return (
    <div className="upgradeBox" title={upgrade.tooltipFlavor}>
      <div className="upgradeInfoRow">
        <div className="upgradeName">{upgrade.name}</div>
        <div className="upgradeLevel">
          Lv. {displayNumber(upgrade.XPLevel, true)}
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
          {shouldAllowLevelUp(upgrade, props.gameState) ? (
            <UpgradeLevelUpButton upgrade={upgrade} onUpgradeLevelUp={props.onUpgradeLevelUp} />
          ) : (
            <DisabledUpgradeLevelUpButton />
          )}
        </div>
        <div className="chiUpgradesDone">
          (x{displayNumber(getChiEffectSize(upgrade), false)})
        </div>
        <div className="upgradeEffect">
          x{displayNumber(upgrade.shouldReverse ? 1 / upgrade.currentEffectSize : upgrade.currentEffectSize, false)}{" "}
          {upgrade.effectText}
        </div>
      </div>
    </div>
  );
}

function UpgradeBar(props) {
  // Calculate responsive font size based on text length
  const xpText = `${displayNumber(props.currentXP, true)} / ${displayNumber(props.currentXPCost, true)} XP (${displayNumber(props.currentXPRate, false)}/s)`;
  const getResponsiveFontSize = (text) => {
    const baseLength = 20; // Approximate character count that fits comfortably
    const maxFontSize = 1; // Current font size (1em)
    const minFontSize = 0.9; // Minimum font size
    
    if (text.length <= baseLength) {
      return maxFontSize;
    }
    
    // Calculate scale factor based on text length
    const scaleFactor = baseLength / text.length;
    return Math.max(minFontSize, maxFontSize * scaleFactor);
  };

  const fontSize = getResponsiveFontSize(xpText);

  return (
    <div>
      <div className="upgradeBarText" style={{ fontSize: `${fontSize}em` }}>
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
      onClick={() => props.onUpgradeLevelUp(props.upgrade.index)}
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

function getChiEffectSize(upgrade) {
  const chiEffectSize =
    1 + (upgrade.currentChiMagnitude - 1) * upgrade.chiLevel;
  return upgrade.shouldReverse ? 1 / chiEffectSize : chiEffectSize;
}

function shouldAllowLevelUp(upgrade, gameState) {
  return (
    gameState.resources.chi.currentChi >= upgrade.currentChiCost &&
    isUnlocked(upgrade, gameState)
  );
}

export function isUnlocked(upgrade, gameState) {
  return (
    gameState.advancement.stage > upgrade.stageRequired ||
    (gameState.advancement.stage >= upgrade.stageRequired &&
      gameState.advancement.level >= upgrade.advancementLevelRequired)
  );
}
