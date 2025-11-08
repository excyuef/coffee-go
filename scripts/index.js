import { 
  addToCart, 
  cart,
  updateCartQuantity 
} from "./cart.js";

AOS.init();

AOS.init({
    once: false,
    delay: 100,
    duration: 500,
});

feather.replace();

//ini buat externall resource

console.log(cart);

const slides = document.getElementById("slides");
const totalSlides = slides.children.length;
let currentIndex = 0;

document.getElementById("next")
  .addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  });

document.getElementById("prev")
  .addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  });

const kopsu = document.querySelector('.kopsu');
const matcha = document.querySelector('.matcha');
const americano = document.querySelector('.americano');
const guren = document.querySelector('.guren');

kopsu.addEventListener('click', () => {
  kopsu.classList.toggle("active");
});

matcha.addEventListener('click', () => {
  matcha.classList.toggle("active");
});

americano.addEventListener('click', () => {
  americano.classList.toggle("active");
});

guren.addEventListener('click', () => {
  guren.classList.toggle("active");
});

const faqs = document.querySelectorAll('.faq');

faqs.forEach((faq) => {
  const summary = faq.querySelector('summary'); 
  const content = faq.querySelector('.content');  
  const icon = summary.querySelector('svg');      

  summary.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (faq.hasAttribute('open')) {
      closeFaq(faq, content, icon);
    } else {
      openFaq(faq, content, icon);
    }
  });
});

function openFaq(faq, content, icon) {
  faq.setAttribute('open', 'true');
  content.style.maxHeight = content.scrollHeight + 'px';
  content.style.opacity = '1';
  icon.style.transform = 'rotate(180deg)';

  content.addEventListener('transitionend', function handler(e) {
    if (e.propertyName === 'max-height') {
      content.style.maxHeight = 'none';
      content.removeEventListener('transitionend', handler);
    }
  });
}

function closeFaq(faq, content, icon) {

  content.style.maxHeight = content.scrollHeight + 'px';
  content.offsetHeight; 
  content.style.maxHeight = '0px';
  content.style.opacity = '0';
  icon.style.transform = 'rotate(0deg)';

  content.addEventListener('transitionend', function handler(e) {
    if (e.propertyName === 'max-height') {
      faq.removeAttribute('open');
      content.removeEventListener('transitionend', handler);
    }
  });
}

// cart

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      addToCart(productId);
      updateCartQuantity();
    });
  });