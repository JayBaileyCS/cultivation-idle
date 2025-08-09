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
  
  const storyMessages = getStoryMessages();
  
  if (currentStageName && storyMessages.Advancement?.[currentStageName]?.[currentLevel]) {
    const message = storyMessages.Advancement[currentStageName][currentLevel];
    
    // Check if this message already exists
    const existingMessages = storyManager.getMessages();
    const messageExists = existingMessages.some(msg => 
      msg.category === message.category && 
      msg.desc === message.desc
    );
    
    if (!messageExists) {
      storyManager.addMessage(message);
    }
  }
}
