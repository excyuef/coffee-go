

export let cart = 
  [
    {
      productId: "id1",
      quantity: 2,
    },
    {
      productId: "id2",
      quantity: 1,
    },
    {
      productId: "id3",
      quantity: 1,
    },
    {
      productId: "id4",
      quantity: 1,
    }
  ]

function saveToLocalStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
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
      quantity,
    });
  }
  console.log(cart);
  saveToLocalStorage();
}