<script>
    import { navigate } from 'svelte-navigator';
    import { BASE_URL } from '../../store/global.js';
    let coffeeLoverName;

    async function submitCoffeeLoverName() {
        const response = await fetch($BASE_URL + '/api/coffeelovers', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ coffeeLover: coffeeLoverName }),
        });
        if (response.status === 200) {
            navigate('/whodatcoffeeloverssr');
        }
    }
</script>

<input bind:value={coffeeLoverName} />
<button on:click={submitCoffeeLoverName}>Submit your name</button>
