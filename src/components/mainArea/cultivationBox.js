import { Canvas, drawRectangle } from "../../helpers";
import { state } from "../../backend/state/state";
import { GAME_LOOP_PER_SECOND } from "../../constants";

const CULTIVATION_BOX_CLICKABLE_TITLE = "Click here to cultivate chi";
const CHI_RATE = 1;

export function CultivationBox(props) {
  return (
    <div className="cultivationBox">
      <div
        className="cultivationBoxClickable"
        title={CULTIVATION_BOX_CLICKABLE_TITLE}
        onClick={collectChi(props.currentChi)}
      ></div>
      <div className="cultivationBoxChiBar">
        <Canvas
          draw={(ctx) => [
            drawRectangle(
              ctx,
              0,
              0,
              props.barWidth,
              props.barWidth / 4,
              "white",
              "black",
              2
            ),
            drawRectangle(
              ctx,
              0,
              0,
              getChiBarWidth(props.currentChi, props.maxChi, props.barWidth),
              getChiBarWidth(props.currentChi, props.maxChi, props.barWidth) /
                4,
              "silver",
              "black",
              0
            ),
          ]}
        />
        {props.currentChi} / {props.maxChi}
      </div>
      <div className="cultivationChiDisplay">
        {props.currentChi} / {props.maxChi}
      </div>
    </div>
  );
}

function getChiBarWidth(currentChi, maxChi, barWidth) {
  return (currentChi / maxChi) * barWidth;
}

function collectChi(currentChi) {
  const chiDifference =
    state.resources.chi.maxChi - state.resources.chi.currentChi;
  currentChi -= Math.min(chiDifference, currentChi);
  state.resources.chi.currentChi += Math.min(chiDifference, currentChi);
}

export function addChi(currentChi, maxChi) {
  if (currentChi < maxChi) {
    this.currentChi += CHI_RATE / GAME_LOOP_PER_SECOND;
  }
}
