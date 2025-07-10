import { BaseUpgrade } from "./BaseUpgrade";

export class LearningUpgrade extends BaseUpgrade {
  constructor() {
    super({
      name: "Learning",
      index: 1,
      resourceType: "xp",
      stageRequired: 1,
      advancementLevelRequired: 2,
      XPLevel: 0,
      chiLevel: 0,
      currentXPInvested: 0,
      baseXPRate: 1,
      currentXPRate: 0,
      currentXPCostIncrease: 1.1,
      currentXPCost: 20,
      baseXPCost: 20,
      currentChiCost: 40,
      baseChiCost: 40,
      currentEffectSize: 1,
      currentXPMagnitude: 1.15,
      currentChiMagnitude: 1.3,
      shouldReverse: false,
      effectText: "XP Generation",
      tooltipFlavor:
        "By studying cultivation texts, a cultivator can improve the rate at which they improve at various essential skills.\n\nIncreases XP generation by 15% per level.\nMultiplies by 30% when chi is added.",
    });
  }

  // Simple multiplication effect for learning
  applyEffect(baseValue) {
    return baseValue * this.calculateEffect();
  }
}