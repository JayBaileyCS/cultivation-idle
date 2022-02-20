import { state } from "../../backend/state/state";
import { UpgradeBox } from "./upgrades/upgradeBox";

//TODO: Make a series of upgrade boxes via loop.

export function MainArea(props) {
  switch (props.state.mainArea) {
    case "currentArea":
      return <div className="currentArea">Current Area</div>;
    case "cultivation":
      return (
        <div className="cultivation">
          <UpgradeBox upgrade={state.upgrades[0]} />
        </div>
      );
    default:
      return <div className="shouldNotSee">Should Not See</div>;
  }
}
