import { GAME_LOOP_PER_SECOND, stageValues, upgradeValues } from "../constants";
import { state } from "./state";

export function addResources(state) {
  let stageValue = stageValues[state.advancement.stage - 1];
  calculateChi(stageValue);
  state.resources.chi.currentChi = addChi(state.resources.chi);
  return state;
}

function calculateChi(stageValue) {
  state.resources.chi.chiPerSecond = calculateChiPerSecond(stageValue);
  state.resources.chi.maxChi = calculateMaxChi(stageValue);
}

function calculateChiPerSecond(stageValue) {
  // TODO: Improve...all this.
  let chiPerSecond =
    stageValue.baseChiPerSecond *
    stageValue.baseChiPerSecondIncrease ** (state.advancement.level - 1);
  if (state.upgrades.meditation.level > 0) {
    chiPerSecond = chiPerSecond * state.upgrades.meditation.currentEffectSize;
  }
  return chiPerSecond;
}

function calculateMaxChi(stageValue) {
  return (
    stageValue.baseMaxChi *
    stageValue.baseMaxChiIncrease ** (state.advancement.level - 1)
  );
}

function addChi(chi) {
  let chiToAdd = chi.chiPerSecond / GAME_LOOP_PER_SECOND;
  return Math.min(chi.maxChi, chi.currentChi + chiToAdd);
}
