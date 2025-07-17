export const chiGathering = {
  name: "Chi Gathering",
  index: 0,
  baseChiPerSecond: 5,
  baseMaxChi: 100,
  baseChiPerSecondIncrease: 1.1,
  baseMaxChiIncrease: 3,
};

export const foundation = {
  name: "Foundation",
  index: 1,
  baseChiPerSecond: 10,
  baseMaxChi: 2500000,
  baseChiPerSecondIncrease: 1.15,
  baseMaxChiIncrease: 3,
};

export const core = {
  name: "Core",
  index: 2,
  baseChiPerSecond: 25,
  baseMaxChi: 100000000000,
  baseChiPerSecondIncrease: 1.25,
  baseMaxChiIncrease: 4,
};

export const stageValues = [chiGathering, foundation, core];
