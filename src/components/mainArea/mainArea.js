export function MainArea(props) {
  switch (props.state.mainArea) {
    case "currentArea":
      return <div className="currentArea">Current Area</div>;
    case "cultivation":
      return <div className="cultivation">Cultivation</div>;
    default:
      return <div className="shouldNotSee">Should Not See</div>;
  }
}
