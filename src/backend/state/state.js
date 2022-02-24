import {
  amplificationUpgrade,
  meditationUpgrade,
  insightUpgrade,
} from "./upgrades";

export let state = {
  resources: {
    chi: { currentChi: 80, chiPerSecond: 2, maxChi: 100 },
  },
  advancement: { stage: 1, level: 1 },
  mainArea: "currentArea",
  upgrades: [meditationUpgrade, insightUpgrade, amplificationUpgrade],
};
