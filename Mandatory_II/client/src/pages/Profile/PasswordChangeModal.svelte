<script>
    import { closeModal } from 'svelte-modals';

    export let isOpen;
    export let title;
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="contents form-container">
            <h2>{title}</h2>
            <form>
                <div class="form-group">
                    <label for="currentPassword">Current Password:</label>
                    <input id="currentPassword" type="password" placeholder="Current Password" autofocus />
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
                    <button type="submit">Submit</button>
                    <button type="button" on:click={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
{/if}

<!--
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
        border-radius: 6px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
        background: #2d2d2d; /* Match the form container background */
        color: white; /* Text color for better visibility on dark background */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Similar shadow effect */
        border: none; /* Remove any border */
    }

    .form-group {
        margin-bottom: 15px; /* Space between each form group */
    }

    .form-group label {
        display: block; /* Make the label take the full width */
        margin-bottom: 5px; /* Space between label and input field */
        color: #fff; /* Label text color */
        font-size: 14px; /* Adjust the font size as needed */
    }

    h2 {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
        color: #ff9500;
    }

    input[type='password'] {
        width: calc(45%); /* Adjust width to account for padding */
        padding: 12px 10px; /* More padding for a better look */
        margin-bottom: 15px; /* Consistent margin between inputs */
        border-radius: 4px; /* Rounded corners */
        border: 1px solid #555; /* Subtle border to make inputs stand out */
        background-color: #333; /* Darker background for the inputs */
        color: #fff; /* Light text for better visibility */
        font-size: 16px;
    }

    input[type='password']:focus {
        border-color: #ff9500; /* Highlight color when focused */
        outline: none; /* Remove default outline */
        box-shadow: 0 0 3px #ff9500; /* Subtle glow effect */
    }

    .actions {
        display: flex;
    }

    .actions button {
        /* Style to match the site's button styling */
        padding: 10px 20px;
        background-color: #ff9500; /* Primary button color */
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-right: 10px; /* Spacing between buttons */
    }

    .actions button:last-child {
        background-color: #404040; /* Different color for the cancel button */
    }

    .actions button:hover {
        /* Hover effect */
        background-color: #cc7a00; /* Darker shade for primary button */
    }
    /* Additional global style to override default link color if needed */
</style>-->

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
        }
    }
</style>
