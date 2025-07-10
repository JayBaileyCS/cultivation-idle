import { state } from "./state/state";

export function calculateAdvancement(advancement) {
  if (state.advancement.level < 9) {
    state.advancement.level = advancement.level + 1;
  } else {
    state.advancement.level = 1;
    state.advancement.stage += 1;
  }
  state.resources.chi.currentChi = 0;
}
