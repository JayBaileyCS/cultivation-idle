
export class BaseUpgrade {
  constructor(upgradeData) {
    Object.assign(this, upgradeData);
    // Resource type should be specified in subclasses
    this.resourceType = upgradeData.resourceType || "unknown";
  }

  calculateEffect() {
    if (this.chiLevel > 0) {
      this.currentEffectSize = this.calculateEffectSize();
    }
    return this.currentEffectSize;
  }

  calculateEffectSize() {
    const XPEffect = 1 + (this.currentXPMagnitude - 1) * this.XPLevel;
    const chiEffect = 1 + (this.currentChiMagnitude - 1) * this.chiLevel;
    return XPEffect * chiEffect;
  }

  // Default effect calculation - override in subclasses
  applyEffect(baseValue) {
    return baseValue * this.calculateEffect();
  }
}