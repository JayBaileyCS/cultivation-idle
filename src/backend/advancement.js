import { stages } from "../constants";
import { state } from "./state";

export function calculateAdvancement(chi, advancement) {
  state.advancement.level = advancement.level + 1;
  setBaseChi(state.advancement.level);
}

function setBaseChi(newLevel) {
  let currentStage = stages.foundation;
  state.resources.chi.baseChiPerSecond =
    currentStage.baseChiPerSecond *
    currentStage.baseChiPerSecondIncrease ** (newLevel - 1);
  state.resources.chi.baseMaxChi =
    currentStage.baseMaxChi * currentStage.baseMaxChiIncrease ** (newLevel - 1);
  state.resources.chi.currentChi = 0;
}
