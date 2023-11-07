<script>
    import { Router, Link, Route } from 'svelte-navigator';
    import Home from './pages/Home/Home.svelte';
    import CoffeeOverview from './pages/CoffeeOverview/CoffeeOverview.svelte';
    import RegisterCoffeeLover from './pages/RegisterCoffeeLover/RegisterCoffeeLover.svelte';
    import WhoDatCoffeeLover from './pages/WhoDatCoffeeLover/WhoDatCoffeeLover.svelte';
    import RegisterCoffeeLoverSSR from './pages/RegisterCoffeeLoverSSR/RegisterCoffeeLoverSSR.svelte';
    import WhoDatCoffeeLoverSSR from './pages/WhoDatCoffeeLoverSSR/WhoDatCoffeeLoverSSR.svelte';
</script>

<h1>Hello</h1>
<Router>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/coffeetypes">Coffee Overview</Link>
        <Link to="/registercoffeelover">Register Coffee Lover</Link>
        <Link to="/whodatcoffeelover">WhoDatCoffeeLover</Link>
        <Link to="/registercoffeeloverssr">Register Coffee Lover SSR</Link>
        <Link to="/whodatcoffeeloverssr">WhoDatCoffeeLover SSR</Link>
    </nav>

    <div>
        <Route path="/" component={Home} primary={false} />
        <Route path="/coffeetypes" primary={false}><CoffeeOverview /></Route>
        <Route path="/registercoffeelover" primary={false}><RegisterCoffeeLover /></Route>
        <Route path="/whodatcoffeelover" primary={false}><WhoDatCoffeeLover /></Route>
        <Route path="/registercoffeeloverssr" primary={false}><RegisterCoffeeLoverSSR /></Route>
        <Route path="/whodatcoffeeloverssr" primary={false}><WhoDatCoffeeLoverSSR /></Route>
    </div>
</Router>
