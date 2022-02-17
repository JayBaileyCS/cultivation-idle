import { GAME_LOOP_PER_SECOND } from "../constants";

export function addResources(state) {
  state.resources.chi.currentChi = getNewChiAmount(state.resources.chi);
  return state;
}

function getNewChiAmount(chi) {
  let chiToAdd = chi.chiPerSecond / GAME_LOOP_PER_SECOND;
  return Math.min(chi.maxChi, chi.currentChi + chiToAdd);
}
