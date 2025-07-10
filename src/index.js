import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChiDisplay } from "./components/chiDisplay";
import { FeatureMenu } from "./components/featureMenu";
import { MainArea } from "./components/mainArea/mainArea";
import { addResources } from "./backend/addResources";
import { state } from "./backend/state/state";
import { addUpgrades } from "./backend/addUpgrades";
import { GAME_LOOP_PER_SECOND } from "./constants";
import { saveGameState, loadGameState, importSaveData, clearSaveData, downloadSaveFile } from "./backend/saveSystem";
import { upgradeRegistry } from "./backend/upgrades";

class Game extends React.Component {
  constructor(props) {
    super(props);
    const savedState = loadGameState();
    this.state = savedState || state;
  }

  componentDidMount() {
    this.gameInterval = setInterval(() => {
      this.updateGameState();
    }, 1000 / GAME_LOOP_PER_SECOND);

    this.saveInterval = setInterval(() => {
      saveGameState(this.state);
    }, 30000);

    this.beforeUnloadHandler = () => {
      saveGameState(this.state);
    };
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  componentWillUnmount() {
    clearInterval(this.gameInterval);
    clearInterval(this.saveInterval);
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  loadSave = () => {
    const loadedState = loadGameState();
    if (loadedState) {
      this.setState(loadedState);
      console.log('Save loaded successfully');
    } else {
      console.log('No save found');
    }
  };

  importSave = (saveString) => {
    const importedState = importSaveData(saveString);
    if (importedState) {
      this.setState(importedState);
      console.log('Save imported successfully');
      return true;
    }
    return false;
  };

  clearSave = () => {
    // Clear from localStorage
    clearSaveData();
    
    // Reset component state to start of game
    // Create fresh upgrade instances to avoid polluted state
    const freshUpgrades = upgradeRegistry.getAllUpgrades().map(upgradeTemplate => {
      const upgradeClass = upgradeTemplate.constructor;
      return new upgradeClass();
    });
    
    const initialState = {
      resources: {
        chi: { currentChi: 80, chiPerSecond: 2, maxChi: 100 },
      },
      advancement: { stage: 1, level: 1 },
      mainArea: "currentArea",
      testMode: false,
      upgrades: freshUpgrades,
    };
    this.setState(initialState);
    this.saveInterval = setInterval(() => {
      saveGameState(this.state);
    }, 30000);
    console.log('Save data cleared');
  };

  exportSave = () => {
    downloadSaveFile(this.state, "cultivation-idle-save.json");
  };

  handleAdvancement = () => {
    this.setState(prevState => {
      const newState = { ...prevState };
      if (newState.advancement.level < 9) {
        newState.advancement.level = newState.advancement.level + 1;
      } else {
        newState.advancement.level = 1;
        newState.advancement.stage += 1;
      }
      newState.resources.chi.currentChi = 0;
      return newState;
    });
  };

  handleUpgradeLevelUp = (upgradeIndex) => {
    this.setState(prevState => {
      const newState = { ...prevState };
      const upgrade = newState.upgrades[upgradeIndex];
      
      // Check if player has enough chi
      if (newState.resources.chi.currentChi >= upgrade.currentChiCost) {
        // Deduct chi cost
        newState.resources.chi.currentChi -= upgrade.currentChiCost;
        
        // Level up the upgrade
        upgrade.chiLevel += 1;
        if (upgrade.currentXPRate === 0) {
          upgrade.currentXPRate = upgrade.baseXPRate;
        }
        
        // Recalculate effect using upgrade class
        const upgradeTemplate = upgradeRegistry.getUpgradeByName(upgrade.name);
        const upgradeInstance = Object.create(Object.getPrototypeOf(upgradeTemplate));
        Object.assign(upgradeInstance, upgradeTemplate, upgrade);
        upgrade.currentEffectSize = upgradeInstance.calculateEffect();
        if (upgrade.shouldReverse === true) {
          upgrade.currentEffectSize = 1 / upgrade.currentEffectSize;
        }
      }
      
      return newState;
    });
  };

  handleAreaSwap = (screen) => {
    this.setState(prevState => ({
      ...prevState,
      mainArea: screen
    }));
  };

  updateGameState = () => {
    this.setState(prevState => {
      // Create a new state object with updates
      const newState = { ...prevState };
      addResources(newState);
      addUpgrades(newState);
      return newState;
    });
  };
  

  render() {
    return (
      <div className="gameDisplay">
        <div className="featureMenu">
          <FeatureMenu 
            advancement={this.state.advancement}
            onExportSave={this.exportSave}
            onImportSave={this.importSave}
            onClearSave={this.clearSave}
            onAreaSwap={this.handleAreaSwap}
          />
        </div>
        <div className="mainArea">
          <MainArea state={this.state} onUpgradeLevelUp={this.handleUpgradeLevelUp} />
        </div>
        <div className="chiDisplay">
          <ChiDisplay
            chi={this.state.resources.chi}
            advancement={this.state.advancement}
            onAdvancement={this.handleAdvancement}
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
reportWebVitals(console.log);
