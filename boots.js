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
    price.innerText = "₹ " + boot.productPrice;
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
onReloadCartBadgeNumber();
var btnAddToCart = document.querySelectorAll(".product-add-to-cart");

for (let i = 0; i < btnAddToCart.length; i++) {


    btnAddToCart[i].addEventListener("click", () => {

        let storedCartNumber = localStorage.getItem('numberOfCartItems');

        if (storedCartNumber === null) {
            storedCartNumber++;
            createCartBadge(storedCartNumber);

        } else {
            storedCartNumber++;
            document.querySelector(".cart-badge").innerText = Number(storedCartNumber);
        }
        
        cartBadgeNumber();
        storeClickedProducts(boots[i]);
        totalCartCost(boots[i]);

    });
}

// create badge if there's no item added previously
function createCartBadge(storedCartNumber) {

    var cartBadge = document.createElement("span");
    cartBadge.innerText = storedCartNumber;
    cartBadge.classList.add("cart-badge");

    var outer = document.querySelector(".cart");
    outer.appendChild(cartBadge);

}

//for updating local storage
function cartBadgeNumber() {

    let numberOfItems = localStorage.getItem('numberOfCartItems');

    numberOfItems = parseInt(numberOfItems);

    if (numberOfItems) {
        localStorage.setItem('numberOfCartItems', numberOfItems + 1);
    } else {
        localStorage.setItem('numberOfCartItems', 1);
    }
}

//to handle badge number on reload
function onReloadCartBadgeNumber() {
    let items = localStorage.getItem('numberOfCartItems');

    if (items) {
        createCartBadge(items);
    }
}

// store the selected product in local storage
function storeClickedProducts(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if (cartItems != null) {

        if (cartItems[product.id] === undefined) {

            cartItems = {
                ...cartItems,
                [product.id]: product
            }
        }
        cartItems[product.id].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.id]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

// Calculating Total Cost
function totalCartCost(product){

    let cartCost = localStorage.getItem('totalCartCost');

    if(cartCost!=null){
        localStorage.setItem("totalCartCost", Number(cartCost) + Number(product.productPrice));
    
    }else{
        localStorage.setItem("totalCartCost", product.productPrice);
    }
}