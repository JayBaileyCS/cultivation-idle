import { BaseUpgrade } from "./BaseUpgrade";

export class ReinforcementUpgrade extends BaseUpgrade {
  constructor() {
    super({
      name: "Reinforcement",
      index: 4,
      resourceType: "xp",
      stageRequired: 1,
      advancementLevelRequired: 6,
      XPLevel: 0,
      chiLevel: 0,
      currentXPInvested: 0,
      baseXPRate: 1,
      currentXPRate: 0,
      currentXPCostIncrease: 1.1,
      currentXPCost: 70,
      baseXPCost: 70,
      currentChiCost: 150,
      baseChiCost: 150,
      currentEffectSize: 1,
      currentXPMagnitude: 1.01,
      currentChiMagnitude: 1.02,
      shouldReverse: false,
      effectText: "XP Per Chi Level",
      tooltipFlavor:
        "By reinforcing old skills with more developed cultivation techniques, you gain further insights on how to perfect them.\n\nIncreases the XP rate of your skills by 1% per level for each chi level that skill has.\nIncreases effect size by 2% per chi level when chi is added.",
    });
  }

  // Reinforcement has a special effect that multiplies based on chi levels
  applyReinforcementEffect(baseValue, chiLevel) {
    let reinforcementRate = 1 + (this.calculateEffect() - 1) * Math.max(1, chiLevel);
    return baseValue * reinforcementRate;
  }
}