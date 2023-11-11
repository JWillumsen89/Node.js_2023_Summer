<script>
    import { BaseURL } from '../../components/Urls.js';
    import { notificationStore } from '../../stores/notificationStore.js';
    import { navigate } from 'svelte-navigator';
    import { pageTitle } from '../../stores/pageTitleStore.js';
    import { dynamicTitlePart, getFullTitle } from '../../stores/htmlTitleStore.js';
    import { user } from '../../stores/userStore.js';

    $: pageTitle.set('Contact');
    $: dynamicTitlePart.set($pageTitle);
    $: document.title = getFullTitle($dynamicTitlePart);

    let username = '';
    let email = '';

    $: if ($user.isLoggedIn) {
        username = $user.user.username;
        email = $user.user.email;
    }

    let isSubmitting = false;

    async function handleContactSubmit(event) {
        event.preventDefault();
        isSubmitting = true;

        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            subject: event.target.subject.value,
            message: event.target.message.value,
        };

        try {
            const response = await fetch(`${BaseURL}/sendContactEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                notificationStore.set({ message: 'Message sent successfully!', type: 'success' });
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
                notificationStore.set({ message: errorMessage.error, type: 'error' });
            } else {
                notificationStore.set({ message: 'An unknown error occurred', type: 'error' });
            }
        }
        isSubmitting = false;
    }
</script>

<div class="form-container">
    <form on:submit={handleContactSubmit}>
        <label for="name">Name:</label>
        <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter full name..."
            bind:value={username}
            disabled={isSubmitting || $user.isLoggedIn}
        />

        <label for="email">Email:</label>
        <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter email..."
            bind:value={email}
            disabled={isSubmitting || $user.isLoggedIn}
        />

        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required placeholder="Enter subject..." value="Test subject" disabled={isSubmitting} />

        <label for="message">Message:</label>
        <textarea
            id="message"
            name="message"
            required
            rows="15"
            style="resize: none;"
            placeholder="Enter message..."
            value="test message"
            disabled={isSubmitting}
        />

        <button id="submit-btn" type="submit" disabled={isSubmitting}>Send Message</button>
    </form>
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
        color: #fff;
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
    textarea {
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

    textarea:focus {
        border-color: #ff9500;
        outline: none;
        box-shadow: 0 0 3px #ff9500;
    }

    input:disabled,
    textarea:disabled {
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

    button:disabled {
        background-color: #777;
        cursor: default;
    }

    @media (max-width: 768px) {
        .form-container {
            margin-top: 20px;
        }

        textarea {
            height: 100px;
        }
    }
</style>
