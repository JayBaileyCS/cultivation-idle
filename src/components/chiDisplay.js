import { Canvas, drawCircle } from "../helpers";

const CHI_ORB_RADIUS = 45;

function getChiCircleRadius(props) {
  return Math.ceil((props.chi.currentChi / props.chi.maxChi) * CHI_ORB_RADIUS);
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
          {Math.round(props.chi.currentChi)}/{Math.round(props.chi.maxChi)} (
          {Math.round((props.chi.chiPerSecond / 100) * 100)}/s)<br></br>
          {props.stage.stage} {props.stage.level}
        </p>
      </div>
    </div>
  );
}
