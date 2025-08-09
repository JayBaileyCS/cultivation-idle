import { NOT_YET_UNLOCKED_TOOLTIP } from "../constants";
import { stageValues } from "../backend/state/stages";
import { SaveControls } from "./saveControls";

const STORY_TOOLTIP = "Read the story of your journey.";
const CULTIVATION_TOOLTIP = "Improve your cultivation.";
const ELEMENTAL_TOOLTIP = "This feature is not yet implemented.";
const MAP_TOOLTIP = "This feature is not yet implemented.";
const COMBAT_TOOLTIP = "This feature is not yet implemented.";
const PROFESSION_TOOLTIP = "This feature is not yet implemented.";
const SECT_TOOLTIP = "This feature is not yet implemented";

export function FeatureMenu(props) {
  // Shows the possible features in the upper-left as a series of buttons.
  return (
    <div className="featureMenu">
      <div className="storyButton">
        <MenuButton
          text="Story"
          title={STORY_TOOLTIP}
          onClick={() => props.onAreaSwap("story")}
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
      <div className="elementButton">
        {shouldShowMenuButton(props.advancement, 2, 1) ? (
          <MenuButton
            text="Elements (TBD)"
            title={ELEMENTAL_TOOLTIP}
            onClick={() => props.onAreaSwap("element")}
          />
        ) : (
          <DisabledMenuButton text={createRequiresAdvancementText(2, 1)} />
        )}
      </div>
      <div className="mapButton">
        {shouldShowMenuButton(props.advancement, 2, 1) ? (
          <MenuButton
            text="World Map (TBD)"
            title={MAP_TOOLTIP}
            onClick={() => props.onAreaSwap("map")}
          />
        ) : (
          <DisabledMenuButton text={createRequiresAdvancementText(2, 1)} />
        )}
      </div>
      <div className="combatButton">
        {shouldShowMenuButton(props.advancement, 2, 2) ? (
          <MenuButton 
            text="Combat (TBD)"
            title={COMBAT_TOOLTIP}
            onClick={() => props.onAreaSwap("combat")}
          />
        ) : (
          <DisabledMenuButton text={createRequiresAdvancementText(2, 2)} />
        )}
      </div>
      <div className="professionButton">
        {shouldShowMenuButton(props.advancement, 3, 1) ? (
          <MenuButton 
            text="Professions (TBD)"
            title={PROFESSION_TOOLTIP}
            onClick={() => props.onAreaSwap("profession")}
          />
        ) : (
          <DisabledMenuButton text={createRequiresAdvancementText(2, 2)} />
        )}
      </div>
      <div className="professionButton">
        {shouldShowMenuButton(props.advancement, 3, 1) ? (
          <MenuButton 
            text="Sect (TBD)"
            title={SECT_TOOLTIP}
            onClick={() => props.onAreaSwap("sect")}
          />
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
