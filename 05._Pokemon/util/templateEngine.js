import fs from 'fs';

export function readPage(filePath) {
    return fs.readFileSync(filePath).toString();
}

export function renderPage(page) {
    const navbar = fs.readFileSync('./public/components/navbar/navbar.html').toString();
    const footer = fs.readFileSync('./public/components/footer/footer.html').toString();

    return navbar + page + footer;
}
