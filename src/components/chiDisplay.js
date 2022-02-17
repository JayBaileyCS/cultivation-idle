import { Canvas, drawCircle } from "../helpers";

const CHI_ORB_RADIUS = 25;

function getChiCircleRadius(props) {
  return Math.ceil((props.chi / props.maxChi) * CHI_ORB_RADIUS);
}

export function ChiDisplay(props) {
  return (
    <div>
      <div className="chiOrb">
        <Canvas
          width={80}
          height={80}
          draw={(ctx) => [
            drawCircle(ctx, 50, 50, 25, "white", "black", 2),
            drawCircle(ctx, 50, 50, getChiCircleRadius(props), "blue"),
          ]}
        />
      </div>
      <div className="chiNumbers">
        <p className="chiNumbers">
          {props.chi}/{props.maxChi} ({props.chiPerSecond}/s)
        </p>
      </div>
    </div>
  );
}
