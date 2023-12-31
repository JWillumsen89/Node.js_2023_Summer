<script>
    import { closeModal } from 'svelte-modals';
    import { user } from '../../stores/userStore.js';
    import { get, writable } from 'svelte/store';
    import { notificationStore } from '../../stores/notificationStore.js';
    import { BaseURL } from '../../components/Urls.js';

    export let isOpen;
    export let title;

    async function checkAndChangePassword(event) {
        event.preventDefault();
        const username = get(user).user.username;
        const currentPassword = event.target.currentPassword.value;
        const newPassword = event.target.newPassword.value;
        const confirmNewPassword = event.target.confirmNewPassword.value;

        const currentPasswordInput = /** @type {HTMLInputElement} */ (document.getElementById('currentPassword'));
        const newPasswordInput = /** @type {HTMLInputElement} */ (document.getElementById('newPassword'));
        const confirmNewPasswordInput = /** @type {HTMLInputElement} */ (document.getElementById('confirmNewPassword'));
        const submitBtn = /** @type {HTMLInputElement} */ (document.getElementById('submit-btn'));

        if (currentPasswordInput && newPasswordInput && confirmNewPasswordInput) {
            currentPasswordInput.disabled = true;
            newPasswordInput.disabled = true;
            confirmNewPasswordInput.disabled = true;
            submitBtn.disabled = true;
        }

        const data = {
            username,
            currentPassword,
            newPassword,
        };

        if (newPassword !== confirmNewPassword) {
            console.error('Passwords do not match!');
            notificationStore.set({ message: 'New passwords do not match!', type: 'error' });
            currentPasswordInput.disabled = false;
            newPasswordInput.disabled = false;
            confirmNewPasswordInput.disabled = false;
            submitBtn.disabled = false;
            return;
        }

        try {
            const response = await fetch(BaseURL + '/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            if (response.ok) {
                notificationStore.set({ message: 'Password successfully changed!', type: 'success' });
                user.update(currentUser => {
                    currentUser.user.updatedAt = new Date().toISOString();
                    return currentUser;
                });
                closeModal();
            } else {
                currentPasswordInput.disabled = false;
                newPasswordInput.disabled = false;
                confirmNewPasswordInput.disabled = false;
                submitBtn.disabled = false;
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            currentPasswordInput.disabled = false;
            newPasswordInput.disabled = false;
            confirmNewPasswordInput.disabled = false;
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
            <form on:submit={checkAndChangePassword}>
                <div class="form-group">
                    <label for="currentPassword">Current Password:</label>
                    <input id="currentPassword" type="password" placeholder="Current Password" />
                </div>
                <div class="form-group">
                    <label for="newPassword">New Password:</label>
                    <input id="newPassword" type="password" placeholder="New Password" />
                </div>
                <div class="form-group">
                    <label for="confirmNewPassword">Confirm New Password:</label>
                    <input id="confirmNewPassword" type="password" placeholder="Confirm New Password" />
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
