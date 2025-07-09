import { calculateAdvancement } from "../backend/advancement";
import { Canvas, drawCircle } from "../helpers";
import { stageValues } from "../backend/state/stages";
import { displayNumber } from "../helpers/numberDisplay";
import { amplificationUpgrade } from "../backend/state/upgrades";
import { state } from "../backend/state/state";

const CHI_ORB_RADIUS = 45;
function getAdvancementTooltip(currentStage) {
  const stage = stageValues[currentStage - 1];
  const increasePercentage = Math.round((stage.baseChiPerSecondIncrease - 1) * 100);
  return `Consumes all of your chi, but in return advances you to the next level of cultivation. This unlocks new features and abilities, and increases chi generation by ${increasePercentage}% per level.`;
}
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
          <DisabledAdvancementButton chi={props.chi} advancement={props.advancement} />
        )}
        <TestButton />
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
      <br></br>
      {stageValues[props.advancement.stage - 1].name} {props.advancement.level}
      Time to Advance: {displayTimeToAdvance(props.chi.currentChi, props.chi.maxChi, props.chi.chiPerSecond)}
    </p>
  );
}

function AdvancementButton(props) {
  return (
    <button
      className="advancementButton"
      title={getAdvancementTooltip(props.advancement.stage)}
      onClick={() => calculateAdvancement(props.advancement)}
    >
      Advance
    </button>
  );
}

function DisabledAdvancementButton(props) {
  return (
    <button className="disabledAdvancementButton" title={getAdvancementTooltip(props.advancement.stage)}>
      Advance
    </button>
  );
}

function TestButton() {
  const toggleTestMode = () => {
    state.testMode = !state.testMode;
  };

  return (
    <button
      className={state.testMode ? "testButtonActive" : "testButton"}
      title="Toggle x100 chi generation for testing (TODO: Remove before production)"
      onClick={toggleTestMode}
    >
      Test {state.testMode ? "ON" : "OFF"}
    </button>
  );
}

function displayTimeToAdvance(currentChi, maxChi, chiPerSecond) {
  // Account for Cycling upgrade's variable effect
  let adjustedChiPerSecond = chiPerSecond;
  
  // Check if Cycling upgrade is active
  const cyclingState = state.upgrades[amplificationUpgrade.index];
  if (cyclingState.chiLevel > 0) {
    // Copy current state to cycling upgrade
    Object.assign(amplificationUpgrade, cyclingState);
    
    // Calculate current cycling effect
    const currentCyclingEffect = amplificationUpgrade.calculateEffect();
    
    // Calculate cycling effect at midpoint (currentChi + maxChi / 2)
    const midpointChi = currentChi + (maxChi - currentChi) / 2;
    const midpointCyclingEffect = amplificationUpgrade.calculateEffectForDisplay(midpointChi, maxChi);
    
    // Adjust chiPerSecond based on the ratio between current and midpoint effects
    adjustedChiPerSecond = (chiPerSecond / currentCyclingEffect) * midpointCyclingEffect;
  }
  
  let seconds = (maxChi - currentChi) / adjustedChiPerSecond;
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
