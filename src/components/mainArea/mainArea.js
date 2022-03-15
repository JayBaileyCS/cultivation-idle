import { state } from "../../backend/state/state";
import {
  UpgradeBox,
  isUnlocked,
  DisabledUpgradeBox,
} from "./upgrades/upgradeBox";
import { CultivationBox } from "./cultivationBox";

let cultivation = () =>
  state.upgrades.map((upgrade) =>
    isUnlocked(upgrade) ? (
      <UpgradeBox key={upgrade.name} upgrade={upgrade} />
    ) : (
      <DisabledUpgradeBox key={upgrade.name} upgrade={upgrade} />
    )
  );

const CURRENT_AREA_BARS = [
  { currentChi: 10, maxChi: 10, barWidth: 60, x: 300, y: 300 },
  { currentChi: 30, maxChi: 30, barWidth: 120, x: 400, y: 400 },
];

let currentAreaBars = () =>
  CURRENT_AREA_BARS.map((bar) => (
    <CultivationBox
      key={bar.index}
      currentChi={bar.currentChi}
      maxChi={bar.currentChi}
      width={bar.width}
      x={bar.x}
      y={bar.y}
    ></CultivationBox>
  ));

export function MainArea(props) {
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
