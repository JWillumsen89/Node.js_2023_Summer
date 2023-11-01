<script>
    import { Route } from 'svelte-navigator';
    import PrivateRouteGuard from './PrivateRouteGuard.svelte';

    export let path;
    export let roles = [];
</script>

<Route {path} let:params let:location let:navigate primary={false}>
    <PrivateRouteGuard {roles}>
        <slot {params} {location} {navigate} />
    </PrivateRouteGuard>
</Route>
