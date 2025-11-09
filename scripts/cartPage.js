import { products } from '../data/products.js' 
import { 
  cart,
  removeFromCart,
  updateQuantity
} from './cart.js';

AOS.init();

AOS.init({
    once: false,
    delay: 100,
    duration: 500,
});

feather.replace();

let matchingItem;
let cartSummaryHTML = '';
let popoverBuyHTML = '';

cart.forEach( cartItem => {
  const productId = cartItem.productId;

  products.forEach( product => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });
  
  const isText = matchingItem.text;
  const isScale = matchingItem.scale;
  const isClass = matchingItem.class;
  const isHidden = cartItem.hidden;

  popoverBuyHTML +=
        `
          <div 
          popover
          id="popover-buy"
          anchor="btnBuy"
          class="bg-kopi m-auto scale-120 lg:scale-150 rounded-xl starting:open:opacity-0 opacity-0 open:opacity-100 transition-all transition-discrete duration-400 pt-6 px-3 pb-3">
            <div
            class="px-12">
              <div
              class="aspect-square h-10 rounded-full bg-cream m-auto mb-3 flex items-center justify-center">
                <img
                class="aspect-square w-7 object-center object-cover" 
                src="/images/icon/logo.png" 
                alt="logo">
              </div>

              <div class="text-center">
                <p 
                class="text-slate-100 font-semibold mb-3">
                  Welcome to Coffee Go
                </p>
                <p 
                class="text-slate-100 font-medium text-xs mb-5">
                  Pesan kamu sudah terkirim :) <br>
                  click the button to closed
                </p>
              </div>
            </div>

              <button 
              class="bg-cream text-kopi text-xs py-1.5 px-2 font-semibold rounded-sm w-full"
              popovertarget="bought">
                Buy
              </button>
            </div>
          </div>
        `

  cartSummaryHTML += 
  ` 
    <div
    class="container-${matchingItem.id} ${isHidden ? 'hidden' : ''} h-68 border ${matchingItem.bg} rounded-2xl">
      <div
      class="w-full md:w-auto h-full"
      data-aos="zoom-in">
        <div
        class="rounded-xl flex flex-row h-full overflow-hidden p-4">
          <div
          class="w-full h-full flex justify-center items-center group transition-all ease group relative overflow-hidden">
            <img 
            class="h-24 absolute ${isScale ? isScale : 'scale-160'} z-10 group-hover:scale-200 transition-all ease ${isClass ? 'mb-14' : ''}"
            src="${matchingItem.image}">
            <img 
            class="absolute h-32 w-32 scale-200 object-cover group-hover:scale-250 transition-all ease"
            src="${matchingItem.element}">
          </div>
          <div
          class="w-full h-full font-semibold ${isText ? 'text-espresso' : 'text-susu'} py-4 px-4 flex flex-col justify-between bg-black/10 rounded-xl">
            <div>
              <p
              class="text-xl mb-2">
              ${matchingItem.name}
              </p>
              <p
              class="text-xs m b-5">
                Rp. ${matchingItem.rupiah} 
                <span>
                  <s>Rp. 15.000,00</s>
                </span>
              </p>
              
              <div
              class="flex flex-col gap-1.5">
                <p 
                class="text-sm">
                  Jumlah:
                </p>
                <div
                class="flex flex-row gap-3">
                  <button
                  class="js-decrease-quantity"
                  data-product-id="${matchingItem.id}">
                    -
                  </button>
                  <p
                  class="js-quantity-label-${matchingItem.id}">
                    ${cartItem.quantity}
                  </p>
                  <button
                  class="js-increase-quantity"
                  data-product-id="${matchingItem.id}">
                    +
                  </button>
                </div>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between text-espresso">
                <button
                class="js-popover-buy-now
                bg-white px-3 py-3 rounded-4xl font-semibold text-sm transition-all ease hover:scale-110"

                popovertarget="popover-buy"
                id="btnBuy"
                data-product-id="${matchingItem.id}">
                  Buy Now
                </button>
                <button
                class="js-delete-cart
                bg-white rounded-full py-2 px-4 transition-all ease text-xl hover:scale-110"
                data-product-id="${matchingItem.id}">
                  X
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
});
document.querySelector('.cart')
  .innerHTML = cartSummaryHTML;   

updateCartQuantity();

document.querySelectorAll('.js-delete-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;

      removeFromCart(productId);

      const container = document.querySelector(`.container-${productId}`);

      container.remove();
      updateCartQuantity();
    })
  })
console.log(cart);

document.querySelectorAll('.js-increase-quantity')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;

      const newQuantity = 1;

      updateQuantity(productId, newQuantity);

      let quantityLabel = 
        document.querySelector(`.js-quantity-label-${productId}`);

      let quantityLabelValue = 
        Number(quantityLabel.innerHTML);

      let quantityLabelNewValue = quantityLabelValue += 1;

      quantityLabel.innerHTML = quantityLabelNewValue;
      updateCartQuantity();
    });
  });

document.querySelectorAll('.js-decrease-quantity')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;

      const newQuantity = -1;

      updateQuantity(productId, newQuantity);

      let quantityLabel = 
        document.querySelector(`.js-quantity-label-${productId}`);

      let quantityLabelValue = 
        Number(quantityLabel.innerHTML);

      let quantityLabelNewValue = quantityLabelValue -= 1;

      quantityLabel.innerHTML = quantityLabelNewValue;
      updateCartQuantity();
    });
  });

function updateCartQuantity () {
  let quantity = 0;

  cart.forEach(cartItem => {
    quantity += cartItem.quantity;
  });

  document.querySelector('.js-checkout-quantity')
    .innerHTML = `Products (${quantity})`;
}

document.querySelector('.popover')
  .innerHTML = popoverBuyHTML;

document.querySelectorAll('.js-popover-buy-now')
  .forEach(button => {
    button.addEventListener('click', () => {

    })
  })