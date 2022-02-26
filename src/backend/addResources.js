import { GAME_LOOP_PER_SECOND } from "../constants";
import { stageValues } from "./state/stages";
import { state } from "./state/state";
import {
  amplificationUpgrade,
  learningUpgrade,
  meditationUpgrade,
  regenerationUpgrade,
  reinforcementUpgrade,
} from "./state/upgrades";

export function addResources(state) {
  let stageValue = stageValues[state.advancement.stage - 1];
  calculateChi(stageValue);
  calculateXP(state.upgrades);
  state.resources.chi.currentChi = addChi(state.resources.chi);
  return state;
}

function calculateChi(stageValue) {
  state.resources.chi.chiPerSecond = calculateChiPerSecond(stageValue);
  state.resources.chi.maxChi = calculateMaxChi(stageValue);
}

function calculateChiPerSecond(stageValue) {
  let meditation = state.upgrades[meditationUpgrade.index];
  let amplification = state.upgrades[amplificationUpgrade.index];
  let regeneration = state.upgrades[regenerationUpgrade.index];
  let chiPerSecond =
    stageValue.baseChiPerSecond *
    stageValue.baseChiPerSecondIncrease ** (state.advancement.level - 1);
  if (meditation.level > 0) {
    chiPerSecond = chiPerSecond * meditation.currentEffectSize;
  }
  if (amplification.level > 0) {
    calculateAmplificationEffect(amplification);
    chiPerSecond = chiPerSecond * amplification.currentEffectSize;
  }
  if (regeneration.level > 0) {
    calculateRegenerationEffect(regeneration);
    chiPerSecond = chiPerSecond * regeneration.currentEffectSize;
  }
  return chiPerSecond;
}

function calculateAmplificationEffect(amplification) {
  let chiRatio = state.resources.chi.currentChi / state.resources.chi.maxChi;
  let currentMagnitude =
    1 + (amplification.currentEffectMagnitude - 1) * amplification.level;
  amplification.currentEffectSize = 1 + (currentMagnitude - 1) * chiRatio;
}

function calculateRegenerationEffect(regeneration) {
  let chiRatio = state.resources.chi.currentChi / state.resources.chi.maxChi;
  let currentMagnitude =
    1 + (regeneration.currentEffectMagnitude - 1) * regeneration.level;
  regeneration.currentEffectSize = 1 + (currentMagnitude - 1) * (1 - chiRatio);
}

function calculateMaxChi(stageValue) {
  return (
    stageValue.baseMaxChi *
    stageValue.baseMaxChiIncrease ** (state.advancement.level - 1)
  );
}

function calculateXP(upgrades) {
  let learningRate = state.upgrades[learningUpgrade.index].currentEffectSize;
  let baseReinforcementRate =
    state.upgrades[reinforcementUpgrade.index].currentEffectSize;
  for (let i = 0; i < upgrades.length; i++) {
    if (upgrades[i].level > 0) {
      let reinforcementRate =
        1 + (baseReinforcementRate - 1) * Math.max(1, upgrades[i].chiLevel);
      upgrades[i].currentXPRate =
        upgrades[i].baseXPRate * learningRate * reinforcementRate;
    }
  }
}

function addChi(chi) {
  let chiToAdd = chi.chiPerSecond / GAME_LOOP_PER_SECOND;
  return Math.min(chi.maxChi, chi.currentChi + chiToAdd);
}
