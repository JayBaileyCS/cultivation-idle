import { state } from "../../backend/state/state";
import {
  UpgradeBox,
  isUnlocked,
  DisabledUpgradeBox,
} from "./upgrades/upgradeBox";

//TODO: Make a series of upgrade boxes via loop.

export function MainArea(props) {
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
    default:
      return <div className="shouldNotSee">Should Not See</div>;
  }
}
