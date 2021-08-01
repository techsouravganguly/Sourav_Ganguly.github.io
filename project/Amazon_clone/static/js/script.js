


function getItems(){
    db.collection("items").get().then((querySnapshot) => {
        let items =[];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                make: doc.data().make,
                rating: doc.data().rating,
                price: doc.data().price
            })
        });
        generateItems(items)
    });
}

function addToCart(item){
    console.log(item);
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get().then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        }
        else{
            cartItem.set({
                image: item.image,
                make: item.make,
                name: item.name,
                price: item.price,
                rating: item.rating,
                quantity: 1
            })
        }
    })
}

function generateItems(items){
    let itemsHTML = "";
    items.forEach((items)=>{
        let doc = document.createElement("div");
        doc.classList.add("main-product");
        doc.innerHTML = `

            <div class="product-image">
               <img src="${items.image}" alt="">

            </div>
            <div class="product-name">
                ${items.name}
            </div>
            <div class="product-make">
                ${items.make}
            </div>
            <div class="product-rating">
                ⭐⭐⭐⭐⭐ ${items.rating}
            </div>
            <div class="product-price">
                $  ${items.price}
            </div>`
        let addTocartEl = document.createElement("div");
        addTocartEl.classList.add("add-to-cart")
        addTocartEl.innerText = "Add to Cart";
        addTocartEl.addEventListener("click", function(){
            addToCart(items) 
        })
        doc.appendChild(addTocartEl);
        document.querySelector(".main-section-products").appendChild(doc);
    })
}
getItems();