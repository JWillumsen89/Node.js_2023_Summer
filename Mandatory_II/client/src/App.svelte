<script>
    import { Router, Route } from 'svelte-navigator';
    import PrivateRoute from './components/PrivateRoutes/PrivateRoute.svelte';
    import Navbar from './components/Navbar/Navbar.svelte';
    import Home from './pages/Home/Home.svelte';
    import SignUpLogin from './pages/SignUpLogin/SignUpLogin.svelte';
    import AdminPage from './pages/Admin/AdminPage.svelte';
    import NoPermission from './pages/NoPermission/NoPermission.svelte';

    import { onMount } from 'svelte';
    import { checkSession } from './components/Authorization/Authorization';
    import { writable } from 'svelte/store';

    export const isSessionChecked = writable(false);

    onMount(async () => {
        await checkSession();
        isSessionChecked.set(true);
    });

    const adminRole = ['admin'];
    const userRole = ['user', 'admin'];
</script>

{#if $isSessionChecked}
    <Router>
        <Navbar />
        <div>
            <Route path="/" component={Home} primary={false} />
            <Route path="/login-signup" component={SignUpLogin} primary={false} />
            <Route path="/no-permission" component={NoPermission} primary={false} />

            <PrivateRoute path="/admin" roles={adminRole}>
                <AdminPage />
            </PrivateRoute>
        </div>
    </Router>
{:else}
    <!--show a loading spinner-->
{/if}
