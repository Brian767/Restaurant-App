import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu");
const addItemBtns = document.getElementsByClassName("add-item-btn");
const completeOrderBtn = document.getElementById("complete-order-btn");
const payBtn = document.getElementById("pay-btn");
const paymentForm = document.getElementById("payment-form");
const orderMessage = document.getElementById("order-message");

let cartItemsArr = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addToCart(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeFromCart(e.target.dataset.remove);
  } else if (e.target.id === "complete-order-btn") {
    document.getElementById("payment-modal").style.display = "flex";
  }
});

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(paymentForm);
  const name = formData.get("card-name");
  

  document.getElementById("order-text").innerHTML = `Thanks, ${name}! Your order is on its way!`;
  orderMessage.style.display = "flex";

  setTimeout(function () {
    orderMessage.style.display = "none";
  }, 8000);

  paymentForm.reset();
  cartItemsArr = [];
  updateTotalPrice();
  render();
  document.getElementById("payment-modal").style.display = "none";
});

function removeFromCart(cartItemId) {
  for (let item of cartItemsArr) {
    console.log(item.id.toString(), cartItemId);
    if (item.id.toString() === cartItemId) {
      cartItemsArr.splice(cartItemsArr.indexOf(item), 1);
      break;
    }
  }

  updateTotalPrice();
  render();
}

function updateTotalPrice() {
  const totalPrice = cartItemsArr.reduce(function (acc, cartItem) {
    return acc + cartItem.price;
  }, 0);

  document.getElementById("total-price").innerText = `$${totalPrice}`;
}

function addToCart(menuItemId) {
  const targetMenuItemObj = menuArray.filter(function (menuItem) {
    return menuItem.id.toString() === menuItemId;
  })[0];
  cartItemsArr.push(targetMenuItemObj);
  orderMessage.style.display = "none";
  updateTotalPrice();
  render();
}

function getCartItemsHtml() {
  return cartItemsArr
    .map(function (cartItem) {
      return `
            <div class="cart-items-container">
              <div class="cart-items">
                <p class="menu-item-name">${cartItem.name}</p>
                <button class="cart-remove-btn" data-remove="${cartItem.id}">remove</button>
              </div>
              <p class="menu-item-price">$${cartItem.price}</p>
            </div>`;
    })
    .join("");
}

function getMenuItemsHtml() {
  return menuArray
    .map(function (menuItem) {
      return `
            <div class="menu-item-container">
            <div class="menu-item">
              <span class="menu-emoji">${menuItem.emoji}</span>
              <div class="menu-text-container">
                <h2 class="menu-item-name">${menuItem.name}</h2>
                <p class="menu-item-description">${menuItem.ingredients}</p>
                <p class="menu-item-price">$${menuItem.price}</p>
              </div>
            </div>

            <button class="add-item-btn" data-add="${menuItem.id}">+</button>
            </div>
            `;
    })
    .join("");
}

function render() {
  menuEl.innerHTML = getMenuItemsHtml();

  if (cartItemsArr.length > 0) {
    document.getElementById("cart").style.display = "flex";
    document.getElementById("cart-html").innerHTML = getCartItemsHtml();
  } else {
    document.getElementById("cart").style.display = "none";
  }
}

render();
