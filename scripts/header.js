//const { document } = require("postcss");
const nav = document.querySelector('#nav');
const menu = document.querySelector('#hamburger');
const exit = document.querySelector('#');

menu.addEventListener("click", () => {
  nav.classList.remove("hilang")
  nav.classList.add("muncul")
})

exit.addEventListener("click", () => {
  menu.classList.remove("muncul")
  menu.classList.add("ilang")
})
