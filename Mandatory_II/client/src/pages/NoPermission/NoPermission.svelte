<script>
    import { navigate } from 'svelte-navigator';
    import { user } from '../../stores/userStore.js';
    import { pageTitle } from '../../stores/pageTitleStore.js';
    import { dynamicTitlePart, getFullTitle } from '../../stores/htmlTitleStore.js';

    $: pageTitle.set('No Permission');
    $: dynamicTitlePart.set($pageTitle);
    $: document.title = getFullTitle($dynamicTitlePart);
</script>

{#if !$user.isLoggedIn}
    <h1>You are not logged in</h1>
    <button on:click={() => navigate('/login-signup')}>Login</button>
{:else}
    <h1>You don't have permission to access this site.</h1>
{/if}
