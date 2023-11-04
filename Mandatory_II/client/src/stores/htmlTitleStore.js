// stores/pageTitleStore.js
import { writable } from 'svelte/store';

// Static part of the title
const staticTitlePart = 'Mandatory II';

// Writable store for the dynamic part
export const dynamicTitlePart = writable('');

// Function to get the full title
export function getFullTitle(dynamicPart) {
  return `${staticTitlePart} | ${dynamicPart}`;
}
