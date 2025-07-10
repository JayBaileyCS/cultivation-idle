import { BaseUpgrade } from "./BaseUpgrade";

export class InsightUpgrade extends BaseUpgrade {
  constructor() {
    super({
      name: "Insight",
      index: 3,
      resourceType: "cost",
      stageRequired: 1,
      advancementLevelRequired: 4,
      XPLevel: 0,
      chiLevel: 0,
      currentXPInvested: 0,
      baseXPRate: 1,
      currentXPRate: 0,
      currentXPCostIncrease: 1.15,
      currentXPCost: 50,
      baseXPCost: 50,
      currentChiCost: 100,
      baseChiCost: 100,
      currentEffectSize: 1,
      currentXPMagnitude: 1.04,
      currentChiMagnitude: 1.1,
      shouldReverse: true,
      effectText: "Upgrade Cost",
      tooltipFlavor:
        "To know one thing is to know ten thousand things. By making connections between disparate insights, you make it easier to continue to advance in your cultivation.\n\nIncreases effect size by 4% per level.\nMultiplies effect size by 10% when chi is added.",
    });
  }

  // Insight uses shouldReverse to reduce costs (1/effectSize)
  applyEffect(baseValue) {
    return baseValue / this.calculateEffect();
  }
}