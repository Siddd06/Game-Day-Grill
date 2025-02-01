    // const names = ["Buffalo Chicken Pizza", "Big Beefy Burger", "Margherita Pizza", "Hot Habanero Wings", "French Fries", "Combo Pizza", "Chicken Sandwich", "Fish Fillet Sandwich", "Cauliflower Wings"];

    // const prices = [20, 15, 17, 18, 10, 15, 12, 14, 10];

    // const images = ["/static/images/f1.png", "/static/images/f2.png", "/static/images/f3.png", "/static/images/f4.jpg", "/static/images/f5.png", "/static/images/f6.png", "/static/images/f7.png", "/static/images/f8.png", "/static/images/f9.jpg"];

    // const shopping_cart = []

    // // document.getElementById("shopping-cart-1").addEventListener("click", function() {
    // //     updateCart(1);
    // //   });

    // window.addEventListener("DOMContentLoaded", (event) => {
    //     const el1 = document.getElementById("shopping-cart-1");
    //     const el2 = document.getElementById("shopping-cart-2");
    //     const el3 = document.getElementById("shopping-cart-3");
    //     const el4 = document.getElementById("shopping-cart-4");
    //     const el5 = document.getElementById("shopping-cart-5");
    //     const el6 = document.getElementById("shopping-cart-6");
    //     const el7 = document.getElementById("shopping-cart-7");
    //     const el8 = document.getElementById("shopping-cart-8");
    //     const el9 = document.getElementById("shopping-cart-9");
    //     if (el1) {
    //       el1.addEventListener("click", function() {
    //         shopping_cart.push(1);
    //       });
    //     }
    //   if (el2) {
    //     el2.addEventListener("click", function() {
    //       shopping_cart.push(2);
    //     });
    //   }
    //   if (el3) {
    //     el3.addEventListener("click", function() {
    //       shopping_cart.push(3);
    //     });
    //   }
    //   if (el4) {
    //     el4.addEventListener("click", function() {
    //       shopping_cart.push(4);
    //     });
    //   }
    //   if (el5) {
    //     el5.addEventListener("click", function() {
    //       shopping_cart.push(5);
    //     });
    //   }
    //   if (el6) {
    //     el6.addEventListener("click", function() {
    //       shopping_cart.push(6);
    //     });
    //   }
    //   if (el7) {
    //     el7.addEventListener("click", function() {
    //       shopping_cart.push(7);
    //     });
    //   }
    //   if (el8) {
    //     el8.addEventListener("click", function() {
    //       shopping_cart.push(8);
    //     });
    //   }
    //   if (el9) {
    //     el9.addEventListener("click", function() {
    //       shopping_cart.push(9);
    //     });
    //   }
    // });



    // // function updateCart() {
    // //     console.log(1);
    // // }
    // // const cardContainer = document.getElementById('card-container');

    // // function createCard(title, content) {
    // //     const card = document.createElement('div');
    // //     card.classList.add('card');

    // //     const cardTitle = document.createElement('h2');
    // //     cardTitle.textContent = title;

    // //     const cardContent = document.createElement('p');
    // //     cardContent.textContent = content;

    // //     card.appendChild(cardTitle);
    // //     card.appendChild(cardContent);

    // //     return card;
    // // }

    // // // Example usage
    // // const card1 = createCard('Dynamic Cards 101', 'Learn how to spice up your web page with dynamic card rendering!');
    // // const card2 = createCard('The Power of Flexibility', 'Discover the endless possibilities of dynamic content.');

    // // cardContainer.appendChild(card1);
    // // cardContainer.appendChild(card2);


    /* Image Filter Section */

    const allFilterItems = document.querySelectorAll('.filter-item');
    const allFilterBtns = document.querySelectorAll('.filter-btn');

    window.addEventListener('DOMContentLoaded', () => {
        allFilterBtns[1].classList.add('active-btn');
    });

    allFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            showFilteredContent(btn);
        });
    });

    function showFilteredContent(btn){
        allFilterItems.forEach((item) => {
            if(item.classList.contains(btn.id)){
                resetActiveBtn();
                btn.classList.add('active-btn');
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    function resetActiveBtn(){
        allFilterBtns.forEach((btn) => {
            btn.classList.remove('active-btn');
        });
    }


    /* Shopping Cart Section */
    if (document.readyState == 'loading'){
        document.addEventListener('DOMContentLoaded' , ready);
    }

    else{
        ready();
    }


     function ready(){
        var removeCartItemButton = document.getElementsByClassName('btn-danger');
        for (var i = 0 ; i < removeCartItemButton.length; i++){
            var button = removeCartItemButton[i];
            button.addEventListener('click', removeCartItem)
        }

        var quantityInputs = document.getElementsByClassName('cart-quantity-input');
        for(var i = 0 ;i < quantityInputs.length ; i++){
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged);
        }

        var addToCartButtons = document.getElementsByClassName('shop-item-button');
        for(var i = 0; i< addToCartButtons.length; i++){
            var button = addToCartButtons[i];
            button.addEventListener('click',addToCartClicked)
        }

        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
     }


     function purchaseClicked(){
         alert('Thank you for your purchase!!!');
         var cartItems = document.getElementsByClassName('cart-items')[0];
         while(cartItems.hasChildNodes()){
             cartItems.removeChild(cartItems.firstChild)
         }
         updateCartTotal();
     }

    function removeCartItem(event){
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();

    }

    function  quantityChanged(event){
        var input = event.target;
        if(isNaN(input.value) || input.value <= 0 ){
            input.value = 1;
        }
        updateCartTotal();
    }


    function addToCartClicked(event){
        var button = event.target;
        var shopItem = button.parentElement.parentElement;
        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
        var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
        addItemToCart(title,price,imageSrc);
        updateCartTotal();
    }

    function addItemToCart(title, price, imageSrc){
        var cartRow = document.createElement('tr');
        cartRow.classList.add('cart-row');
        var cartItems = document.getElementsByClassName('cart-items')[0];
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
        sessionStorage.setItem("cart", cartItemNames);

        for (i = 0; i< cartItemNames.length ; i++){
            if(cartItemNames[i].innerText == title){
                alert('This item already has added to the cart!');
                return
            }
        }
        var cartRowContents = `

            <td class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="50" height="50">
                <span class="cart-item-title">${title}</span>                  
            </td>
            <td class="cart-item cart-column">
                <span class="cart-price cart-column">${price}</span>
            </td>
            <td class="cart-item cart-column">
                <input class="cart-quantity-input" type="number" value="1" style="width: 50px">
                <button class="btn btn-danger" type="button">Remove</button>
            </td>        
        `;


        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    }


    function updateCartTotal(){
        var cartItemContainer = document.getElementsByClassName('cart-items')[0];
        var cartRows = cartItemContainer.getElementsByClassName('cart-row');
        var total = 0;
        for (var i = 0 ; i< cartRows.length ; i++){
            var cartRow =cartRows[i];
            var priceElement = cartRow.getElementsByClassName('cart-price')[0];
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
            var price = parseFloat(priceElement.innerText.replace('$ ' , ''))
            var quantity = quantityElement.value;
            total = total + (price * quantity);

        }
        total = Math.round(total * 100 )/100;
        document.getElementsByClassName('cart-total-price')[0].innerText = '$ '+ total + '.00';
    }
