import { GAME_LOOP_PER_SECOND, stageValues } from "../constants";
import { state } from "./state/state";
import { learningUpgrade, meditationUpgrade } from "./state/upgrades";

export function addResources(state) {
  let stageValue = stageValues[state.advancement.stage - 1];
  calculateChi(stageValue);
  let learningRate = state.upgrades[learningUpgrade.index].currentEffectSize;
  calculateXP(state.upgrades, learningRate);
  state.resources.chi.currentChi = addChi(state.resources.chi);
  return state;
}

function calculateChi(stageValue) {
  state.resources.chi.chiPerSecond = calculateChiPerSecond(stageValue);
  state.resources.chi.maxChi = calculateMaxChi(stageValue);
}

function calculateChiPerSecond(stageValue) {
  let meditation = state.upgrades[meditationUpgrade.index];
  let chiPerSecond =
    stageValue.baseChiPerSecond *
    stageValue.baseChiPerSecondIncrease ** (state.advancement.level - 1);
  if (meditation.level > 0) {
    chiPerSecond = chiPerSecond * meditation.currentEffectSize;
  }
  return chiPerSecond;
}

function calculateMaxChi(stageValue) {
  return (
    stageValue.baseMaxChi *
    stageValue.baseMaxChiIncrease ** (state.advancement.level - 1)
  );
}

function calculateXP(upgrades, learningRate) {
  for (let i = 0; i < upgrades.length; i++) {
    let baseRate = (upgrades[i].currentXPRate =
      upgrades[i].baseXPRate * upgrades[i].currentInvestmentLevel);
    upgrades[i].currentXPRate = baseRate * learningRate;
  }
}

function addChi(chi) {
  let chiToAdd = chi.chiPerSecond / GAME_LOOP_PER_SECOND;
  return Math.min(chi.maxChi, chi.currentChi + chiToAdd);
}
