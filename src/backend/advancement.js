import { state } from "./state/state";

export function calculateAdvancement(chi, advancement) {
  state.advancement.level = advancement.level + 1;
  state.resources.chi.currentChi = 0;
}
