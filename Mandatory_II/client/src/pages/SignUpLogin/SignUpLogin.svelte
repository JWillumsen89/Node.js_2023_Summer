<script>
    import { LocalhostUrl } from '../../components/Urls.js';
    import { writable, get } from 'svelte/store';
    import { user } from '../../stores/userStore.js';
    import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';

    const isLogin = writable(true);

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
            fetchProfileData();
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
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Logged out successfully');
                user.set({ isLoggedIn: false, user: null });
                const currentUser = get(user);
                console.log('Logged out - User data is null: ', currentUser);
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
                const responseData = await response.json();
                const { id, username, email, role } = responseData.data;

                //Setting the user in the store, so the user can be accessed from any component
                user.set({ isLoggedIn: true, user: { id, username, email, role } });

                const currentUser = get(user);
                console.log('Logged in - User data: ', currentUser);
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

    async function handleSignup(event) {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;
        const passwordConfirmation = event.target.passwordConfirmation.value;
        const email = event.target.email.value;

        if (password !== passwordConfirmation) {
            console.error('Passwords do not match!');
            return;
        }

        const data = {
            username: username,
            password: password,
            email: email,
        };

        try {
            const response = await fetch(LocalhostUrl + '/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Signed up successfully');
                console.log('Return data: ', responseData);
            } else {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    }

    function toggleForm() {
        isLogin.update(value => !value);
    }
</script>

<h1>{$isLogin ? 'Login Page' : 'Signup Page'}</h1>

<form on:submit={$isLogin ? handleSubmit : handleSignup}>
    <div>
        <div>
            <label for="username">Username{$isLogin ? ' or email' : ''}:</label>
            <input type="text" id="username" name="username" required value="Jonathan" />
        </div>

        {#if !$isLogin}
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required value="test@test.dk" />
            </div>
        {/if}

        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required value="12345" />
        </div>

        {#if !$isLogin}
            <div>
                <label for="passwordConfirmation">Confirm Password:</label>
                <input type="password" id="passwordConfirmation" name="passwordConfirmation" required value="12345" />
            </div>
        {/if}
    </div>
    <button type="submit">{$isLogin ? 'Login' : 'Signup'}</button>
</form>

<p>
    {#if $isLogin}
        Haven’t signed up yet? <button on:click={toggleForm}>Sign up here</button>.
    {:else}
        Already a member? <button on:click={toggleForm}>Login here</button>.
    {/if}
</p>

{#if $isLogin}
    <button on:click={fetchProtectedData}>Fetch Protected Data</button>
    <button on:click={handleLogout}>Logout</button>
    <button on:click={fetchProfileData}>Fetch Profile Data</button>
    <button on:click={fetchAdminDashboardData}>Fetch Admin Dashboard Data</button>
{/if}
