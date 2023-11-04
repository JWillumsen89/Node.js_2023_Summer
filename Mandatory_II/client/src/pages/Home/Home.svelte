<script>
    import { LocalhostUrl } from '../../components/Urls.js';
    let data;
    import { pageTitle } from '../../stores/pageTitleStore.js';
    import { dynamicTitlePart, getFullTitle } from '../../stores/htmlTitleStore.js';

    $: pageTitle.set('Home');
    $: dynamicTitlePart.set($pageTitle);
    $: document.title = getFullTitle($dynamicTitlePart);

    async function fetchData() {
        const response = await fetch(LocalhostUrl + '/message');
        data = await response.json();
        console.log(data);
    }

    fetchData();
</script>

{#if data}
    <p>{data.message}</p>
    <p>{data.name}</p>
{/if}
