import { upgradeValues } from "../../constants";
import { UpgradeBox } from "./upgrades/upgradeBox";

export function MainArea(props) {
  switch (props.state.mainArea) {
    case "currentArea":
      return <div className="currentArea">Current Area</div>;
    case "cultivation":
      return (
        <div className="cultivation">
          <UpgradeBox upgrade={upgradeValues.Meditation} />
        </div>
      );
    default:
      return <div className="shouldNotSee">Should Not See</div>;
  }
}
