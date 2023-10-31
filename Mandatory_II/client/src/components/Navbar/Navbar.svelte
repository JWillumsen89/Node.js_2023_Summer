<script>
    import { Hamburger } from 'svelte-hamburgers';
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { Link } from 'svelte-navigator';

    let open = false;
</script>

<Hamburger bind:open --color="white" />

{#if open}
    <div transition:fly={{ y: -15, delay: 0, duration: 100 }}>
        <p><Link to="/">Home</Link></p>
        <p><Link to="/dummy">Dummy</Link></p>
        <p><Link to="/login-signup">Login/Sign Up</Link></p>
    </div>

    <hr transition:scale={{ duration: 100, easing: quadOut }} />
{/if}
