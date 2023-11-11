import { BaseURL } from '../../components/Urls.js';
import { user } from '../../stores/userStore.js';

export async function checkSession() {
    try {
        const response = await fetch(BaseURL + '/profile', {
            credentials: 'include',
        });

        if (response.ok) {
            const responseData = await response.json();
            const { id, username, email, role, createdAt, updatedAt } = responseData.data;

            user.set({ isLoggedIn: true, user: { id, username, email, role, createdAt, updatedAt }, avatar: '' });
        } else if (response.status === 401) {
            console.log('No active session');
            user.set({ isLoggedIn: false, user: null, avatar: '' });
        } else {
            console.error('Error fetching profile data');
        }
    } catch (error) {
        console.error('There was a problem checking the session:', error);
    }
}
