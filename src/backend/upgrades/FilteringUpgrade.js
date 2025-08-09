import { BaseUpgrade } from "./BaseUpgrade";
import { displayNumber } from "../../helpers/numberDisplay";

export class FilteringUpgrade extends BaseUpgrade {
  constructor() {
    super({
      name: "Filtering",
      index: 5,
      resourceType: "chi",
      stageRequired: 1,
      advancementLevelRequired: 8,
      XPLevel: 0,
      chiLevel: 0,
      currentXPInvested: 0,
      baseXPRate: 1,
      currentXPRate: 0,
      currentXPCostIncrease: 1.15,
      currentXPCost: 750,
      baseXPCost: 750,
      currentChiCost: 8000,
      baseChiCost: 8000,
      currentEffectSize: 1,
      currentXPMagnitude: 1.05,
      currentChiMagnitude: 1.10,
      shouldReverse: false,
      effectText: "% Chi Collected",
      tooltipFlavor:
        "As you enhance your cultivation, more and more of the world's ambient chi is suitable to be added into your dantian.\n\nIncreases the amount of environmental chi you collect by 5% per level.\nIncreases effect size by 10% per chi level when chi is added.\nStarts at 1% of environmental chi collected, and caps at 100%.",
    });
  }

  applyEffect(baseValue) {
    return baseValue * Math.min(this.calculateEffect(), 100);
  }

  displayEffect() {
    let effectSize = Math.min(this.calculateEffect(), 100)
    let text = displayNumber(effectSize, false) + this.effectText;
    if (effectSize >= 100) {
      text = text + " [CAP]"
    }
    return text

  }  
}