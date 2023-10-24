<script>
    import { LocalhostUrl } from '../../components/Urls.js';
    async function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Extract data from the form
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
        });

        if (response.ok) {
            console.log('Logged in successfully');
            console.log(await response.json());
        } else {
            console.error('Login failed:', await response.text());
        }
    }
</script>

<h1>Login Page</h1>
<form on:submit={handleSubmit}>
    <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required value="Jonathan"/>
    </div>

    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required value="1234"/>
    </div>

    <button type="submit">Login</button>
</form>
