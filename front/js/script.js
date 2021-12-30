

//récupartion des produits dans l'api
fetch('http://127.0.0.1:3000/api/products').then(res => res.json()).then(result => showProducts(result))

 
// affichage des produits dans l'html  
    function showProducts(products) {
        products.forEach(product=> {
            console.log(products)
            let show = document.querySelector('#items')
            console.log(show)
            show.innerHTML = show.innerHTML +`<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a> `
      
        });
    }