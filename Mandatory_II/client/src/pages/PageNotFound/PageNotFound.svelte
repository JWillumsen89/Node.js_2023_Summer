<script>
    import { pageTitle } from '../../stores/pageTitleStore.js';
    import { dynamicTitlePart, getFullTitle } from '../../stores/htmlTitleStore.js';

    $: pageTitle.set('Page not found');
    $: dynamicTitlePart.set($pageTitle);
    $: document.title = getFullTitle($dynamicTitlePart);
</script>

<h1>Error 404</h1>
