document.addEventListener('DOMContentLoaded', () => {
    const navbarHTML = `
        <navbar id="os-navbar">
            <div class="navbar-header">My Website</div>
            <div class="navbar-container">
                <a href="/" class="nav-item">Home</a>
                <div class="nav-item-dropdown">
                    <span class="nav-item">Subjects</span>
                    <div class="dropdown-content">
                        <a href="/node.js">Node.js</a>
                        <a href="/express.js">Express.js</a>
                        <a href="/javascriptfundamentals">Javascript Fundamentals</a>
                    </div>
                </div>
                <a href="/contact" class="nav-item">Contact</a>
                <a href="/login" class="nav-item">Login</a>
            </div>
        </navbar>
    `;

    document.body.prepend(new DOMParser().parseFromString(navbarHTML, 'text/html').body.firstChild);
});
