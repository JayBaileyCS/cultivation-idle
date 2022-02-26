const chiGathering = {
  name: "Chi Gathering",
  index: 0,
  baseChiPerSecond: 2,
  baseMaxChi: 100,
  baseChiPerSecondIncrease: 1.1,
  baseMaxChiIncrease: 2,
};

const foundation = {
  name: "Foundation",
  index: 1,
  baseChiPerSecond: 4,
  baseMaxChi: 100000,
  baseChiPerSecondIncrease: 1.15,
  baseMaxChiIncrease: 3,
};

const core = {
  name: "Core",
  index: 2,
  baseChiPerSecond: 10,
  baseMaxChi: 50000000000,
  baseChiPerSecondIncrease: 1.25,
  baseMaxChiIncrease: 4,
};

export const stageValues = [chiGathering, foundation, core];
