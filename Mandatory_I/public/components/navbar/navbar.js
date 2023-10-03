document.addEventListener('DOMContentLoaded', () => {
    const setNavbar = authStatus => {
        let authButton = authStatus ? '<a href="/logout" class="nav-item" id="logout">Logout</a>' : '<a href="/login" class="nav-item">Login</a>';

        const navbarHTML = `
            <navbar id="os-navbar">
                <div class="navbar-header">My Website</div>
                <div class="navbar-container">
                    <a href="/" class="nav-item">Home</a>
                    <div class="nav-item-dropdown">
                        <span class="nav-item">Subjects</span>
                        <div class="dropdown-content">
                            <a href="/javascriptfundamentals">Javascript Fundamentals</a>
                            <a href="/node.js">Node.js</a>
                            <a href="/express.js">Express.js</a>
                            <a href="/git">Git</a>
                        </div>
                    </div>
                    <a href="/contact" class="nav-item">Contact</a>
                    ${authButton}
                </div>
            </navbar>
        `;
        document.body.prepend(new DOMParser().parseFromString(navbarHTML, 'text/html').body.firstChild);
    };

    fetch('/auth_status', {
        method: 'GET',
        credentials: 'same-origin',
    })
        .then(response => response.json())
        .then(data => {
            setNavbar(data.isAuthenticated);
        });
});
