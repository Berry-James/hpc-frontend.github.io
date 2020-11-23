import { App } from "./App.js";
import anime from './../node_modules/animejs/lib/anime.es.js';
import { Notify } from "./Notify.js";

const User = {
    firstName: null,
    lastName: null,
    email: null,
    lastLogin: null,
    vehicle: null,
    vehicleImg: null,
    cart: [],
    cartCount: null,

    create: (userData) => {
        // send userData to backend API using fetch - POST
        fetch('https://hpc-backend.herokuapp.com/api/users', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
        .then(res => {
            if(res.status != 201){
                // problem creating user
                Notify.show("Problem Creating User");
            }else{
                // user created successfully
                Notify.show("User Account Created");
                // redirect user to the sign in page #signIn
                const formWrap = document.querySelector(".form-wrapper")
                formWrap.classList.remove("signIn-switch");
                formWrap.classList.add("signUp-switch");
                Notify.show("Please Sign in");
            }
        })
        .catch(err => {
            console.log(err);
            Notify.show("Problem Creating User");
        })
    },

    update: () => {

    },

    delete: () => {

    },

    displayProfile: () => {

    },

    addPartToCart: (id) => {
        let cart = [];

        // add the id into User.cart
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        if(cart.indexOf(id) === -1) {
            cart.push({'itemId' : id});
            localStorage.setItem('cart', JSON.stringify(cart))
            User.cart.push(id);
            User.updateCartCount();
        } else if(cart.indexOf(id) >= 1) {
            alert('part already in cart')
        }


    },

    removePartFromCart: (id) => {
        let cart = JSON.parse((localStorage.getItem('cart')));
        let cartItems = cart.filter(item => item.itemId !== id );
        localStorage.setItem('cart', JSON.stringify(cartItems));
        const index = User.cart.indexOf(id);
        if(index > -1 ) {
            User.cart.splice(index, 1);
        }
    },

    updateCart: () => {

        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({ 'productId' : productId + 1 });
        localStorage.setItem('cart', JSON.stringify(products));
        
    },

    getCart: () => {
        const cartLocal = JSON.parse(localStorage.getItem("cart"));

        if(cartLocal){
            cartLocal.forEach(item => {
                User.cart.push(item.itemId)
            })
        }
    },

    updateCartCount: () => {
        // get the cart count (number of items in that array)
        let cartCount = null;
        let cartContent = JSON.parse(localStorage.getItem('cart'));
        if(!cartContent) {
            return;
        } else {
            cartContent.forEach(item => {
                cartCount++;
            })
        }

        // check if cart-count is greater than zero
        if(cartCount > 0){
            // check if cartCountSpan is there
            let cartCountSpanExisting = document.querySelector('#cart-count');
            if(cartCountSpanExisting){
                cartCountSpanExisting.innerText = cartCount;
            }else{
                // span doesn't exist yet - create it
                const navItemCart = document.querySelector('.cart-icon');
                let cartCountSpan = document.createElement('span');
                cartCountSpan.setAttribute('id', 'cart-count');
                cartCountSpan.innerText = cartCount;
                navItemCart.appendChild(cartCountSpan);
            }   
        }else{
            // remove existing span if it is there
            let cartCountSpanExisting = document.querySelector('#cart-count');
            if(cartCountSpanExisting){
                cartCountSpanExisting.remove();
            }
        } 
    },
    // Change the background image on the user's page depending on the vehicle they chose during signup
    vehicleImgUpdate(){
        if(User.vehicle == '1988 Honda CRX'){
            User.vehicleImg = 'https://i.imgur.com/0ULSWXT.jpg';
        }else if(User.vehicle == '1988 Honda CIVIC'){
            User.vehicleImg = 'https://live.staticflickr.com/7427/9219159690_12159c8b95_h.jpg';
        }else if(User.vehicle == '1988 Honda PRELUDE'){
            User.vehicleImg = 'https://i.imgur.com/fuuSKJm.jpg';
        }else if(User.vehicle == '1989 Honda INTEGRA')
            User.vehicleImg = 'https://i.imgur.com/dawoqQN.jpg';
    },
}




export { User }
