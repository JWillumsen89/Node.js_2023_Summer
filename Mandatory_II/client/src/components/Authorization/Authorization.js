import { LocalhostUrl } from '../../components/Urls.js';
import { get } from 'svelte/store';
import { user } from '../../stores/userStore.js';

export async function checkSession() {
    try {
        const response = await fetch(LocalhostUrl + '/profile', {
            credentials: 'include',
        });
        if (response.ok) {
            const responseData = await response.json();
            const { id, username, email, role } = responseData.data;

            //Setting the user in the store, so the user can be accessed from any component
            user.set({ isLoggedIn: true, user: { id, username, email, role } });
        } else {
            //console.error('Error fetching profile data: ', await response.text());
            console.log('Error fetching profile data: ', await response.text());
        }
    } catch (error) {
        //  console.error('Fetch error: ', error);
        console.log("Some error")
    }
}
