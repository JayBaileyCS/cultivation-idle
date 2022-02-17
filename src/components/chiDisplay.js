import { calculateAdvancement } from "../backend/advancement";
import { Canvas, drawCircle } from "../helpers";

// TODO: Turn divs into React elements.
// TODO: Add Typescript now before it gets harder later.
// TODO: Convert state into its own TS type
// TODO: Add advancement support.

const CHI_ORB_RADIUS = 45;

function getChiCircleRadius(props) {
  return Math.ceil(
    (props.chi.currentChi / props.chi.baseMaxChi) * CHI_ORB_RADIUS
  );
}

function shouldShowBreakthrough(props) {
  return props.chi.currentChi >= props.chi.baseMaxChi;
}

function ChiNumbers(props) {
  return (
    <p className="chiNumbers">
      Chi: {Math.round(props.chi.currentChi)}/{Math.round(props.chi.baseMaxChi)}{" "}
      ({Math.round(props.chi.baseChiPerSecond * 100) / 100}/s)<br></br>
      {props.advancement.stage} {props.advancement.level}
    </p>
  );
}

function AdvancementButton(props) {
  return (
    <button
      className="breakthrough"
      onClick={() => calculateAdvancement(props.chi, props.advancement)}
    >
      Advance
    </button>
  );
}

export function ChiDisplay(props) {
  return (
    <div>
      <div className="chiOrb">
        <Canvas
          width={100}
          height={100}
          draw={(ctx) => [
            drawCircle(ctx, 50, 50, CHI_ORB_RADIUS, "white", "black", 2),
            drawCircle(ctx, 50, 50, getChiCircleRadius(props), "silver"),
          ]}
        />
      </div>
      <div className="chiNumbers">
        <ChiNumbers chi={props.chi} advancement={props.advancement} />
      </div>
      <div className="breakthrough">
        {shouldShowBreakthrough(props) ? (
          <AdvancementButton chi={props.chi} advancement={props.advancement} />
        ) : null}
      </div>
    </div>
  );
}
