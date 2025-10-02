//const { document } = require("postcss");
const nav = document.querySelector('#nav');
const menu = document.querySelector('#hamburger');

menu.addEventListener('click', (e) => {
  e.preventDefault();
  nav.classList.add('active');
});