import { GAME_LOOP_PER_SECOND } from "../constants";
import { stageValues } from "./state/stages";
import { state } from "./state/state";
import {
  amplificationUpgrade,
  learningUpgrade,
  meditationUpgrade,
  empowerUpgrade,
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
  let empower = state.upgrades[empowerUpgrade.index];
  let chiPerSecond =
    stageValue.baseChiPerSecond *
    stageValue.baseChiPerSecondIncrease ** (state.advancement.level - 1);
  if (meditation.chiLevel > 0) {
    chiPerSecond = chiPerSecond * meditation.currentEffectSize;
  }
  if (empower.chiLevel > 0) {
    chiPerSecond = chiPerSecond * empower.currentEffectSize;
  }
  if (amplification.chiLevel > 0) {
    calculateAmplificationEffect(amplification);
    chiPerSecond = chiPerSecond * amplification.currentEffectSize;
  }
  return chiPerSecond;
}

function calculateAmplificationEffect(amplification) {
  let chiRatio =
    (1 + (state.resources.chi.currentChi / state.resources.chi.maxChi) * 2) / 3; // 1/3 when empty, up to 1 when full.
  let currentMagnitude = calculateEffectSize(amplification);
  amplification.currentEffectSize = 1 + (currentMagnitude - 1) * chiRatio;
}

function calculateMaxChi(stageValue) {
  return (
    stageValue.baseMaxChi *
    stageValue.baseMaxChiIncrease ** (state.advancement.level - 1)
  );
}

function calculateXP(upgrades) {
  let learningRate = state.upgrades[learningUpgrade.index].currentEffectSize;
  let empowerRate = state.upgrades[empowerUpgrade.index].currentEffectSize;
  let baseReinforcementRate =
    state.upgrades[reinforcementUpgrade.index].currentEffectSize;
  for (let i = 0; i < upgrades.length; i++) {
    if (upgrades[i].chiLevel > 0) {
      let reinforcementRate =
        1 + (baseReinforcementRate - 1) * Math.max(1, upgrades[i].chiLevel);
      upgrades[i].currentXPRate =
        upgrades[i].baseXPRate * learningRate * reinforcementRate * empowerRate;
    }
  }
}

function addChi(chi) {
  let chiToAdd = chi.chiPerSecond / GAME_LOOP_PER_SECOND;
  return Math.min(chi.maxChi, chi.currentChi + chiToAdd);
}

export function calculateEffectSize(upgrade) {
  const XPEffect = 1 + (upgrade.currentXPMagnitude - 1) * upgrade.XPLevel;
  const chiEffect = 1 + (upgrade.currentChiMagnitude - 1) * upgrade.chiLevel;
  return XPEffect * chiEffect;
}
