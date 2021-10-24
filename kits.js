import {
    productCards
} from "./database.js";

const kits = productCards.kits;

kits.map(kit => {

    //creating product card (outest div)
    var kitsCard = document.createElement("div");
    kitsCard.classList.add("product-card");

    //creating image div
    var imageDiv = document.createElement("div");
    imageDiv.classList.add("product-image");

    //creating image src
    var img = document.createElement("img");
    img.src = kit.productImage;
    imageDiv.appendChild(img);

    //creating wishlist button
    var wButton = document.createElement("button");
    var btnText = document.createElement("span");
    btnText.classList.add("material-icons");
    btnText.classList.add("wishlist");
    btnText.innerText = "favorite_border";

    wButton.classList.add("wishlist-btn");

    wButton.appendChild(btnText);
    imageDiv.appendChild(wButton);

    kitsCard.appendChild(imageDiv);

    //creating product name
    var name = document.createElement("p");
    name.innerText = kit.productName;
    name.classList.add("product-name");
    kitsCard.appendChild(name);

    //product price
    var price = document.createElement("h4");
    price.innerText = "₹ " + kit.productPrice;
    price.classList.add("product-price");
    kitsCard.appendChild(price);

    //add to cart button
    var button = document.createElement("button");
    button.innerText = "Add to Cart";
    button.classList.add("product-add-to-cart");
    kitsCard.appendChild(button);


    var cardsContainer = document.querySelector(".cards-container");
    cardsContainer.appendChild(kitsCard);

});

onReloadCartBadgeNumber();

addToCartAndWishlistButtonListeners();

function addToCartAndWishlistButtonListeners() {

    var btnAddToCart = document.querySelectorAll(".product-add-to-cart");
    var btnWishlist = document.querySelectorAll(".wishlist-btn");
    var wishlistBtnText = document.querySelectorAll(".wishlist");

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
            storeCartProducts(kits[i]);
            totalCartCost(kits[i]);

        });
    }

    for (let i = 0; i < btnWishlist.length; i++) {

        btnWishlist[i].addEventListener("click", () => {

            storeWishlistProducts(kits[i], wishlistBtnText[i]);
            //  setWishlistButtonState(kits[i]);

        });
    }
}

function storeWishlistProducts(product, text) {

    let wishlistItems = localStorage.getItem('productsInWishlist');
    wishlistItems = JSON.parse(wishlistItems);

    if (wishlistItems != null) {

        if (wishlistItems[product.id] === undefined) {

            wishlistItems = {
                ...wishlistItems,
                [product.id]: product
            }
            wishlistItems[product.id].liked = true;
            text.innerText = "favorite";
            // text.style.color ="red";

        } else {
            wishlistItems[product.id].liked = false;
            delete wishlistItems[product.id];
            text.innerText = "favorite_border";
            text.style.color = "black";

        }
    } else {
        product.liked = true;
        wishlistItems = {
            [product.id]: product
        }
        text.innerText = "favorite";
    }

    localStorage.setItem('productsInWishlist', JSON.stringify(wishlistItems));

    if (Object.keys(wishlistItems).length === 0) {
        localStorage.removeItem("productsInWishlist");
    }

}

//wishlist button state (liked, not liked)
onReloadWishlistButtonState();

function onReloadWishlistButtonState() {
    var text = document.querySelectorAll(".wishlist");
    let items = localStorage.getItem('productsInWishlist');
    items = JSON.parse(items);
    var result = [];
    for (var i in items) {
        result.push(items[i]);
    }

    for (let i = 0; i < result.length; i++) {

        if (items[result[i].id].liked == true) {
            text[result[i].id].innerText = "favorite";
            // text[result[i].id].style.color = "red";
        } else {
            text[result[i].id].innerText = "favorite_border";
            // text[result[i].id].style.color = "black";
        }
    }


}

function createCartBadge(storedCartNumber) {

    var cartBadge = document.createElement("span");
    cartBadge.innerText = storedCartNumber;
    cartBadge.classList.add("cart-badge");

    var outer = document.querySelector(".cart");
    outer.appendChild(cartBadge);

}


function cartBadgeNumber() {

    let numberOfItems = localStorage.getItem('numberOfCartItems');

    numberOfItems = parseInt(numberOfItems);

    if (numberOfItems) {
        localStorage.setItem('numberOfCartItems', numberOfItems + 1);
    } else {
        localStorage.setItem('numberOfCartItems', 1);
    }
}


function onReloadCartBadgeNumber() {
    let items = localStorage.getItem('numberOfCartItems');

    if (items) {
        createCartBadge(items);
    }
}

// store the selected product in local storage
function storeCartProducts(product) {
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
function totalCartCost(product) {

    let cartCost = localStorage.getItem('totalCartCost');

    if (cartCost != null) {
        localStorage.setItem("totalCartCost", Number(cartCost) + Number(product.productPrice));

    } else {
        localStorage.setItem("totalCartCost", product.productPrice);
    }
}


//Filter products
var applyBtn = document.querySelector("#btn-apply");
var clearAllBtn = document.querySelector("#btn-clear");
var checkBoxes = [];
checkBoxes.push(document.querySelector("#home"));
checkBoxes.push(document.querySelector("#away"));
checkBoxes.push(document.querySelector("#third"));


applyBtn.addEventListener("click", () => {
    var checkBoxState = [];
    var formResults = [];

    for (let i = 0; i < checkBoxes.length; i++) {

        checkBoxState.push(checkBoxes[i].checked);

        if (checkBoxes[i].checked === true) {
            formResults.push(checkBoxes[i].value);
        }
    }

    //saving locally
    localStorage.setItem("checkBoxState", JSON.stringify(checkBoxState));

    filterProducts(formResults);
});

clearAllBtn.addEventListener("click", () => {
    localStorage.removeItem("checkBoxState");
    location.reload();
});

function filterProducts(results) {

    let checkedState = localStorage.getItem('checkBoxState');
    checkedState = JSON.parse(checkedState);

    if(checkedState[0]===false && checkedState[1]===false && checkedState[2]===false){}

    var cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = "";

    for (let i = 0; i < kits.length; i++) {

        for (let j = 0; j < results.length; j++) {

            if (kits[i].type === results[j]) {

                cardsContainer.innerHTML += `
                
                <div class="product-card">
                    <div class="product-image">
                        <img src="${kits[i].productImage}" alt="">
                        <button class="wishlist-btn"><span class="material-icons wishlist">favorite_border</span></button>
                    </div>
                    <p class="product-name">${kits[i].productName}</p>
                    <h4 class="product-price">₹ ${kits[i].productPrice}</h4>

                    <button class="product-add-to-cart">Add to Cart</button>
                 </div>
                
                `
            }
        }
    }
    // onReloadCartBadgeNumber();
    // addToCartAndWishlistButtonListeners(); //bug: wishlist and add to cart button not working after filtering
    // onReloadWishlistButtonState();

}
