<script>
    import Child from '../Child/Child.svelte';
    import { fridgeMessages } from '../../store/fridgeMessages';

    export let name;
    export let children;

    let cookieJar = ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪'];

    function handleEatCookie(childName) {
        cookieJar.pop();
        cookieJar = cookieJar;
        if (cookieJar.length > 0) {
            console.log(`I, ${name}, gave ${childName} a cookie, there is ${cookieJar.length} cookies left in the jar!`);
        } else {
            console.log(`I, ${name}, have no more cookies to give to ${childName}!`);
        }
    }

    function fillCookieJar() {
        console.log(`Let's fill the cookie jar!`);
        cookieJar.push('🍪', '🍪', '🍪', '🍪', '🍪', '🍪');
        cookieJar = cookieJar;
    }

    function handleShowLove(childName) {
        console.log(`My name is ${name} and ${childName} loves me!`);
    }

    function wipeFridgeClean() {
        console.log(`${name} wiped the fridge clean!`);
        fridgeMessages.set(['Fridge Messages Below']);
    }
</script>

<h1>{name}</h1>
<button on:click={wipeFridgeClean}>Wipe fridge clean</button>

{#if cookieJar.length > 0}
    <p>{cookieJar}</p>
{:else}
    <button on:click={fillCookieJar}>Refill Cookie jar</button>
    <br />
{/if}

{#each children as child}
    <Child {child} onShowLove={handleShowLove} onEatCookie={handleEatCookie} />
{/each}

<style>
    button {
        transition: transform 0.3s;
    }
    button:hover {
        transform: scale(1.5);
    }
</style>
