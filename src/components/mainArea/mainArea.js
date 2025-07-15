import { StoryDisplay } from "../story/displayStory";
import {
  UpgradeBox,
  isUnlocked,
  DisabledUpgradeBox,
} from "./upgrades/upgradeBox";

let cultivation = (gameState, onUpgradeLevelUp) =>
  gameState.upgrades.map((upgrade) =>
    isUnlocked(upgrade, gameState) ? (
      <UpgradeBox key={upgrade.name} upgrade={upgrade} gameState={gameState} onUpgradeLevelUp={onUpgradeLevelUp} />
    ) : (
      <DisabledUpgradeBox key={upgrade.name} upgrade={upgrade} />
    )
  );

export function MainArea(props) {
  switch (props.state.mainArea) {
    case "currentArea":
      return (
        <div className="currentArea">{StoryDisplay()}</div>
      );
    case "cultivation":
      return <div className="cultivation">{cultivation(props.state, props.onUpgradeLevelUp)}</div>;
    case "featureThree":
      return <div className="featureThree">Implement Later</div>;
    default:
      return <div className="shouldNotSee">Should Not See</div>;
  }
}
