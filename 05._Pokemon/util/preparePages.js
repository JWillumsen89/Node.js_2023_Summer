import { readPage, renderPage } from './templateEngine.js';

const frontpage = readPage('./public/pages/frontpage/frontpage.html');
export const frontpagePage = renderPage(frontpage);

const battle = readPage('./public/pages/battle/battle.html');
export const battlePage = renderPage(battle);

const contact = readPage('./public/pages/contact/contact.html');
export const contactPage = renderPage(contact);