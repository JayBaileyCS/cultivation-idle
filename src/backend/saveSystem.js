import { upgradeRegistry } from "./upgrades";

export function saveGameState(state) {
  try {
    const serializedState = serializeState(state);
    localStorage.setItem('cultivationGame', JSON.stringify(serializedState));
    return true;
  } catch (error) {
    console.error('Failed to save game:', error);
    return false;
  }
}

export function loadGameState() {
  try {
    const saved = localStorage.getItem('cultivationGame');
    return saved ? deserializeState(JSON.parse(saved)) : null;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

export function clearSaveData() {
  try {
    localStorage.removeItem('cultivationGame');
    return true;
  } catch (error) {
    console.error('Failed to clear save data:', error);
    return false;
  }
}

export function exportSaveData(state) {
  try {
    const serializedState = serializeState(state);
    const saveString = JSON.stringify(serializedState, null, 2);
    return saveString;
  } catch (error) {
    console.error('Failed to export save data:', error);
    return null;
  }
}

export function importSaveData(saveString) {
  try {
    const parsedData = JSON.parse(saveString);
    const importedState = deserializeState(parsedData);
    
    // Save the imported state to localStorage
    localStorage.setItem('cultivationGame', JSON.stringify(parsedData));
    
    return importedState;
  } catch (error) {
    console.error('Failed to import save data:', error);
    return null;
  }
}

export function downloadSaveFile(state, filename = 'cultivation-save.json') {
  try {
    const saveString = exportSaveData(state);
    if (!saveString) return false;
    
    const blob = new Blob([saveString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Failed to download save file:', error);
    return false;
  }
}

function serializeState(state) {
  return {
    resources: state.resources,
    advancement: state.advancement,
    mainArea: state.mainArea,
    testMode: state.testMode,
    upgrades: state.upgrades.map(upgrade => ({
      // Save only data properties, not methods
      index: upgrade.index,
      XPLevel: upgrade.XPLevel,
      chiLevel: upgrade.chiLevel,
      currentXPInvested: upgrade.currentXPInvested,
      currentXPRate: upgrade.currentXPRate,
      currentXPCost: upgrade.currentXPCost,
      currentChiCost: upgrade.currentChiCost,
      currentEffectSize: upgrade.currentEffectSize
    }))
  };
}

function deserializeState(savedData) {
  // Recreate upgrade instances from registry
  const upgrades = upgradeRegistry.getAllUpgrades();
  
  // Apply saved data to upgrade instances
  upgrades.forEach((upgrade, index) => {
    const savedUpgrade = savedData.upgrades[index];
    if (savedUpgrade) {
      Object.assign(upgrade, savedUpgrade);
    }
  });
  
  return {
    resources: savedData.resources,
    advancement: savedData.advancement,
    mainArea: savedData.mainArea,
    testMode: savedData.testMode || false,
    upgrades
  };
}