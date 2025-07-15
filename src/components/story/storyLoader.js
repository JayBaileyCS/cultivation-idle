import { storyMessages } from './storyMessages.js';

export async function loadStoryMessages() {
    console.log('Story messages loaded:', storyMessages);
    return storyMessages;
}

export function getStoryMessages() {
    return storyMessages;
}