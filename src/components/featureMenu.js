import { NOT_YET_UNLOCKED_TOOLTIP } from "../constants";
import { stageValues } from "../backend/state/stages";
import { SaveControls } from "./saveControls";

const CURRENT_AREA_TOOLTIP = "Explore the current area.";
const CULTIVATION_TOOLTIP = "Improve your cultivation.";
const FEATURE_THREE_TOOLTIP = "This feature is not yet implemented.";

export function FeatureMenu(props) {
  // Shows the possible features in the upper-left as a series of buttons.
  return (
    <div className="featureMenu">
      <div className="currentAreaButton">
        <MenuButton
          text="Current Area"
          title={CURRENT_AREA_TOOLTIP}
          onClick={() => props.onAreaSwap("currentArea")}
        />
      </div>
      <div className="cultivateButton">
        {shouldShowMenuButton(props.advancement, 1, 2) ? (
          <MenuButton
            text="Cultivation"
            title={CULTIVATION_TOOLTIP}
            onClick={() => props.onAreaSwap("cultivation")}
          />
        ) : (
          <DisabledMenuButton text={createRequiresAdvancementText(1, 2)} />
        )}
      </div>
      <div className="toImplementButton">
        {shouldShowMenuButton(props.advancement, 2, 1) ? (
          <MenuButton
            text="Not Yet Implemented"
            title={FEATURE_THREE_TOOLTIP}
            onClick={() => props.onAreaSwap("featureThree")}
          />
        ) : (
          <DisabledMenuButton text={createRequiresAdvancementText(2, 1)} />
        )}
      </div>
      <div className="toImplementButton2">
        {shouldShowMenuButton(props.advancement, 2, 2) ? (
          <MenuButton text="Should Not See This" />
        ) : (
          <DisabledMenuButton text={createRequiresAdvancementText(2, 2)} />
        )}
      </div>
      <div className="saveControlsContainer">
        <SaveControls 
          onExportSave={props.onExportSave}
          onImportSave={props.onImportSave}
          onClearSave={props.onClearSave}
        />
      </div>
    </div>
  );
}

function MenuButton(props) {
  return (
    <button className="menuButton" onClick={props.onClick} title={props.title}>
      {props.text}
    </button>
  );
}

function DisabledMenuButton(props) {
  return (
    <button className="disabledMenuButton" title={NOT_YET_UNLOCKED_TOOLTIP}>
      {props.text}
    </button>
  );
}


function shouldShowMenuButton(advancement, requiredStage, requiredLevel) {
  return (
    advancement.stage > requiredStage ||
    (advancement.stage >= requiredStage && advancement.level >= requiredLevel)
  );
}

function createRequiresAdvancementText(requiredStage, requiredLevel) {
  return `${stageValues[requiredStage - 1].name} ${requiredLevel}`;
}
