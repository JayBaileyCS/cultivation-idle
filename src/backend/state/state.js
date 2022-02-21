import { learningUpgrade, meditationUpgrade } from "./upgrades";

//TODO: Should we change state management?
export let state = {
  resources: {
    chi: { currentChi: 80, chiPerSecond: 2, maxChi: 100 },
  },
  advancement: { stage: 1, level: 1 },
  mainArea: "currentArea",
  upgrades: [meditationUpgrade, learningUpgrade],
};
