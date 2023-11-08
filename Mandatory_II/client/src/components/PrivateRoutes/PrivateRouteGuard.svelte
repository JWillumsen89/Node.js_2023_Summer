<script>
    import { navigate,useLocation } from 'svelte-navigator';
    import { user } from '../../stores/userStore';

    export let roles = [];

    const location = useLocation();

    $: checkAccess();

    const checkAccess = () => {
        const isLoggedIn = $user && $user.isLoggedIn;
        const hasValidRole = isLoggedIn && roles.includes($user.user?.role);
        if (!hasValidRole) {
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
