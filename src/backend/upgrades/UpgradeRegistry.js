import { MeditationUpgrade } from "./MeditationUpgrade";
import { LearningUpgrade } from "./LearningUpgrade";
import { CyclingUpgrade } from "./CyclingUpgrade";
import { InsightUpgrade } from "./InsightUpgrade";
import { ReinforcementUpgrade } from "./ReinforcementUpgrade";

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

  // Get upgrade by name
  getUpgradeByName(name) {
    return this.upgrades.find(upgrade => upgrade.name === name);
  }
}

// Export singleton instance
export const upgradeRegistry = new UpgradeRegistry();