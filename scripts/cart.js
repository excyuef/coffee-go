export let cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    cart = [
        { 
          productId: 'id5',
          quantity: 0,
          class: true
        }
      ]
  }

export function saveToLocalStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartQuantity () {
  let cartQuantity = 0;

  if (cart) {
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  }

  document.querySelector(".js-cart-quantity")
    .innerHTML = cartQuantity;
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity ++;
  } else {
    cart.push({
      productId,
      quantity: 1
    });
  }
  console.log(cart);
  saveToLocalStorage();
}

export function removeFromCart (productId) {
  const newCart = [];

  cart.forEach( (cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  
  cart = newCart;

  saveToLocalStorage();
}

export function updateQuantity (productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity += newQuantity;

  saveToLocalStorage();
}