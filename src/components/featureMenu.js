import { state } from "../backend/state";
import { stageValues } from "../constants";

export function FeatureMenu(props) {
  // Shows the possible features in the upper-left as a series of buttons.
  return (
    <div className="featureMenu">
      <div className="currentAreaButton">
        <MenuButton
          text="Current Area"
          onClick={() => swapMainArea("currentArea")}
        />
      </div>
      <div className="cultivateButton">
        {shouldShowMenuButton(props.advancement, 1, 2) ? (
          <MenuButton
            text="Cultivation"
            onClick={() => swapMainArea("cultivation")}
          />
        ) : (
          <DisabledMenuButton
            text={createRequiresAdvancementText(props.advancement, 1, 2)}
          />
        )}
      </div>
      <div className="toImplementButton">
        {shouldShowMenuButton(props.advancement, 1, 3) ? (
          <MenuButton
            text="Not Yet Implemented"
            onClick={() => swapMainArea("notYetImplemented")}
          />
        ) : (
          <DisabledMenuButton
            text={createRequiresAdvancementText(props.advancement, 1, 3)}
          />
        )}
      </div>
      <div className="toImplementButton2">
        {shouldShowMenuButton(props.advancement, 2, 3) ? (
          <MenuButton text="Should Not See This" />
        ) : (
          <DisabledMenuButton
            text={createRequiresAdvancementText(props.advancement, 2, 3)}
          />
        )}
      </div>
    </div>
  );
}

function MenuButton(props) {
  return (
    <button className="menuButton" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

function DisabledMenuButton(props) {
  return <button className="disabledMenuButton">{props.text}</button>;
}

function swapMainArea(screen) {
  state.mainArea = screen;
  return;
}

function shouldShowMenuButton(advancement, requiredStage, requiredLevel) {
  return (
    advancement.stage >= requiredStage && advancement.level >= requiredLevel
  );
}

function createRequiresAdvancementText(
  advancement,
  requiredStage,
  requiredLevel
) {
  if (advancement.stage === requiredStage) {
    return `${stageValues[requiredStage - 1].name} ${requiredLevel}`;
  }
  return `Unknown`;
}
