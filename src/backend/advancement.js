import { state } from "./state/state";
import { storyManager } from "../components/story/displayStory";
import { stageValues } from "./state/stages";
import { getStoryMessages } from "../components/story/storyLoader";

export function calculateAdvancement(advancement) {
  if (state.advancement.level < 9) {
    state.advancement.level = advancement.level + 1;
  } else {
    state.advancement.level = 1;
    state.advancement.stage += 1;
  }
  state.resources.chi.currentChi = 0;
  
  // Add story message if advancement occurred
  const currentStageName = stageValues[state.advancement.stage - 1]?.name;
  const currentLevel = state.advancement.level;
  
  console.log('Advancement debug:', {
    stage: state.advancement.stage,
    currentStageName,
    currentLevel,
    stageValues: stageValues[state.advancement.stage]
  });
  
  const storyMessages = getStoryMessages();
  console.log('Story messages loaded:', storyMessages);
  
  if (currentStageName && storyMessages.Advancement?.[currentStageName]?.[currentLevel]) {
    const message = storyMessages.Advancement[currentStageName][currentLevel];
    console.log('Adding story message:', message);
    storyManager.addMessage(message);
  } else {
    console.log('No story message found for:', currentStageName, currentLevel);
  }
}
