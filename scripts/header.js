//const { document } = require("postcss");
const nav = document.querySelector('nav');

const menu = document.querySelector('#hamburger');

menu.addEventListener("click", () => {
  nav.classList.add("active");
});