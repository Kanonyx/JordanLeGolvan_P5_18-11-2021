const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');
console.log(productId);

fetch(`http://localhost:3000/api/products/${productId}`)
.then(res => res.json())
.then(result => handleData(result))




function handleData(canape) {
    console.log(canape);
    let prodImgUrl = document.querySelector('.item__img');
    let prodName = document.querySelector('#title');
    let prodPrice = document.querySelector('#price');   
    let prodDesc = document.querySelector('#description');
    let prodColor = document.querySelector('#colors');


    prodImgUrl.innerHTML = `<img src="${canape.imageUrl}" alt="${canape.altTxt}">`
    prodName.innerHTML = `${canape.name}` 
    prodPrice.innerHTML = `${canape.price}`
    prodDesc.innerHTML = `${canape.description}`

    canape.colors.forEach(color => {
        prodColor.innerHTML += `<option value="${color}">${color}</option>`})


        
}

const button = document.querySelector('#addToCart');
button.addEventListener('click', () => {
    let color = document.querySelector('#colors').value;
    let qty = document.querySelector('#quantity').value;
    let price = document.querySelector('#price').innerHTML;
    let name = document.querySelector('#title').innerHTML;
    let img = document.querySelector('.item__img').innerHTML;
    let id = productId;
    let cart = {
        id: id,
        name: name,
        price: price,
        img: img,
        color: color,
        qty: qty,
    }
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
})
    