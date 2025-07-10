import { BaseUpgrade } from "./BaseUpgrade";

export class MeditationUpgrade extends BaseUpgrade {
  constructor() {
    super({
      name: "Meditation",
      index: 0,
      resourceType: "chi",
      stageRequired: 1,
      advancementLevelRequired: 2,
      XPLevel: 0,
      chiLevel: 0,
      currentXPInvested: 0,
      baseXPRate: 1,
      currentXPRate: 0,
      currentXPCostIncrease: 1.1,
      currentXPCost: 10,
      baseXPCost: 10,
      currentChiCost: 20,
      baseChiCost: 20,
      currentEffectSize: 1,
      currentXPMagnitude: 1.15,
      currentChiMagnitude: 1.3,
      shouldReverse: false,
      effectText: "Chi Generation",
      tooltipFlavor:
        "One of the first skills any new cultivator learns, the cultivator draws in the ambient chi of the universe, separating it into aspects they can use and pulling it into their core.\n\nAdvances chi generation by 15% per level.\nMultiplies by 30% when chi is added.",
    });
  }

  // Simple multiplication effect for meditation
  applyEffect(baseValue) {
    return baseValue * this.calculateEffect();
  }
}