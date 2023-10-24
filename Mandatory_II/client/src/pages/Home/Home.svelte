<script>
    import { LocalhostUrl } from '../../components/Urls.js';
    let data;

    async function fetchData() {
        const response = await fetch(LocalhostUrl + '/message');
        data = await response.json();
        console.log(data);
    }

    fetchData();
</script>

<!-- Display data in the component -->
{#if data}
    <p>{data.message}</p>
    <p>{data.name}</p>
{/if}
