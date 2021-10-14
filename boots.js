import {
    productCards
} from "./database.js";

const boots = productCards.boots;

// creating product card dynamically

boots.map(boot => {

    //creating product card (outest div)
    var bootsCard = document.createElement("div");
    bootsCard.classList.add("product-card");

    //creating image div
    var imageDiv = document.createElement("div");
    imageDiv.classList.add("product-image");

    //creating image src
    var img = document.createElement("img");
    img.src = boot.productImage;
    imageDiv.appendChild(img);

    bootsCard.appendChild(imageDiv);

    //creating product name
    var name = document.createElement("p");
    name.innerText = boot.productName;
    name.classList.add("product-name");
    bootsCard.appendChild(name);

    //product price
    var price = document.createElement("h4");
    price.innerText = boot.productPrice;
    price.classList.add("product-price");
    bootsCard.appendChild(price);

    //add to cart button
    var button = document.createElement("button");
    button.innerText = "Add to Cart";
    button.classList.add("product-add-to-cart");
    bootsCard.appendChild(button);


    var cardsContainer = document.querySelector(".cards-container");
    cardsContainer.appendChild(bootsCard);
});

// creating cart badge and updating its number, storing the items in local storage

var cartBadge = document.createElement("span");
let numbeOfItems = 0;
var btnAddToCart = document.querySelectorAll(".product-add-to-cart");

for (let i = 0; i < btnAddToCart.length; i++) {


    btnAddToCart[i].addEventListener("click", () => {
        if (numbeOfItems === 0) {
            //  boot.addedInCart = true;
            numbeOfItems++;

            cartBadge.innerText = numbeOfItems;
            cartBadge.classList.add("cart-badge");

            var outer = document.querySelector(".cart");
            outer.appendChild(cartBadge);
        } else {
            // boot.addedInCart = true;
            numbeOfItems++;
            cartBadge.innerText = numbeOfItems;
        }
        cartBadgeNumber();

    });
}

function cartBadgeNumber() {

    let numberOfItems = localStorage.getItem('numberOfCartItems');

    numberOfItems = Number(numbeOfItems)-1;

    if (numberOfItems) {
        localStorage.setItem('numberOfCartItems', numberOfItems + 1);
    } else {
        localStorage.setItem('numberOfCartItems', 1);
    }


}

function onReloadCartBadgeNumber() {
    let items = localStorage.getItem('numberOfCartItems');

    if (items) {
        document.querySelector(".cart-badge").innerText = items;
    }
}