document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('nav > ul');

    function createNavigationLink(id, textContent, className, iconClass) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.className = className;
        a.title = textContent;
        a.innerHTML = `<i class="${iconClass}"></i> ${textContent}`;

        li.appendChild(a);
        return li;
    }

    function handleSectionTitles() {
        const mainTitles = document.querySelectorAll('.window-main-title');

        mainTitles.forEach(mainTitle => {
            const mainLi = createNavigationLink(mainTitle.id, mainTitle.textContent, 'spy-link', 'fas fa-folder');
            nav.appendChild(mainLi);

            const ul = document.createElement('ul');
            mainLi.appendChild(ul);

            const subTitles = mainTitle.parentElement.querySelectorAll('.window-sub-title');
            subTitles.forEach(subTitle => {
                const subLi = createNavigationLink(subTitle.id, subTitle.textContent, 'spy-sublink', 'fas fa-folder');
                ul.appendChild(subLi);
            });
        });
    }

    function determineActiveSection(sections, threshold) {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY + threshold >= sectionTop && scrollY + threshold < sectionTop + sectionHeight) {
                currentSection = section.querySelector('.window-main-title, .window-sub-title').getAttribute('id');
            }
        });
        return currentSection;
    }

    function highlightActiveLinks() {
        const threshold = window.innerHeight * 0.5;
        const currentSection = determineActiveSection(document.querySelectorAll('.toc-section'), threshold);
        const currentSubSection = determineActiveSection(document.querySelectorAll('.toc-subsection'), threshold);

        const updateLinkState = (links, currentId) => {
            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === currentId) {
                    link.classList.add('active');
                }
            });
        };

        updateLinkState(document.querySelectorAll('.spy-link'), currentSection);
        updateLinkState(document.querySelectorAll('.spy-sublink'), currentSubSection);
    }

    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 120,
                behavior: 'smooth',
            });
        }
    }

    function attachLinkClickEvent(links) {
        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);

                links.forEach(link => link.classList.remove('active'));
                link.classList.add('active');

                scrollToSection(targetId);
            });
        });
    }

    handleSectionTitles();
    window.addEventListener('scroll', highlightActiveLinks);
    attachLinkClickEvent(document.querySelectorAll('.spy-link'));
    attachLinkClickEvent(document.querySelectorAll('.spy-sublink'));
});
