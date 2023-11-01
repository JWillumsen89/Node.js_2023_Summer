<script>
    import { Hamburger } from 'svelte-hamburgers';
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { Link } from 'svelte-navigator';
    import { user } from '../../stores/userStore.js';
    import { writable, get } from 'svelte/store';
    import { LocalhostUrl } from '../../components/Urls.js';
    import { useNavigate } from 'svelte-navigator';

    const navigate = useNavigate();

    let open = false;

    function closeMenu() {
        open = false;
    }

    async function handleLogout() {
        try {
            const response = await fetch(LocalhostUrl + '/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Logged out successfully');
                user.set({ isLoggedIn: false, user: null });
                navigate('/login-signup', { replace: true });
                const currentUser = get(user);
                console.log('Logged out - User data is null: ', currentUser);
            } else {
                console.error('Logout failed: ', await response.text());
            }
        } catch (error) {
            console.error('Logout error: ', error);
        }
        closeMenu();
    }
</script>

<Hamburger bind:open --color="white" />

{#if open}
    <div transition:fly={{ y: -15, delay: 0, duration: 100 }}>
        <p><Link to="/" on:click={closeMenu}>Home</Link></p>
        <p><Link to="/dummy" on:click={closeMenu}>Dummy</Link></p>

        {#if $user.isLoggedIn}
            {#if $user.user.role === 'admin'}
                <p><Link to="/admin" on:click={closeMenu}>Admin Panel</Link></p>
            {/if}
            <p><Link to="/login-signup" on:click={handleLogout}>Logout</Link></p>
        {:else}
            <p><Link to="/login-signup" on:click={closeMenu}>Login/Sign Up</Link></p>
        {/if}
    </div>

    <hr transition:scale={{ duration: 100, easing: quadOut }} />
{/if}
