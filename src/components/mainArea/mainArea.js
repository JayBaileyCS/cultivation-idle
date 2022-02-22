import { state } from "../../backend/state/state";
import {
  UpgradeBox,
  isUnlocked,
  DisabledUpgradeBox,
} from "./upgrades/upgradeBox";

let cultivation = () =>
  state.upgrades.map((upgrade) =>
    isUnlocked(upgrade) ? (
      <UpgradeBox key={upgrade.name} upgrade={upgrade} />
    ) : (
      <DisabledUpgradeBox key={upgrade.name} upgrade={upgrade} />
    )
  );

export function MainArea(props) {
  // TODO: Add CSS for cultivation case.
  switch (props.state.mainArea) {
    case "currentArea":
      return (
        <div className="currentArea">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Fog_in_a_forest%2C_Telemark_1.jpg/1200px-Fog_in_a_forest%2C_Telemark_1.jpg"></img>
        </div>
      );
    case "cultivation":
      return <div className="cultivation">{cultivation()}</div>;
    case "featureThree":
      return <div className="featureThree">Implement Later</div>;
    default:
      return <div className="shouldNotSee">Should Not See</div>;
  }
}
