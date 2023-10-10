<script>
    import Home from './components/Home/Home.svelte';
    import Parent from './components/Parent/Parent.svelte';

    const parents = ['Anders', 'Karoline'];
    const children = [
        {
            name: 'Gustav',
            blackSheep: 'medium-black-sheep',
        },
        {
            name: 'Sarah',
            isGirl: true,
        },
        {
            name: 'Alexander',
            blackSheep: 'ultra-black-sheep',
        },
    ];
</script>

<h4>Welcome message above the door</h4>
<Home>
    <!--Task show parents names-->
    <!--
    <Parent name={parents[0]} {children} />
    <Parent name={parents[1]} {children} />
-->
    {#each parents as parent}
        <Parent name={parent} {children} />
    {/each}
</Home>
