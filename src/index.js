import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChiDisplay } from "./components/chiDisplay";
import { FeatureMenu } from "./components/featureMenu";
import { MainArea } from "./components/mainArea/mainArea";
import { addResources } from "./backend/addResources";
import { checkUpgrades } from "./backend/checkUpgrades";
import { state } from "./backend/state/state";
import { GAME_LOOP_PER_SECOND } from "./constants";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = state;
  }

  render() {
    addResources(this.state);
    checkUpgrades(this.state.upgrades);
    return (
      <div className="gameDisplay">
        <div className="featureMenu">
          <FeatureMenu advancement={this.state.advancement} />
        </div>
        <div className="mainArea">
          <MainArea state={this.state} />
        </div>
        <div className="chiDisplay">
          <ChiDisplay
            chi={this.state.resources.chi}
            advancement={this.state.advancement}
          />
        </div>
      </div>
    );
  }
}

setInterval(function () {
  ReactDOM.render(<Game />, document.getElementById("root"));
}, 1000 / GAME_LOOP_PER_SECOND);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
