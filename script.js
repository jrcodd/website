const menuLinks = document.querySelectorAll("#menu a");
const cartLink = document.querySelector("#cart a");
const sections = document.querySelectorAll("section");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const checkoutButton = document.querySelector("#checkout-button");

let cart = [];

menuLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    const section = document.querySelector(id);
    sections.forEach(s => (s.style.display = "none"));
    section.style.display = "block";
  });
});

cartLink.addEventListener("click", e => {
  e.preventDefault();
  const id = e.target.getAttribute("href");
  const section = document.querySelector(id);
  sections.forEach(s => (s.style.display = "none"));
  section.style.display = "block";
  updateCart();
});

addToCartButtons.forEach(button => {
  button.addEventListener("click", e => {
    const name = e.target.getAttribute("data-name");
    const price = e.target.getAttribute("data-price");
    addToCart(name, price);
  });
});

checkoutButton.addEventListener("click", e => {
  // Checkout process goes here
});

function addToCart(name, price) {
  const item = { name, price };
  cart.push(item);
}

function updateCart() {
  const cartItemsContainer = document.querySelector("#cart-items");
  let items = "";
  let total = 0;
  cart.forEach(item => {
    items += `
      <div class="cart-item">
        <img src="${item.name.toLowerCase().replace(" ", "-")}.jpg" alt="${item.name}">
        <div class="name">${item.name}</div>
        <div class="price">$${item.price}</div>
      </div>
    `;
    total += parseInt(item.price);
  });
  cartItemsContainer.innerHTML = items;
  document.querySelector("#total").textContent = `Total: $${total}`;
}