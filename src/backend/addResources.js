import { GAME_LOOP_PER_SECOND } from "../constants";

export function addResources(state) {
  state.resources.chi.currentChi = addChi(state.resources.chi);
  return state;
}

function addChi(chi) {
  let chiToAdd = chi.baseChiPerSecond / GAME_LOOP_PER_SECOND;
  return Math.min(chi.baseMaxChi, chi.currentChi + chiToAdd);
}
