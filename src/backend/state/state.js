import {
  amplificationUpgrade,
  learningUpgrade,
  meditationUpgrade,
  insightUpgrade,
  reinforcementUpgrade,
} from "./upgrades";

export let state = {
  resources: {
    chi: { currentChi: 80, chiPerSecond: 2, maxChi: 100 },
  },
  advancement: { stage: 1, level: 1 },
  mainArea: "currentArea",
  testMode: false, // TODO: Remove before production
  upgrades: [
    meditationUpgrade,
    learningUpgrade,
    amplificationUpgrade,
    insightUpgrade,
    reinforcementUpgrade,
  ],
};
