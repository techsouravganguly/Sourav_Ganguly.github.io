


function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot) =>{
       let totalcount = 0;
        snapshot.forEach((doc)=>{
            totalcount += doc.data().quantity;

        })
        setCartCounter(totalcount);
    })
}

function setCartCounter(totalcount){
    document.querySelector(".cart-item-number").innerText = totalcount;
}
getCartItems();