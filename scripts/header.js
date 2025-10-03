//const { document } = require("postcss");
const nav = document.querySelector('#link');
const menu = document.querySelector('#hamburger');
const exit = document.querySelector('#exit');

menu.addEventListener("click", () => {
  nav.classList.remove("animate-hilang")
  nav.classList.add("animate-muncul")
})

exit.addEventListener("click", () => {
  nav.classList.remove("animate-muncul")
  nav.classList.add("animate-hilang")
})
