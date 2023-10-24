<script>
    import { Router, Link, Route } from 'svelte-navigator';
    import Home from './pages/Home/Home.svelte';
    import Login from './pages/Login/Login.svelte';
</script>

<h1>Hello there</h1>

<Router>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
    </nav>
    <div>
        <Route path="/" component={Home} primary={false} />
        <Route path="/login" component={Login} />
    </div>
</Router>
