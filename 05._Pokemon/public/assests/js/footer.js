const year = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    let footer = document.createElement('footer');

    let para = document.createElement('p');
    para.textContent = '© ' + year + ' - Pokemon';

    let link = document.createElement('a');
    link.textContent = 'Contact';
    link.href = '/contact';

    footer.appendChild(para);
    footer.appendChild(link);
    document.body.appendChild(footer);
});
