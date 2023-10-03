<script>
    import Traktor from './lib/Traktor.svelte';
    import Ground from './lib/Ground.svelte';
    import Farmer from './lib/Farmer.svelte';
    //console.log('Hello');

    const wheels = ['🛞', '🛞', '🛞', '🛞'];
    const showTraktor = true;
    const welcomeMessage = 'Welcomt to our first project';
    const farmerName = 'Farmer John';
</script>

<h1 id="welcome-message">{welcomeMessage}</h1>
<h2>This is the main component</h2>

<Farmer name={farmerName} />
{#if showTraktor}
    <Traktor {wheels} />
    <Ground />
{/if}

<style>
    #welcome-message {
        color: aquamarine;
    }
</style>
