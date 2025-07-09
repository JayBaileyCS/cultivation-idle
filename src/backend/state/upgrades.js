import { upgradeRegistry } from "../upgrades";

// Export upgrade instances from the registry for backward compatibility
export const meditationUpgrade = upgradeRegistry.getUpgradeByIndex(0);
export const learningUpgrade = upgradeRegistry.getUpgradeByIndex(1);
export const amplificationUpgrade = upgradeRegistry.getUpgradeByIndex(2);
export const insightUpgrade = upgradeRegistry.getUpgradeByIndex(3);
export const reinforcementUpgrade = upgradeRegistry.getUpgradeByIndex(4);