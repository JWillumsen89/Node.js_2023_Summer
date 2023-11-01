<script>
    import { LocalhostUrl } from '../../components/Urls.js';
    import { user } from '../../stores/userStore.js';
    import { writable, get } from 'svelte/store';
    import { onMount } from 'svelte';

    let adminData = [];
    let errorMessage = '';

    onMount(async () => {
        try {
            const response = await fetch(LocalhostUrl + '/admin/data', {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const result = await response.json();
            adminData = result.data;
        } catch (error) {
            console.error('Fetch error:', error);
            errorMessage = error.message || 'Failed to fetch data';
        }
    });
</script>

<h1>Admin Page</h1>
{#if adminData.length > 0}
    <h3>{adminData}</h3>
{:else}
    <p>{errorMessage || 'No data available'}</p>
{/if}
