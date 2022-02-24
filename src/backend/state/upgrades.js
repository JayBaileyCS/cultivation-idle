export let meditationUpgrade = {
  name: "Meditation",
  index: 0,
  stageRequired: 1,
  advancementLevelRequired: 2,
  level: 0,
  currentChiCost: 10,
  baseChiCost: 10,
  currentEffectSize: 1,
  currentEffectMagnitude: 1.25,
  shouldReverse: false,
  effectText: "Chi Generation",
  tooltipFlavor:
    "One of the first skills any new cultivator learns, the cultivator draws in the ambient chi of the universe, separating it into aspects they can use and pulling it into their core.\n\nAdvances chi generation by 25% per level.",
};

export let insightUpgrade = {
  name: "Insight",
  index: 1,
  stageRequired: 1,
  advancementLevelRequired: 3,
  level: 0,
  currentChiCost: 25,
  baseChiCost: 25,
  currentEffectSize: 1,
  currentEffectMagnitude: 1.05,
  shouldReverse: true,
  effectText: "Upgrade Cost",
  tooltipFlavor:
    "To know one thing is to know ten thousand things. By making connections between disparate insights, you make it easier to continue to advance in your cultivation.\n\nReduces chi costs by 5% (multiplicative) per level.",
};

export let amplificationUpgrade = {
  name: "Amplification",
  index: 2,
  stageRequired: 1,
  advancementLevelRequired: 2,
  level: 0,
  currentChiCost: 40,
  baseChiCost: 40,
  currentEffectSize: 1,
  currentEffectMagnitude: 1.2,
  shouldReverse: false,
  effectText: "Chi Generation",
  tooltipFlavor:
    "By cycling your existing chi through your meridians, you harness and amplify its power.\n\nIncreases chi generation by 10% to 20% per level based on current maximum chi. (10% per level at 0 chi, 15% at half max chi, 20% at full chi)",
};
