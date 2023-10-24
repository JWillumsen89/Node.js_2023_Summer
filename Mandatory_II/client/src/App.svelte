<script>
    import { Router, Link, Route } from 'svelte-navigator';
    import Home from './pages/Home/Home.svelte';
    import Login from './pages/Login/Login.svelte';
    import SignUp from './pages/SignUp/SignUp.svelte';
</script>

<h1>Hello there</h1>

<Router>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
    </nav>
    <div>
        <Route path="/" component={Home} primary={false} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
    </div>
</Router>
