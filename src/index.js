import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChiDisplay } from "./components/chiDisplay";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chi: 80,
      chiPerSecond: 2,
      maxChi: 100,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="chiDisplay">
          <ChiDisplay
            chi={this.state.chi}
            chiPerSecond={this.state.chiPerSecond}
            maxChi={this.state.maxChi}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
