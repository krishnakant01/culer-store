let cartNumber = localStorage.getItem('numberOfCartItems');
let productsInCart = localStorage.getItem('productsInCart');
let totalCost = localStorage.getItem('totalCartCost');
var myCartProductCards = document.querySelector(".only-product-cards");
var buttonDiv = document.querySelector(".checkout-btn-div");

setCartBadge(cartNumber);
displayCart();

function setCartBadge(cartNumber) {

    if (cartNumber) {
        var cartBadge = document.createElement("span");
        cartBadge.innerText = cartNumber;
        cartBadge.classList.add("cart-badge");

        var outer = document.querySelector(".cart");
        outer.appendChild(cartBadge);
    }
}

function displayCart() {

    myCartProductCards.innerHTML = "";
    productsInCart = JSON.parse(productsInCart);

    if (productsInCart) {

        Object.values(productsInCart).map(item => {

            if (item.productTag === "boots") {

                myCartProductCards.innerHTML += `
            
                <div class="my-cart-product-card">

                    <div class="my-cart-product-image-div">
                        <img src="${item.productImage}" alt="">
                    </div>

                    <div class="my-cart-product-description-div">
                        <p class="my-cart-product-name">${item.productName}</p>
                        <h4 class="my-cart-product-price">₹ ${item.productPrice}</h4>
                        
                        <label for="size">Size:</label>
                        <select name="size" id="size">
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                        </select>

                        <div class="quantity-btns">
                        <button class="horizontal-card-btn" id="increment-btn">+</button>
                        <span class="quantity">${item.inCart}</span>
                        <button class="horizontal-card-btn" id="decrement-btn">-</button>
                        </div>
                    </div>

                    <div>
                        <h4 class="expected-delivery">Expected Delivery: Wed, 26 Oct</h4>
                        <span class="replace-info">10 days replacement policy</span>
                    </div>

                    <div class="product-card-btns-div">
                       <a href="/cart.html"><button id="delete-btn"><span class="material-icons" >delete</span></button> </a><br>
                        <button id="move-to-wishlist-btn">MOVE TO WISHLIST</button>
                    </div>
                </div>

                `
            } else if (item.productTag === "kits") {

                myCartProductCards.innerHTML += `
            
                <div class="my-cart-product-card">

                    <div class="my-cart-product-image-div">
                        <img src="${item.productImage}" alt="">
                    </div>

                    <div class="my-cart-product-description-div">
                        <p class="my-cart-product-name">${item.productName}</p>
                        <h4 class="my-cart-product-price">₹ ${item.productPrice}</h4>

                        <label for="size">Size:</label>
                        <select name="size" id="size">
                            <option value="small">S</option>
                            <option value="medium">M</option>
                            <option value="large">L</option>
                            <option value="x-large">XL</option>
                        </select>

                        <div class="quantity-btns">
                            <button class="horizontal-card-btn" id="increment-btn">+</button>
                            <span class="quantity">${item.inCart}</span>
                            <button class="horizontal-card-btn" id="decrement-btn">-</button>
                        </div>
                    </div>

                    <div>
                        <h4 class="expected-delivery">Expected Delivery: Wed, 26 Oct</h4>
                        <span class="replace-info">10 days replacement policy</span>
                    </div>

                    <div class="product-card-btns-div">
                        <a href="/cart.html"><button id="delete-btn"><span class="material-icons" >delete</span></button> </a><br>
                        <button id="move-to-wishlist-btn">MOVE TO WISHLIST</button>
                    </div>
                </div>

                `

            }

        });
        setCartCost();
        changeQuantity();
        deleteAndWishlist();

    } else {
        emptyCartInitializer();
    }

}
var cartBadge = document.querySelector(".cart-badge");

function changeQuantity() {

    const incrementButton = document.querySelectorAll("#increment-btn");
    const decrementButton = document.querySelectorAll("#decrement-btn");
    var quantity = document.querySelectorAll(".quantity");
    var result = [];

    for (var i in productsInCart) {
        result.push(productsInCart[i]);
    }

    cartNumber = Number(cartNumber);
    totalCost = Number(totalCost);

    for (let i = 0; i < incrementButton.length; i++) {

        incrementButton[i].addEventListener("click", () => {
            //incrementing values
            cartNumber++;
            productsInCart[result[i].id].inCart += 1;
            totalCost += Number(productsInCart[result[i].id].productPrice);

            //setting it on the page
            cartBadge.innerText = cartNumber;
            quantity[i].innerText = productsInCart[result[i].id].inCart;


            //saving locally
            localChanges();

            //setting cost
            setCartCost();
        });
        decrementButton[i].addEventListener("click", () => {
            if (productsInCart[result[i].id].inCart > 1) {
                //incrementing values
                cartNumber--;
                productsInCart[result[i].id].inCart -= 1;
                totalCost -= Number(productsInCart[result[i].id].productPrice);

                //setting it on the page
                cartBadge.innerText = cartNumber;
                quantity[i].innerText = productsInCart[result[i].id].inCart;
                //  decrementButton[i].style.backgroundColor = "gray";

                //saving locally
                localChanges();

                //setting cost
                setCartCost();
            }
        });

    }
}

function deleteAndWishlist() {

    const deleteButton = document.querySelectorAll("#delete-btn");
    var result = [];

    for (var i in productsInCart) {
        result.push(productsInCart[i]);
    }

    for (let i = 0; i < deleteButton.length; i++) {

        deleteButton[i].addEventListener("click", () => {


            let deletedItems = productsInCart[result[i].id].inCart;
            cartNumber -= deletedItems;
            cartBadge.innerText = cartNumber;

            totalCost -= deletedItems * productsInCart[result[i].id].productPrice;

            productsInCart[result[i].id].inCart = 0;
            delete productsInCart[result[i].id];

            //saving locally
            localChanges();

            //setting cost
            setCartCost();

            if (cartNumber === 0) {
                localStorage.removeItem('numberOfCartItems');
                localStorage.removeItem('productsInCart');
                localStorage.removeItem('totalCartCost');
                emptyCartInitializer();
            }
        });

    }
}

function emptyCartInitializer() {
    myCartProductCards.innerHTML = `
        
    <div class="empty-cart-div">
       <p>No Item in the Cart :( </p> 
        <a href="/index.html"><button class="explore-now-btn"> Explore Now!</button></a>
    </div>
    
    `
    buttonDiv.style.display = "none";

}

function localChanges() {
    localStorage.setItem("numberOfCartItems", cartNumber);
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    localStorage.setItem("totalCartCost", totalCost);
}

function setCartCost() {
    var price = document.querySelector("#price-info");
    var discount = document.querySelector("#discount-info");
    var deliveryCharges = document.querySelector("#delivery-charges-info");
    var finalPrice = document.querySelector("#total");
    const discDisplay = document.querySelector(".disc-display");

    let pri = Number(totalCost);
    let disc = 0;
    let delivery = 0;
    let fp = 0;

    discDisplay.style.display = "none";
    deliveryCharges.style.color = "black";
    price.innerText = "₹ " + pri;

    if (Number(totalCost) > 30000) {
        disc = 0.1 * pri;
        discount.innerText = "- ₹ " + disc.toFixed(1);
        discDisplay.innerText = "10% Discount applied.";
        discDisplay.style.display = "block";
    } else {
        discount.innerText = "- ₹ " + disc;
    }

    if (Number(totalCost > 10000 && totalCost != 0)) {
        deliveryCharges.innerText = "FREE";
        deliveryCharges.style.color = "green";
    } else {
        delivery = 500;
        deliveryCharges.innerText = "+ ₹ " + delivery;
    }

    fp = pri + delivery - disc.toFixed(1);
    finalPrice.innerText = "₹ " + fp;
}