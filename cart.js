let cartNumber = localStorage.getItem('numberOfCartItems');
let productsInCart = localStorage.getItem('productsInCart');
let totalCost = localStorage.getItem('totalCartCost');

setCartBadge(cartNumber);

function setCartBadge(cartNumber){
var cartBadge = document.createElement("span");
    cartBadge.innerText = cartNumber;
    cartBadge.classList.add("cart-badge");

    var outer = document.querySelector(".cart");
    outer.appendChild(cartBadge);
}


