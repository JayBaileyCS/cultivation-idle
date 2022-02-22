import { calculateAdvancement } from "../backend/advancement";
import { Canvas, drawCircle } from "../helpers";
import { stageValues } from "../constants";

const CHI_ORB_RADIUS = 45;
const ADVANCEMENT_TOOLTIP =
  "Consumes all of your chi, but in return advances you to the next stage of cultivation. This unlocks new features and abilities, and increases chi generation by 10% per stage.";

export function ChiDisplay(props) {
  // Displays chi orb, current chi, max chi, chi generation rate, and current stage + level of advancement.
  //TODO: Add leading zeroes, like 2.00/s
  return (
    <div>
      <div className="chiOrb">
        <Canvas
          width={100}
          height={100}
          draw={(ctx) => [
            drawCircle(ctx, 50, 50, CHI_ORB_RADIUS, "white", "black", 2), // Border
            drawCircle(ctx, 50, 50, getChiCircleRadius(props), "silver"), // Inner chi orb
          ]}
        />
      </div>
      <div className="chiNumbers">
        <ChiNumbers chi={props.chi} advancement={props.advancement} />
      </div>
      <div className="advancementButton">
        {shouldShowAdvancement(props) ? (
          <AdvancementButton chi={props.chi} advancement={props.advancement} />
        ) : (
          <DisabledAdvancementButton chi={props.chi} />
        )}
      </div>
    </div>
  );
}

function getChiCircleRadius(props) {
  // Gets the radius of the filled chi orb, based on the percentage of max chi the player has.
  return Math.ceil((props.chi.currentChi / props.chi.maxChi) * CHI_ORB_RADIUS);
}

function shouldShowAdvancement(props) {
  // Show the opportunity to advance stages if the player is at max chi. This is a function since we may change it later.
  return props.chi.currentChi >= props.chi.maxChi;
}

function ChiNumbers(props) {
  return (
    <p className="chiNumbers">
      Chi: {Math.round(props.chi.currentChi)}/{Math.round(props.chi.maxChi)} (
      {Math.round(props.chi.chiPerSecond * 100) / 100}/s)<br></br>
      {stageValues[props.advancement.stage - 1].name} {props.advancement.level}
    </p>
  );
}

function AdvancementButton(props) {
  return (
    <button
      className="advancementButton"
      title={ADVANCEMENT_TOOLTIP}
      onClick={() => calculateAdvancement(props.advancement)}
    >
      Advance
    </button>
  );
}

function DisabledAdvancementButton(props) {
  return (
    <button className="disabledAdvancementButton" title={ADVANCEMENT_TOOLTIP}>
      Advance
    </button>
  );
}
