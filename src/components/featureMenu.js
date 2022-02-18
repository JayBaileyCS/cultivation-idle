import { stageValues } from "../constants";

export function FeatureMenu(props) {
  // Shows the possible features in the upper-left as a series of buttons.
  return (
    <div className="featureMenu">
      <div className="currentAreaButton">
        <MenuButton text="Current Area" />
      </div>
      <div className="upgradeButton">
        {shouldShowMenuButton(props.advancement, 1, 2) ? (
          <MenuButton text="Upgrades" />
        ) : (
          <DisabledMenuButton text={createRequiresAdvancementText(1, 2)} />
        )}
      </div>
      <div className="toImplementButton">
        {shouldShowMenuButton(props.advancement, 1, 3) ? (
          <MenuButton text="Not Yet Implemented" />
        ) : (
          <DisabledMenuButton text={createRequiresAdvancementText(1, 3)} />
        )}
      </div>
    </div>
  );
}

function MenuButton(props) {
  return <button className="menuButton">{props.text}</button>;
}

function DisabledMenuButton(props) {
  return <button className="disabledMenuButton">{props.text}</button>;
}

function shouldShowMenuButton(advancement, requiredStage, requiredLevel) {
  return (
    advancement.stage >= requiredStage && advancement.level >= requiredLevel
  );
}

function createRequiresAdvancementText(requiredStage, requiredLevel) {
  return `${stageValues[requiredStage - 1].name} ${requiredLevel}`;
}
