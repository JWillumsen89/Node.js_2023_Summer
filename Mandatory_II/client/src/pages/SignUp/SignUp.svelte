<script>
    import { LocalhostUrl } from '../../components/Urls.js';

    async function handleSignup(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const username = event.target.username.value;
        const password = event.target.password.value;
        const passwordConfirmation = event.target.passwordConfirmation.value;
        const email = event.target.email.value;

        // Check if passwords match
        if (password !== passwordConfirmation) {
            console.error('Passwords do not match!');
            return; // Exit the function if passwords don't match
        }

        const data = {
            username: username,
            password: password,
            email: email,
        };

        fetch(LocalhostUrl + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Signed up successfully');
                    return response.json(); // Parse JSON response and forward it for the next then()
                } else {
                    // If response is not ok, throw an error to be caught in catch()
                    return response.text().then(text => Promise.reject(text));
                }
            })
            .then(data => {
                console.log('Return data: ', data);
            })
            .catch(error => {
                console.error('Signup failed:', error);
            });
    }
</script>

<h1>Signup Page</h1>
<form on:submit={handleSignup}>
    <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required value="Jonathan" />
    </div>

    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required value="test@test.dk" />
    </div>

    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required value="12345" />
    </div>

    <div>
        <label for="passwordConfirmation">Confirm Password:</label>
        <input type="password" id="passwordConfirmation" name="passwordConfirmation" required value="12345" />
    </div>

    <button type="submit">Signup</button>
</form>
