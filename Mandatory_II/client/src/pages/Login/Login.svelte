<script>
    import { LocalhostUrl } from '../../components/Urls.js';

    async function handleSubmit(event) {
        event.preventDefault();

        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
        };

        const response = await fetch(LocalhostUrl + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        if (response.ok) {
            console.log('Logged in successfully');
            console.log(await response.json());
        } else {
            console.error('Login failed: ', await response.text());
        }
    }

    async function fetchProtectedData() {
        try {
            const response = await fetch(LocalhostUrl + '/protected', {
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Data: ', await response.json());
            } else {
                console.error('Error fetching protected data: ', await response.text());
            }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    }

    async function handleLogout() {
        try {
            const response = await fetch(LocalhostUrl + '/auth/logout', {
                method: 'POST',
                credentials: 'include', // Necessary to include the session cookie
            });
            if (response.ok) {
                console.log('Logged out successfully');
            } else {
                console.error('Logout failed: ', await response.text());
            }
        } catch (error) {
            console.error('Logout error: ', error);
        }
    }

    async function fetchProfileData() {
        try {
            const response = await fetch(LocalhostUrl + '/profile', {
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Profile Data: ', await response.json());
            } else {
                console.error('Error fetching profile data: ', await response.text());
            }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    }

    async function fetchAdminDashboardData() {
        try {
            const response = await fetch(LocalhostUrl + '/admin/dashboard', {
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Admin Dashboard Data: ', await response.json());
            } else {
                console.error('Error fetching admin dashboard data: ', await response.text());
            }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    }
</script>

<h1>Login Page</h1>
<form on:submit={handleSubmit}>
    <div>
        <label for="username">Username or email:</label>
        <input type="text" id="username" name="username" required value="Jonathan" />
    </div>

    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required value="12345" />
    </div>

    <button type="submit">Login</button>
</form>

<!-- Button to Fetch Protected Data -->
<button on:click={fetchProtectedData}>Fetch Protected Data</button>
<button on:click={handleLogout}>Logout</button>

<button on:click={fetchProfileData}>Fetch Profile Data</button>
<button on:click={fetchAdminDashboardData}>Fetch Admin Dashboard Data</button>
