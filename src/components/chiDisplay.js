import { Canvas, drawCircle } from "../helpers";

// TODO: Turn divs into React elements.
// TODO: Add Typescript now before it gets harder later.
// TODO: Convert state into its own TS type
// TODO: Add advancement support.

const CHI_ORB_RADIUS = 45;

function getChiCircleRadius(props) {
  return Math.ceil((props.chi.currentChi / props.chi.maxChi) * CHI_ORB_RADIUS);
}

function shouldShowBreakthrough(props) {
  return props.chi.currentChi >= props.chi.maxChi;
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
        <p className="chiNumbers">
          Chi: {Math.round(props.chi.currentChi)}/{Math.round(props.chi.maxChi)}{" "}
          ({Math.round((props.chi.chiPerSecond / 100) * 100)}/s)<br></br>
          {props.stage.stage} {props.stage.level}
        </p>
      </div>
      <div className="breakthrough">
        <button
          className="breakthrough"
          display={shouldShowBreakthrough(props)}
        >
          Advance
        </button>
      </div>
    </div>
  );
}
