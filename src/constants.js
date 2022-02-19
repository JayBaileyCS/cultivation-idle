export const GAME_LOOP_PER_SECOND = 50;

export const stageValues = [
  {
    name: "Foundation",
    baseChiPerSecond: 2,
    baseMaxChi: 100,
    baseChiPerSecondIncrease: 1.1,
    baseMaxChiIncrease: 2,
  },
];

export const upgradeValues = {
  Meditation: {
    name: "Meditation",
    stageRequired: 1,
    levelRequired: 2,
    upgradeCost: 10,
    effectMagnitude: 1.1,
    effectText: "Chi generation",
    tooltipFlavor:
      "One of the first skills any new cultivator learns, the cultivator draws in the ambient chi of the universe, separating it into aspects they can use and pulling it into their core.",
    tooltipEffect: "Increases your total chi generation by ",
  },
};
