<script>
  let data;

  async function fetchData() {
      const response = await fetch('http://localhost:3000/message');
      data = await response.json();
      console.log(data);
  }

  fetchData();
</script>

<!-- Display data in the component -->
{#if data}
  <p>{data.message}</p>
{/if}