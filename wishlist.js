let cartNumber = localStorage.getItem('numberOfCartItems');
let productsInWishlist = localStorage.getItem('productsInWishlist');
var myWishlistProductCards = document.querySelector(".only-product-cards");

setCartBadge(cartNumber);
displayWishlist();

function setCartBadge(cartNumber) {

    if (cartNumber) {
        var cartBadge = document.createElement("span");
        cartBadge.innerText = cartNumber;
        cartBadge.classList.add("cart-badge");

        var outer = document.querySelector(".cart");
        outer.appendChild(cartBadge);
    }
}

function displayWishlist() {

    myWishlistProductCards.innerHTML = "";
    productsInWishlist = JSON.parse(productsInWishlist);

    if (productsInWishlist) {

        Object.values(productsInWishlist).map(item => {

            if (item.productTag === "boots") {

                myWishlistProductCards.innerHTML += `
            
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

                    </div>

                   

                    <div class="product-card-btns-div">
                       <a href="/wishlist.html"><button id="delete-btn"><span class="material-icons" >delete</span></button> </a><br>
                        <button id="move-to-wishlist-btn">MOVE TO CART</button>
                    </div>
                </div>

                `
            } else if (item.productTag === "kits") {

                myWishlistProductCards.innerHTML += `
            
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

                    </div>

                    <div class="product-card-btns-div">
                        <a href="/wishlist.html"><button id="delete-btn"><span class="material-icons" >delete</span></button> </a><br>
                        <button id="move-to-wishlist-btn">MOVE TO CART</button>
                    </div>
                </div>

                `

            }

        });
        deleteAndCart();

    } else {
        emptyWishlistInitializer();
    }

}

function deleteAndCart() {

    const deleteButton = document.querySelectorAll("#delete-btn");
    var result = [];

    for (var i in productsInWishlist) {
        result.push(productsInWishlist[i]);
    }

    for (let i = 0; i < deleteButton.length; i++) {

        deleteButton[i].addEventListener("click", () => {

            console.log(i + " button clicked");
            // let deletedItems = productsInWishlist[result[i].id].liked;

            productsInWishlist[result[i].id].liked = false;
            delete productsInWishlist[result[i].id];

            //saving locally
            localChanges();

            if (Object.keys(productsInWishlist).length === 0) {
                localStorage.removeItem("productsInWishlist");
                emptyCartInitializer();
            }
        });

    }
}

function localChanges() {

    localStorage.setItem('productsInWishlist', JSON.stringify(productsInWishlist));

}

function emptyWishlistInitializer() {

    myWishlistProductCards.innerHTML = `
        
    <div class="empty-cart-div">
       <p>No Item in your Wishlist :( </p> 
        <a href="/index.html"><button class="explore-now-btn"> Explore Now!</button></a>
    </div>
    
    `
}