fetch('http://127.0.0.1:3000/api/products').then(res => res.json()).then(result => showProducts(result))

    // "colors": [
    // "Blue",
    // "White",
    // "Black"
    // ],
    // "_id": "107fb5b75607497b96722bda5b504926",
    // "name": "Kanap Sinopé",
    // "price": 1849,
    // "imageUrl": "http://127.0.0.1:3000/images/kanap01.jpeg",
    // "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    // "altTxt": "Photo d'un canapé bleu, deux places"
    // },

    
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