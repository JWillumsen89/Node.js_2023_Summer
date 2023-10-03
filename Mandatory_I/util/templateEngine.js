import fs from 'fs';

export function readPage(filePath) {
    return fs.readFileSync(filePath).toString();
}

export function renderPage(page, config = {}) {
    return page.replace('$TAB_TITLE', config.tabTitle || 'Mandatory I').replace('$CSS_LINKS', config.cssLinks || '');
}
