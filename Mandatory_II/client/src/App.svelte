<script>
    import { Router, Link, Route } from 'svelte-navigator';
    import Navbar from './components/Navbar/Navbar.svelte';
    import Home from './pages/Home/Home.svelte';
    import SignUpLogin from './pages/SignUpLogin/SignUpLogin.svelte';
</script>

<Router>
    <Navbar />
    <div>
        <Route path="/" component={Home} primary={false} />
        <Route path="/login-signup" component={SignUpLogin} />
    </div>
</Router>
