
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




priceAndQuantityUpdater();

function priceAndQuantityUpdater() {
  const setValue = document.querySelectorAll('.cart__item__content__settings__quantity input');
  for (let i = 0; i < setValue.length; i++) {
    setValue[i].addEventListener('change', function () {
      const item = cart[i];
      const key = item.id +"-"+ item.color
      item.qty = setValue[i].value;
      localStorage.setItem(key, JSON.stringify(item));
      totalPriceDisplay();
      displayTotalQuantity();
    })
  }
}



itemDeleter();

function itemDeleter() {
  const deleteItem = document.querySelectorAll('.deleteItem');
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener('click', function () {
      const item = cart[i];
      const key = item.id +"-"+ item.color
      cart.splice(i, 1);
      localStorage.removeItem(key);
      displayCartItems();
      displayCart();
      totalPriceDisplay();
      displayTotalQuantity();
      location.reload();
      console.log(cart);
    })
  }
}


orderForm();

function orderForm() {
  const orderBtn = document.getElementById('order');
  orderBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (cart.length === 0) {alert('Votre panier est vide'); return;} 
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
   
    checkForm(firstName, lastName, email, address, city);

    checkEmail(email);

    makeOrder(firstName, lastName, email, address, city);
  })  
}

function makeOrder (firstName, lastName, email, address, city) {
  const ids = [];

  // replace by map ( map )
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      ids.push(item.id);
    }
    const body = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        city: city,
      },
      products: ids,
    }
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const orderId = data.orderId;
        window.location.href = 'confirmation.html'+'?orderId='+orderId;
       return console.log(data)
      
      } )
      .catch((err) => console.log(err));

}



function checkForm(firstName, lastName, email, address, city) {
  if (firstName === '' || lastName === '' || email === '' || address === '' || city === '') {
    alert('Veuillez remplir tous les champs');
    throw new Error('Veuillez remplir tous les champs');
  }
}


function checkEmail (email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email != '' && !regex.test(email)) {
      alert('Veuillez entrer une adresse email valide');
      throw new Error('Email is not valid');
    }
}
