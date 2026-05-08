import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu");

function getMenuItemsHtml(menuArray) {
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

            <div class="add-item">
              <span class="add-item-emoji">+</span>
            </div>
          </div>
        `;
    })
    .join("");
}

function render() {
  menuEl.innerHTML = getMenuItemsHtml(menuArray);
}

render();

