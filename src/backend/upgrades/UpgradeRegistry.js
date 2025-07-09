import {
  MeditationUpgrade,
  LearningUpgrade,
  CyclingUpgrade,
  InsightUpgrade,
  ReinforcementUpgrade,
} from "./index";

// Create all upgrade instances
const upgradeInstances = [
  new MeditationUpgrade(),
  new LearningUpgrade(),
  new CyclingUpgrade(),
  new InsightUpgrade(),
  new ReinforcementUpgrade(),
];

export class UpgradeRegistry {
  constructor() {
    this.upgrades = upgradeInstances;
  }

  // Get all upgrades
  getAllUpgrades() {
    return this.upgrades;
  }

  // Get upgrades by resource type
  getUpgradesByResourceType(resourceType) {
    return this.upgrades.filter(upgrade => upgrade.resourceType === resourceType);
  }

  // Get upgrade by index
  getUpgradeByIndex(index) {
    return this.upgrades[index];
  }

  // Get upgrade by name
  getUpgradeByName(name) {
    return this.upgrades.find(upgrade => upgrade.name === name);
  }
}

// Export singleton instance
export const upgradeRegistry = new UpgradeRegistry();