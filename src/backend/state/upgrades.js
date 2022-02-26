export let meditationUpgrade = {
  name: "Meditation",
  index: 0,
  stageRequired: 1,
  advancementLevelRequired: 2,
  level: 0,
  XPLevel: 0,
  chiLevel: 0,
  currentXPInvested: 0,
  baseXPRate: 1,
  currentXPRate: 0,
  currentXPCostIncrease: 1.1,
  currentXPCost: 10,
  baseXPCost: 10,
  currentChiCost: 10,
  baseChiCost: 10,
  currentEffectSize: 1,
  currentEffectMagnitude: 1.1,
  shouldReverse: false,
  effectText: "Chi Generation",
  tooltipFlavor:
    "One of the first skills any new cultivator learns, the cultivator draws in the ambient chi of the universe, separating it into aspects they can use and pulling it into their core.\n\nAdvances chi generation by 10% per level.",
};

export let learningUpgrade = {
  name: "Learning",
  index: 1,
  stageRequired: 1,
  advancementLevelRequired: 3,
  level: 0,
  XPLevel: 0,
  chiLevel: 0,
  currentXPInvested: 0,
  baseXPRate: 1,
  currentXPRate: 0,
  currentXPCostIncrease: 1.15,
  currentXPCost: 20,
  baseXPCost: 10,
  currentChiCost: 20,
  baseChiCost: 20,
  currentEffectSize: 1,
  currentEffectMagnitude: 1.1,
  shouldReverse: false,
  effectText: "XP Generation",
  tooltipFlavor:
    "By studying cultivation texts, a cultivator can improve the rate at which they improve at various essential skills.\n\nIncreases XP generation by 10% per level.",
};

export let insightUpgrade = {
  name: "Insight",
  index: 2,
  stageRequired: 1,
  advancementLevelRequired: 4,
  level: 0,
  XPLevel: 0,
  chiLevel: 0,
  currentXPInvested: 0,
  baseXPRate: 1,
  currentXPRate: 0,
  currentXPCostIncrease: 1.15,
  currentXPCost: 25,
  baseXPCost: 25,
  currentChiCost: 25,
  baseChiCost: 25,
  currentEffectSize: 1,
  currentEffectMagnitude: 1.04,
  shouldReverse: true,
  effectText: "Upgrade Cost",
  tooltipFlavor:
    "To know one thing is to know ten thousand things. By making connections between disparate insights, you make it easier to continue to advance in your cultivation.\n\nReduces chi costs by 4% (multiplicative) per level.",
};

export let amplificationUpgrade = {
  name: "Amplification",
  index: 3,
  stageRequired: 1,
  advancementLevelRequired: 5,
  level: 0,
  XPLevel: 0,
  chiLevel: 0,
  currentXPInvested: 0,
  baseXPRate: 1,
  currentXPRate: 0,
  currentXPCostIncrease: 1.1,
  currentXPCost: 50,
  baseXPCost: 50,
  currentChiCost: 50,
  baseChiCost: 50,
  currentEffectSize: 1,
  currentEffectMagnitude: 1.1,
  shouldReverse: false,
  effectText: "Chi Generation",
  tooltipFlavor:
    "By cycling your existing chi through your meridians, you harness and amplify its power.\n\nIncreases chi generation by up to 10% per level, becoming more powerful as you get closer to maximum chi.",
};

export let reinforcementUpgrade = {
  name: "Reinforcement",
  index: 4,
  stageRequired: 1,
  advancementLevelRequired: 6,
  level: 0,
  XPLevel: 0,
  chiLevel: 0,
  currentXPInvested: 0,
  baseXPRate: 1,
  currentXPRate: 0,
  currentXPCostIncrease: 1.1,
  currentXPCost: 70,
  baseXPCost: 70,
  currentChiCost: 70,
  baseChiCost: 70,
  currentEffectSize: 1,
  currentEffectMagnitude: 1.01,
  shouldReverse: false,
  effectText: "XP per chi level",
  tooltipFlavor:
    "By reinforcing old skills with more developed cultivation techniques, you gain further insights on how to perfect them.\n\nIncreases the XP rate of your skills by 1% per level for each chi level that skill has.",
};

export let regenerationUpgrade = {
  name: "Regeneration",
  index: 5,
  stageRequired: 1,
  advancementLevelRequired: 8,
  level: 0,
  XPLevel: 0,
  chiLevel: 0,
  currentXPInvested: 0,
  baseXPRate: 1,
  currentXPRate: 0,
  currentXPCostIncrease: 1.1,
  currentXPCost: 75,
  baseXPCost: 75,
  currentChiCost: 150,
  baseChiCost: 150,
  currentEffectSize: 1,
  currentEffectMagnitude: 1.1,
  shouldReverse: false,
  effectText: "Chi generation",
  tooltipFlavor:
    "By using the empty space of your dantian to empower your cultivation, you increase your chi regeneration rate the emptier your chi becomes.\n\nIncreases chi generation by up to 10% per level, becoming more powerful as you get closer to minimum chi.",
};
