<script>
    import { Hamburger } from 'svelte-hamburgers';
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { Link } from 'svelte-navigator';
    import { user } from '../../stores/userStore.js';
    import { pageTitle } from '../../stores/pageTitleStore.js';
    import { writable, get } from 'svelte/store';
    import { LocalhostUrl } from '../../components/Urls.js';
    import { useNavigate } from 'svelte-navigator';

    const navigate = useNavigate();

    let open = false;
    let avatarUrl;
    $: title = $pageTitle;

    function closeMenu() {
        open = false;
    }

    async function handleLogout() {
        try {
            const response = await fetch(LocalhostUrl + '/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Logged out successfully');
                user.set({ isLoggedIn: false, user: null });
                navigate('/login-signup', { replace: true });
                const currentUser = get(user);
                console.log('Logged out - User data is null: ', currentUser);
            } else {
                console.error('Logout failed: ', await response.text());
            }
        } catch (error) {
            console.error('Logout error: ', error);
        }
        closeMenu();
    }
    function getRandomAvatarUrl() {
        const avatarFunctions = [getAvatarUrl1, getAvatarUrl2, getAvatarUrl4, getAvatarUrl5, getAvatarUrl6];

        const randomIndex = Math.floor(Math.random() * avatarFunctions.length);
        return avatarFunctions[randomIndex]();
    }

    function getAvatarUrl1() {
        const seed = Math.random().toString(36).substring(2, 15);
        return `https://robohash.org/${seed}.png`;
    }

    function getAvatarUrl2() {
        const hash = Math.random().toString(36).substring(2, 15);
        return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
    }

    function getAvatarUrl4() {
        const seed = Math.random().toString(36).substring(2, 15);
        return `https://source.boringavatars.com/beam/120/${seed}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`;
    }

    function getAvatarUrl5() {
        const seed = Math.random().toString(36).substring(2, 15);
        return `https://api.multiavatar.com/${seed}.png`;
    }

    function getAvatarUrl6() {
        const seed = Math.random().toString(36).substring(2, 15);
        return `https://robohash.org/${seed}.png?set=set4`;
    }

    $: if ($user.isLoggedIn && !avatarUrl) {
        avatarUrl = getRandomAvatarUrl();
    }

    function clickAvatar() {
        console.log('Avatar clicked');
        navigate('/profile', { replace: true });
    }

    function handleKeydown(event) {

        if (event.key === 'Enter' || event.key === ' ') {
            clickAvatar();
        }
    }
</script>

<div class="header">
    <Hamburger bind:open --color="#ff9500" />
    <span class="page-title">{title}</span>

    {#if $user.isLoggedIn}
        <div class="user-info" role="button" tabindex="0" on:click={clickAvatar} on:keydown={handleKeydown}>
            <img class="avatar" src={avatarUrl} alt="User Avatar" />
            <span>{$user.user.username}</span>
        </div>
    {/if}
</div>
{#if open}
    <div transition:fly={{ y: -15, delay: 0, duration: 100 }}>
        <p><Link to="/" on:click={closeMenu}>Home</Link></p>

        {#if $user.isLoggedIn}
            {#if $user.user.role === 'admin'}
                <p><Link to="/admin" on:click={closeMenu}>Admin Panel</Link></p>
            {/if}
            {#if $user.user.role === 'admin' || $user.user.role === 'user'}
                <p><Link to="/profile" on:click={closeMenu}>Profile</Link></p>
            {/if}
            <p><Link to="/login-signup" on:click={handleLogout}>Logout</Link></p>
        {:else}
            <p><Link to="/login-signup" on:click={closeMenu}>Login/Sign Up</Link></p>
        {/if}
    </div>

    <hr transition:scale={{ duration: 100, easing: quadOut }} />
{/if}

<style>
    span {
        color: #ff9500;
    }
    hr {
        border-color: #ff9500;
    }
    div {
        text-align: center;
        font-size: 1em;
        letter-spacing: 0.15em;
        padding: 0.2em;
        padding-top: 0;
        color: #eef;
    }
    p {
        cursor: pointer;
        width: max-content;
        margin: 1rem auto;
    }
    p:hover {
        text-decoration: underline;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .page-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 4em;
        color: #ff9500;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        font-weight: 500;
        padding: 0.5rem 1rem;
        background: rgba(36, 36, 36, 0.5);
        border-radius: 8px;
        z-index: 10;
    }

    .user-info {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }
    @media (max-width: 768px) {
        .avatar {
            width: 40px;
            height: 40px;
        }
    }
</style>
