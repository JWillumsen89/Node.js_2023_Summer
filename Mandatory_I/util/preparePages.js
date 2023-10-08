import { readPage, renderPage } from './templateEngine.js';

const homepage = readPage('./public/pages/homepage/homepage.html');
export const homepagePage = renderPage(homepage, { tabTitle: 'Mandatory I | Home' });

const nodejspage = readPage('./public/pages/node.jspage/node.jspage.html');
export const nodejspagePage = renderPage(nodejspage, { tabTitle: 'Mandatory I | Node.js' });

const expressjspage = readPage('./public/pages/express.jspage/express.jspage.html');
export const expressjspagePage = renderPage(expressjspage, { tabTitle: 'Mandatory I | Express.js' });

const javascriptfundamentalspage = readPage('./public/pages/javascriptfundamentalspage/javascriptfundamentalspage.html');
export const javascriptfundamentalspagePage = renderPage(javascriptfundamentalspage, { tabTitle: 'Mandatory I | Javascript Fundamentals' });

const gitpage = readPage('./public/pages/gitpage/gitpage.html');
export const gitpagePage = renderPage(gitpage, { tabTitle: 'Mandatory I | Git' });

const restapipage = readPage('./public/pages/restapipage/restapipage.html');
export const restapipagePage = renderPage(restapipage, { tabTitle: 'Mandatory I | REST API' });

const loginpage = readPage('./public/pages/loginpage/loginpage.html');
export const loginpagePage = renderPage(loginpage, { tabTitle: 'Mandatory I | Login' });

const adminpage = readPage('./public/pages/adminpage/adminpage.html');
export const adminpagePage = renderPage(adminpage, { tabTitle: 'Mandatory I | Admin' });

const miscellaneouspage = readPage('./public/pages/miscellaneouspage/miscellaneouspage.html');
export const miscellaneouspagePage = renderPage(miscellaneouspage, { tabTitle: 'Mandatory I | Miscellaneous' });

const javascriptenhancedpage = readPage('./public/pages/javascriptenhancedpage/javascriptenhancedpage.html');
export const javascriptenhancedpagePage = renderPage(javascriptenhancedpage, { tabTitle: 'Mandatory I | Javascript Enhanced' });

const ssrvscsrpage = readPage('./public/pages/ssrvscsrpage/ssrvscsrpage.html');
export const ssrvscsrpagePage = renderPage(ssrvscsrpage, { tabTitle: 'Mandatory I | SSR vs CSR' });
