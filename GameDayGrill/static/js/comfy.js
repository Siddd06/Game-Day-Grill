"strict";

const cartbutton = document.querySelector(".cart-btn");
const closeCartbtn = document.querySelector(".close-cart");
const clearCartbtn = document.querySelector(".clear-cart");

const CartDom = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDom = document.querySelector(".products-center");
const showcart = document.querySelector(".showcart");

//cart items
let cart = [];
let buttonsDom = [];

const showCart = function () {
  cartOverlay.classList.add("transparentBcg");
  CartDom.classList.add("showcart");
  CartDom.style.transform = "translateX(0)";
};

const close = function () {
  cartOverlay.classList.remove("showcart");
  cartOverlay.classList.remove("transparentBcg");
  CartDom.style.transform = "translateX(100%)";
};
closeCartbtn.addEventListener("click", close);

cartbutton.addEventListener("click", showCart);

document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    !cartOverlay.classList.contains("hidden") &&
    !CartDom.classList.contains("translateX(100%)")
  ) {
    close();
  }
});
//getting the products

class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      // let products = data.items;

      let products = [...data.items];
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });

      return products;
    } catch (error) {
      // merge between the products in the json file and the ones in the contentful
    }
    console.log(error);
  }
}

//display produccts

class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += ` <article class="product">
        <div class="img-container">
          <img src=${product.image} alt="" class="product-img" />
          <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-cart-shopping"></i>Add to the cart
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>${product.price}$</h4>
      </article>`;
    });
    productsDom.innerHTML = result;
    // productsDom.textContent = result;
  }

  getBagButtons() {
    const btns = [...document.querySelectorAll(".bag-btn")];
    buttonsDom = btns;
    btns.forEach((button) => {
      let id = button.dataset.id;
      let incart = cart.find((item) => item.id === id);
      if (incart) {
        button.innerText = "IN CART";
        button.disabled = true;
      }
      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = true;

        //get product from products
        let cartItem = { ...Storage.getProducts(id), amount: 1 };

        //add product to the cart
        cart = [...cart, cartItem];

        //save cart in local storgae
        Storage.saveCart(cart);
        //set cart values
        this.setCartValues(cart);

        //add cart item and display it
        this.addCartItem(cartItem);

        this.showCart(cart);

        // this.cartLogic(cart);

        //show the cart
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));

    cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<img src=${item.image} alt="">
    <div>
      <h4>${item.title}</h4>
      <h5>${item.price}$</h5>
      <span class="remove-item" data-id=${item.id}>remove</span>
  </div>
  <div>
    <i class="fas fa-chevron-up" data-id=${item.id}></i>
    <p class="item-amount">${item.amount}</p>
    <i class="fas fa-chevron-down" data-id=${item.id}></i>
  </div>`;
    cartContent.appendChild(div);
  }
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    CartDom.classList.add("showcart");
    CartDom.style.transform = "translateX(0%)";
  }
  hidecart() {
    cartOverlay.classList.remove("transparentBcg");
    CartDom.classList.remove("showcart");
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populate(cart);
  }
  populate(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  cartLogic() {
    //clear cart items
    clearCartbtn.addEventListener("click", () => {
      this.clearCart();
    });
    //functions for the remove button and increase ,decrease the number of products
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        //to remove it from the dom , we have to remove the parent
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;

        let id = addAmount.dataset.id;

        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        // console.log({ addAmount, id, tempItem });
        Storage.saveCart(cart);
        this.setCartValues(cart);

        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;

        let id = lowerAmount.dataset.id;

        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;

        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          this.removeItem(id);
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
        }
      }
    });
  }
  //cart functionality

  clearCart() {
    let cartItems = cart.map((item) => item.id);

    // console.log(cartItems);
    cartItems.forEach((id) => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hidecart();
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class='fas fa-shopping-cart'></i>add to cart`;
  }
  getSingleButton(id) {
    return buttonsDom.find((button) => button.dataset.id === id);
  }
}

//local storage

class Storage {
  static saveproducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProducts(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart(cart) {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  //set up application
  ui.setupAPP();

  // get products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveproducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });
});