import { LocalhostUrl } from '../../components/Urls.js';
import { user } from '../../stores/userStore.js';

export async function checkSession() {
    try {
        const response = await fetch(LocalhostUrl + '/profile', {
            credentials: 'include',
        });

        if (response.ok) {
            const responseData = await response.json();
            const { id, username, email, role } = responseData.data;

            user.set({ isLoggedIn: true, user: { id, username, email, role } });
        } else if (response.status === 401) {
            console.log('No active session');
            user.set({ isLoggedIn: false, user: null });
        } else {
            console.error('Error fetching profile data');
        }
    } catch (error) {
        console.error('There was a problem checking the session:', error);
    }
}
