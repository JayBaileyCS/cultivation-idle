import { BaseUpgrade } from "./BaseUpgrade";

export class CyclingUpgrade extends BaseUpgrade {
  constructor() {
    super({
      name: "Cycling",
      index: 2,
      resourceType: "chi",
      stageRequired: 1,
      advancementLevelRequired: 3,
      XPLevel: 0,
      chiLevel: 0,
      currentXPInvested: 0,
      baseXPRate: 1,
      currentXPRate: 0,
      currentXPCostIncrease: 1.1,
      currentXPCost: 30,
      baseXPCost: 30,
      currentChiCost: 50,
      baseChiCost: 50,
      currentEffectSize: 1,
      currentXPMagnitude: 1.15,
      currentChiMagnitude: 1.2,
      shouldReverse: false,
      effectText: "Chi Generation",
      tooltipFlavor:
        "By cycling your existing chi through your meridians, you harness and amplify its power.\n\nIncreases chi generation by 5-15% per level, becoming more powerful as you get closer to minimum chi.\nMultiplies by 20% when chi is added.",
    });
  }

  // Custom effect calculation for cycling (stronger at minimum chi)
  calculateEffect(currentChi, maxChi) {
    if (this.chiLevel > 0) {
      // Use passed chi values or fallback to default ratio
      let chiRatio = 1;
      if (currentChi !== undefined && maxChi !== undefined) {
        chiRatio = (3 - (currentChi / maxChi) * 2) / 3; // 1 when empty, down to 1/3 when full
      }
      let currentMagnitude = this.calculateEffectSize();
      this.currentEffectSize = 1 + (currentMagnitude - 1) * chiRatio;
    }
    return this.currentEffectSize;
  }
  applyEffect(baseValue, currentChi, maxChi) {
    return baseValue * this.calculateEffect(currentChi, maxChi);
  }
}