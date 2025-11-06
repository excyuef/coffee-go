import { products } from '../data/products.js' 
import { cart } from './cart.js';

AOS.init();

AOS.init({
    once: false,
    delay: 100,
    duration: 500,
});

feather.replace();

let matchingItem;
let cartSummaryHTML = '';

cart.forEach( cartItem => {
  const productId = cartItem.productId;

  products.forEach( product => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });
  console.log(matchingItem);
  cartSummaryHTML += 
  ` 
    <div
    class="h-68 border bg-daunkopi rounded-2xl">
      <div
      class="w-full md:w-auto"
      data-aos="zoom-in">
        <div
        class="rounded-xl flex flex-row px-4 items-center h-68">
          <div
          class="w-full h-full rounded-2xl flex justify-center items-center group transition-all ease group relative">
            <img 
            class="h-24 absolute scale-160 group-hover:scale-200 transition-all ease"
            src="${matchingItem.image}">
            <img 
            class="absolute h-32 w-32 scale-160 object-cover group-hover:scale-200 transition-all ease"
            src="images/element/matcha/daun-matcha.png">
          </div>
          <div
          class="w-full h-60 font-semibold text-susu py-4 px-4 flex flex-col justify-between bg-black/10 rounded-xl">
            <div>
              <p
              class="text-xl mb-2">
              ${matchingItem.name}
              </p>
              <p
              class="text-xs mb-5">
                Rp. ${matchingItem.rupiah} 
                <span
                class="text-susu/50">
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
                  <button>
                    -
                  </button>
                  <p>
                    ${cartItem.quantity}
                  </p>
                  <button>
                    +
                  </button>
                </div>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between text-daunkopi">
                <button
                class="bg-white px-3 py-3 rounded-4xl font-semibold text-sm hover:bg-daunkopi hover:text-cream transition-all ease duration-400"
                popovertarget="popover-order">
                  Buy Now
                </button>
                <button
                class="bg-white rounded-full py-2 px-4 transition-all ease duration-400 text-xl">
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
console.log(cartSummaryHTML);
document.querySelector('.cart')
  .innerHTML = cartSummaryHTML;   