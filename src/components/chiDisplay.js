import { calculateAdvancement } from "../backend/advancement";
import { Canvas, drawCircle } from "../helpers";
import { stageValues } from "../backend/state/stages";
import { displayNumber } from "../helpers/numberDisplay";

const CHI_ORB_RADIUS = 45;
const ADVANCEMENT_TOOLTIP =
  "Consumes all of your chi, but in return advances you to the next stage of cultivation. This unlocks new features and abilities, and increases chi generation by 10% per stage.";
const DAY_IN_SECONDS = 86400;
const HOUR_IN_SECONDS = 3600;
const MINUTE_IN_SECONDS = 60;

export function ChiDisplay(props) {
  // Displays chi orb, current chi, max chi, chi generation rate, and current stage + level of advancement.
  return (
    <div className="chiDisplay">
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
      Chi: {displayNumber(props.chi.currentChi, true)}/
      {displayNumber(props.chi.maxChi, true)} (
      {displayNumber(props.chi.chiPerSecond, false)}/s)
      <br></br>TEST: +3/s<br></br>
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

function displayTimeToAdvance(currentChi, maxChi, chiPerSecond) {
  let seconds = (maxChi - currentChi) / chiPerSecond;
  let timeToAdvance = "";
  if (seconds > 1000000) {
    return "A long time ";
  }
  if (seconds > DAY_IN_SECONDS) {
    let days = Math.floor(seconds / DAY_IN_SECONDS);
    seconds -= DAY_IN_SECONDS * days;
    timeToAdvance += `${days.toString()}d `;
  }
  if (seconds > HOUR_IN_SECONDS) {
    let hours = Math.floor(seconds / HOUR_IN_SECONDS);
    seconds -= HOUR_IN_SECONDS * hours;
    timeToAdvance += `${hours.toString()}h `;
  }
  if (seconds > MINUTE_IN_SECONDS) {
    let minutes = Math.floor(seconds / MINUTE_IN_SECONDS);
    seconds -= MINUTE_IN_SECONDS * minutes;
    timeToAdvance += `${minutes.toString()}m `;
  }
  timeToAdvance += `${Math.floor(seconds).toString()}s `;
  return timeToAdvance;
}
