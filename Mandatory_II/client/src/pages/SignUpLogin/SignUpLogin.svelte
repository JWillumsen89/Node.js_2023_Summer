<script>
    import { BaseURL } from '../../components/Urls.js';
    import { writable, get } from 'svelte/store';
    import { user } from '../../stores/userStore.js';
    import { pageTitle } from '../../stores/pageTitleStore.js';
    import { dynamicTitlePart, getFullTitle } from '../../stores/htmlTitleStore.js';
    import { navigate } from 'svelte-navigator';
    import toast, { Toaster } from 'svelte-french-toast';

    $: pageTitle.set($isLogin ? 'Login' : 'Sign up');
    $: dynamicTitlePart.set($pageTitle);
    $: document.title = getFullTitle($dynamicTitlePart);

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
            const response = await fetch(BaseURL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            if (response.ok) {
                const username = /** @type {HTMLInputElement} */ (document.getElementById('username'));
                const password = /** @type {HTMLInputElement} */ (document.getElementById('password'));
                const submitBtn = /** @type {HTMLInputElement} */ (document.getElementById('submit-btn'));

                if (username && password) {
                    username.disabled = true;
                    password.disabled = true;
                    submitBtn.disabled = true;
                }
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
            const response = await fetch(BaseURL + '/profile', {
                credentials: 'include',
            });
            if (response.ok) {
                const responseData = await response.json();
                const userData = responseData.data;

                //Setting the user in the store, so the user can be accessed from any component
                user.set({ isLoggedIn: true, user: userData, avatar: '' });
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
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        try {
            const response = await fetch(BaseURL + '/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
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

<div class="form-container">
    <Toaster />

    <form on:submit={$isLogin ? handleSubmit : handleSignup}>
        <label for="username">Username{$isLogin ? ' or email' : ''}:</label>
        <input type="text" id="username" name="username" required value="Jonathan" />

        {#if !$isLogin}
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required value="test@test.dk" />
        {/if}

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required value="Jonathan123" />

        {#if !$isLogin}
            <label for="passwordConfirmation">Confirm Password:</label>
            <input type="password" id="passwordConfirmation" name="passwordConfirmation" required value="Jonathan123" />
        {/if}

        <button id="submit-btn" type="submit">{$isLogin ? 'Login' : 'Sign up'}</button>
    </form>

    <p>
        {#if $isLogin}
            Haven’t signed up yet? <button class="toggle-form" on:click={toggleForm}>Sign up here!</button>
        {:else}
            Already a member? <button class="toggle-form" on:click={toggleForm}>Login here!</button>
        {/if}
    </p>
</div>

<style>
    .form-container {
        max-width: 400px;
        margin: 80px auto 0;
        padding: 20px;
        background: #2d2d2d;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        margin: 10px 0 5px;
        font-size: 16px;
        font-weight: 600;
        text-align: start;
    }

    input {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #555;
        background-color: #333;
        color: #fff;
        font-size: 14px;
    }

    input:focus {
        border-color: #ff9500;
        outline: none;
        box-shadow: 0 0 3px #ff9500;
    }

    input:disabled {
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(200, 200, 200, 0.1));
        color: #888;
    }

    button {
        margin-top: 15px;
        padding: 10px 20px;
        background-color: #ff9500;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #cc7a00;
    }

    p {
        text-align: center;
        color: #fff;
    }

    button.toggle-form {
        background: none;
        border: none;
        color: #ff9500;
        padding: 0;
        margin: 0;
    }

    @media (max-width: 768px) {
        .form-container {
            margin-top: 20px;
        }
    }
</style>
