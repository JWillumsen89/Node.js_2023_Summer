import { readPage, renderPage } from './templateEngine.js';

const homepage = readPage('./public/pages/homepage/homepage.html');
export const homepagePage = renderPage(homepage, { tabTitle: 'Mandatory I | Home' });

const nodejspage = readPage('./public/pages/node.jspage/node.jspage.html');
export const nodejspagePage = renderPage(nodejspage, { tabTitle: 'Mandatory I | Node.js' });

const expressjspage = readPage('./public/pages/express.jspage/express.jspage.html');
export const expressjspagePage = renderPage(expressjspage, { tabTitle: 'Mandatory I | Express.js' });

const javascriptfundamentalspage = readPage('./public/pages/javascriptfundamentalspage/javascriptfundamentalspage.html');
export const javascriptfundamentalspagePage = renderPage(javascriptfundamentalspage, { tabTitle: 'Mandatory I | Javascript Fundamentals' });

const contactpage = readPage('./public/pages/contactpage/contactpage.html');
export const contactpagePage = renderPage(contactpage, { tabTitle: 'Mandatory I | Contact' });

const loginpage = readPage('./public/pages/loginpage/loginpage.html');
export const loginpagePage = renderPage(loginpage, { tabTitle: 'Mandatory I | Login' });

const adminpage = readPage('./public/pages/adminpage/adminpage.html');
export const adminpagePage = renderPage(adminpage, { tabTitle: 'Mandatory I | Admin' });