// Declare global variables
let cart = [];
const storedCart = localStorage.getItem("cart");
if (storedCart) {
  cart = JSON.parse(storedCart);
}
console.log('e');
document.addEventListener("DOMContentLoaded", function() {
// Add event listeners to add-to-cart buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", e => {
    // Get item name and price from data attributes
    const name = e.target.getAttribute("data-name");
    const price = e.target.getAttribute("data-price");
    const image = e.target.getAttribute("id");
    // Add item to cart
    addToCart(name, price, image);
    console.log('e');
  });
});
document.querySelectorAll(".go-to-checkout-button").forEach(button => {
  button.addEventListener("click", e => {
    // Get item name and price from data attributes
    const href = e.target.getAttribute("href");
    window.location.href = href;
  });
});
if (window.location.href.endsWith("checkout.html")) {
  updateCart();
}
// Add event listener for "Remove" buttons
document.addEventListener("click", e => {
  if (e.target.classList.contains("remove")) {
    // Get index of item to remove from cart
    const index = e.target.getAttribute("data-index");
    console.log(index);
    // Remove item from cart
    cart.splice(index, 1);
    // Save updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Update cart display
    updateCart();
  }
});
// Add event listener to checkout button
document.querySelectorAll(".checkout-button").forEach(button => {
  button.addEventListener("click", e => {
    console.log(cart);
  });
});
});

// Add item to cart
function addToCart(name, price, img) {
  const index = cart.length;
  const item = { name, price, img, index};
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart on checkout page
function updateCart() {
  const cartItemsContainer = document.querySelector("#cart-items");
  let items = "";
  let total = 0;
  let i = 0;
  cart.forEach(item => {
    items += `
    <div class="cart-item">
    <img src="${item.img}" alt="${item.name}">
    <div class="name">${item.name}</div>
    <div class="price">$${item.price}</div>
    <button class="remove" data-index="${i}">Remove</button>
    </div>
    `;
    total += parseInt(item.price);
    i++;
  });
  cartItemsContainer.innerHTML = items;
  document.querySelector("#total").textContent = `Total: $${total}`;
}

// If on checkout page, update cart when page loads
if (window.location.pathname === "/checkout.html") {
  updateCart();
}
