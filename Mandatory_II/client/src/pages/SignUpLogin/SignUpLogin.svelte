<script>
    import { LocalhostUrl } from '../../components/Urls.js';
    import { writable, get } from 'svelte/store';
    import { user } from '../../stores/userStore.js';
    import { navigate } from 'svelte-navigator';
    import toast, { Toaster } from 'svelte-french-toast';

    const isLogin = writable(true);

    const currentUser = get(user);

    if (currentUser.isLoggedIn) {
        navigate('/', { replace: true });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
        };
        try {
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
                toast.success('Successfully logged in!');
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 1000);
            } else {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            const errorMessage = JSON.parse(error.message);
            if (errorMessage && errorMessage.error) {
                toast.error(errorMessage.error);
            } else {
                toast.error('An unknown error occurred');
            }
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

    async function handleSignup(event) {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;
        const passwordConfirmation = event.target.passwordConfirmation.value;
        const email = event.target.email.value;

        if (password !== passwordConfirmation) {
            console.error('Passwords do not match!');
            toast.error('Passwords do not match!');
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
                toast.success('Successfully signed up!');
                isLogin.set(true);
            } else {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            const errorMessage = JSON.parse(error.message);
            if (errorMessage && errorMessage.error) {
                toast.error(errorMessage.error);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    }

    function toggleForm() {
        isLogin.update(value => !value);
    }
</script>

<h1>{$isLogin ? 'Login Page' : 'Signup Page'}</h1>
<Toaster />

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
            <input type="password" id="password" name="password" required value="123Jonathan" />
        </div>

        {#if !$isLogin}
            <div>
                <label for="passwordConfirmation">Confirm Password:</label>
                <input type="password" id="passwordConfirmation" name="passwordConfirmation" required value="123Jonathan" />
            </div>
        {/if}
    </div>
    <button type="submit">{$isLogin ? 'Login' : 'Signup'}</button>
</form>

<p>
    {#if $isLogin}
        Haven’t signed up yet? <button on:click={toggleForm}>Sign up here!</button>
    {:else}
        Already a member? <button on:click={toggleForm}>Login here!</button>
    {/if}
</p>
