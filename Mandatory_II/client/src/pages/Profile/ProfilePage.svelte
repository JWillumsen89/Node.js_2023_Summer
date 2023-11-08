<script>
    import { pageTitle } from '../../stores/pageTitleStore.js';
    import { dynamicTitlePart, getFullTitle } from '../../stores/htmlTitleStore.js';
    import { user } from '../../stores/userStore.js';
    import { writable, get } from 'svelte/store';

    $: pageTitle.set('Profile');
    $: dynamicTitlePart.set($pageTitle);
    $: document.title = getFullTitle($dynamicTitlePart);
</script>
<br>
<img src={get(user).avatar} alt="Avatar" />
<h2>Username: {get(user).user.username}</h2>
<h2>Email: {get(user).user.email}</h2>
<h2>Created at: {get(user).user.createdAt}</h2>
