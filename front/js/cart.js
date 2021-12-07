
const cart = []

displayCart();

function displayCart() {
  const numberOfItems = localStorage.length;
  console.log(numberOfItems);
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
  console.log(cart);

}


displayCartItems();

function displayCartItems() {
  const cartItems = document.getElementById('cart__items');
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
    <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
    <div class="cart__item__img">
      <img ${item.img}
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${item.name}</h2>
        <p>${item.color}</p>
        <p>${item.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantité : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${item.qty}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
    cartItems.appendChild(cartItem);

  }


}
displayTotalQuantity();

function displayTotalQuantity() {
  const totalqty = document.getElementById('totalQuantity');
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += parseFloat(item.qty);
  }
  totalqty.innerHTML = total;
}




totalPriceDisplay();

function totalPriceDisplay() {
  const totalPrice = document.getElementById('totalPrice');
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += parseFloat(item.price) * parseFloat(item.qty);
  }
  totalPrice.innerHTML = total;
}

PriceAndQuantityUpdater();
function PriceAndQuantityUpdater() {
  const setValue = document.querySelectorAll('.cart__item__content__settings__quantity input');
  for (let i = 0; i < setValue.length; i++) {
    setValue[i].addEventListener('change', function () {
      const item = cart[i];
      item.qty = setValue[i].value;
      localStorage.setItem(item.id, JSON.stringify(item));
      totalPriceDisplay();
      displayTotalQuantity();
    })
  }
}
