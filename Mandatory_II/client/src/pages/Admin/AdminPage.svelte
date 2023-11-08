<script>
    import { BaseURL } from '../../components/Urls.js';
    import { onMount } from 'svelte';
    import { pageTitle } from '../../stores/pageTitleStore.js';
    import { dynamicTitlePart, getFullTitle } from '../../stores/htmlTitleStore.js';

    $: pageTitle.set('Admin Panel');
    $: dynamicTitlePart.set($pageTitle);
    $: document.title = getFullTitle($dynamicTitlePart);

    let adminData = [];
    let errorMessage = '';

    onMount(async () => {
        try {
            const response = await fetch(BaseURL + '/admin/data', {
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
