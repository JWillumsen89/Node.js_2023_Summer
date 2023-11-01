<script>
    import { navigate,useLocation } from 'svelte-navigator';
    import { user } from '../../stores/userStore';

    export let roles = [];

    const location = useLocation();

    $: checkAccess();

    const checkAccess = () => {
        const isLoggedIn = $user && $user.isLoggedIn;
        const hasValidRole = isLoggedIn && roles.includes($user.user?.role);
        console.log('Checking access - logged in: ', isLoggedIn, ' - has valid role: ', hasValidRole);
        if (!hasValidRole) {
            console.log('Redirecting - insufficient permissions or not logged in');
            navigate('/no-permission', {
                state: { from: $location.pathname },
                replace: true,
            });
        }
    };
</script>

{#if $user && $user.isLoggedIn && roles.includes($user.user?.role)}
    <slot />
{/if}
