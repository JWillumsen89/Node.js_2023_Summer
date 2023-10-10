<script>
    export let child;
    export let onShowLove;
    export let onEatCookie;

    import { fridgeMessages } from '../../store/fridgeMessages';

    let customFridgeMessage = '';

    function submitFridgeMessage() {
        console.log(customFridgeMessage);
        fridgeMessages.set([...$fridgeMessages, `${child.name}: ${customFridgeMessage}`]);
        /*fridgeMessages.update(storeValue => {
            return [...storeValue, `${child.name}: ${customFridgeMessage}`];
        });*/
        customFridgeMessage = '';
    }
</script>

<button class="heartBtn" on:click={() => onShowLove(child.name)}>Give ❤️</button>
<button class="cookieBtn" on:click={() => onEatCookie(child.name)}>Eat 🍪</button>
<br />
<input bind:value={customFridgeMessage} placeholder="Write a message..." />
<button on:click={submitFridgeMessage}>Submit fridge message</button>

<div class:is-girl={child.isGirl} class:is-boy={!child.isGirl} class="child {child.blackSheep || 'not-a-black-sheep'}">
    <h3>
        {child.name}
    </h3>
</div>

<style>
    .child {
        border-radius: 10px;
        margin: 10px;
        font-size: 1em;
    }
    .is-girl {
        border: 1px solid pink;
    }
    .is-boy {
        border: 1px solid blue;
    }
    .not-a-black-sheep {
        background-color: aquamarine;
    }
    .medium-black-sheep {
        background-color: blueviolet;
    }
    .ultra-black-sheep {
        background-color: brown;
    }
    button {
        transition: transform 0.3s;
    }
    button:hover {
        transform: scale(1.5);
    }
</style>
