const sections = document.querySelectorAll('.toc-section');
const spyLinks = document.querySelectorAll('.spy-link');
const subSections = document.querySelectorAll('.toc-subsection');
const spySubLinks = document.querySelectorAll('.spy-sublink');

function highlightActiveLinks() {
    let currentSection = '';
    let currentSubSection = '';

    const threshold = window.innerHeight * 0.5;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset + threshold >= sectionTop && pageYOffset + threshold < sectionTop + sectionHeight) {
            currentSection = section.querySelector('.window-main-title').getAttribute('id');
        }
    });

    subSections.forEach(subSection => {
        const sectionTop = subSection.offsetTop;
        const sectionHeight = subSection.clientHeight;
        if (pageYOffset + threshold >= sectionTop && pageYOffset + threshold < sectionTop + sectionHeight) {
            currentSubSection = subSection.querySelector('.window-sub-title').getAttribute('id');
        }
    });

    spyLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });

    spySubLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSubSection) {
            link.classList.add('active');
        }
    });
}

function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        const targetTop = targetSection.offsetTop;

        window.scrollTo({
            top: targetTop - 50,
            behavior: 'smooth',
        });
    }
}

window.addEventListener('scroll', highlightActiveLinks);

spyLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);

        spyLinks.forEach(link => {
            link.classList.remove('active');
        });
        link.classList.add('active');

        scrollToSection(targetId);
    });
});

spySubLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);

        spySubLinks.forEach(link => {
            link.classList.remove('active');
        });
        link.classList.add('active');

        scrollToSection(targetId);
    });
});
