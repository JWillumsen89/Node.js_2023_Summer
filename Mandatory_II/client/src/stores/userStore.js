import { writable } from 'svelte/store';

export const user = writable({ isLoggedIn: false, user: null, avatar: '' });
