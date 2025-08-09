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
    case "story":
      return (
        <div className="currentArea">{StoryDisplay()}</div>
      );
    case "cultivation":
      return <div className="cultivation">{cultivation(props.state, props.onUpgradeLevelUp)}</div>;
    case "element":
      return <div className="element">(Elemental Aspect) Implement Later</div>;
    case "map":
      return <div className="element">(World Map) Implement Later</div>;
    case "combat":
      return <div className="element">(Combat) Implement Later</div>;
    case "profession":
      return <div className="element">(Profession) Implement Later</div>;
    case "sect":
      return <div className="element">(Sect) Implement Later</div>;
    default:
      return <div className="shouldNotSee">Should Not See</div>;
  }
}
