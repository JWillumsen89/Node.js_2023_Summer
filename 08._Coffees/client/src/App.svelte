<script>
    import { Router, Link, Route } from 'svelte-navigator';
    import Home from './pages/Home/Home.svelte';
    import CoffeeFacts from './pages/CoffeeFacts/CoffeeFacts.svelte';
    import CoffeeOverview from './pages/CoffeeOverview/CoffeeOverview.svelte';
</script>

<Router>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/coffeetypes">Coffee Overview</Link>
        <Link to="/coffeefacts">Coffee Facts</Link>
    </nav>
    <div>
        <Route path="/" component={Home} />
        <Route path="/coffeetypes"><CoffeeOverview /></Route>
        <Route path="/coffeefacts"><CoffeeFacts /></Route>
    </div>
</Router>
