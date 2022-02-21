import { state } from "../../backend/state/state";
import {
  UpgradeBox,
  isUnlocked,
  DisabledUpgradeBox,
} from "./upgrades/upgradeBox";

export function MainArea(props) {
  // TODO: Add CSS for cultivation case.
  switch (props.state.mainArea) {
    case "currentArea":
      return <div className="currentArea">Current Area</div>;
    case "cultivation":
      return state.upgrades.map((upgrade) =>
        isUnlocked(upgrade) ? (
          <UpgradeBox key={upgrade.name} upgrade={upgrade} />
        ) : (
          <DisabledUpgradeBox key={upgrade.name} upgrade={upgrade} />
        )
      );
    case "featureThree":
      return <div className="featureThree">Implement Later</div>;
    default:
      return <div className="shouldNotSee">Should Not See</div>;
  }
}
