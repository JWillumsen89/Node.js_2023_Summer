<script>
    import { closeModal } from 'svelte-modals';
    import { user } from '../../stores/userStore.js';
    import { get, writable } from 'svelte/store';
    import { notificationStore } from '../../stores/notificationStore.js';
    import { BaseURL } from '../../components/Urls.js';

    export let isOpen;
    export let title;

    let username = '';
    let email = '';

    $: username = $user.isLoggedIn ? formatString($user.user.username) : '';
    $: email = $user.isLoggedIn ? formatString($user.user.email) : '';

    function formatString(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    async function changeUsernameAndEmail(event) {
        event.preventDefault();
        const oldUsername = get(user).user.username;
        const newUsername = event.target.username.value;
        const oldEmail = get(user).user.email;
        const newEmail = event.target.email.value;

        const usernameInput = /** @type {HTMLInputElement} */ (document.getElementById('username'));
        const emailInput = /** @type {HTMLInputElement} */ (document.getElementById('email'));
        const submitBtn = /** @type {HTMLInputElement} */ (document.getElementById('submit-btn'));

        if (usernameInput && emailInput) {
            usernameInput.disabled = true;
            emailInput.disabled = true;
            submitBtn.disabled = true;
        }

        const data = {
            oldUsername,
            newUsername,
            oldEmail,
            newEmail,
        };

        try {
            const response = await fetch(BaseURL + '/auth/edit-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            if (response.ok) {
                notificationStore.set({ message: 'Profile successfully edited!', type: 'success' });
                user.update(currentUser => {
                    currentUser.user.username = formatString(newUsername);
                    currentUser.user.email = formatString(newEmail);
                    currentUser.user.updatedAt = new Date().toISOString();
                    return currentUser;
                });
                closeModal();
            } else {
                usernameInput.disabled = false;
                emailInput.disabled = false;
                submitBtn.disabled = false;
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            usernameInput.disabled = false;
            emailInput.disabled = false;
            submitBtn.disabled = false;
            const errorMessage = JSON.parse(error.message);
            if (errorMessage && errorMessage.error) {
                notificationStore.set({ message: errorMessage.error, type: 'error' });
            } else {
                notificationStore.set({ message: 'An unknown error occurred', type: 'error' });
            }
        }
    }
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="contents form-container">
            <h2>{title}</h2>
            <form on:submit={changeUsernameAndEmail}>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input id="username" type="text" placeholder="Username" value={username} />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input id="email" type="mail" placeholder="Email" value={email} />
                </div>
                <div class="actions">
                    <button type="submit" id="submit-btn">Submit</button>
                    <button type="button" on:click={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        z-index: 50;
        background: rgba(0, 0, 0, 0.5);
    }

    .contents {
        width: 400px;
        min-width: 250px;
        padding: 20px;
        background: #2d2d2d;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        pointer-events: auto;
        color: white;
    }

    h2 {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
        margin-top: 0;
        color: #ff9500;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 15px;
    }

    .form-group label {
        margin-bottom: 5px;
        font-size: 16px;
        color: #fff;
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

    button:last-child {
        background-color: #404040;
    }

    button:last-child:hover {
        background-color: #777;
    }

    button:disabled {
        background-color: #777;
        cursor: default;
    }

    @media (max-width: 768px) {
        .contents {
            margin-top: 20px;
            width: 70%;
        }
    }
</style>
