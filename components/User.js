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

    create: (userData) => {
        // send userData to backend API using fetch - POST
        fetch('https://recorderly.herokuapp.com/api/users', {
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
                location.hash = '#signIn';
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
        console.log(`Adding part id ${id} to User.cart`);
        // add the id into User.cart
        User.cart.push(id);
        console.log(User.cart);
        User.updateCartCount();

    },

    removePartFromCart: (id) => {
        console.log(`removing book id ${id} from User.cart`);
        // get the index of the id in the User.cart array
        const index = User.cart.indexOf(id);
        if (index > -1) {
            User.cart.splice(index, 1);
        }
        console.log(User.cart);
        User.updateCartCount();
    },

    updateCartCount: () => {
        // get the cart count (number of items in that array)
        let cartCount = User.cart.length;
        // check if cart-count is greater than zero
        if(cartCount > 0){
            // check if cartCountSpan is there
            let cartCountSpanExisting = document.querySelector('#cart-count');
            if(cartCountSpanExisting){
                cartCountSpanExisting.innerText = cartCount;
            }else{
                // span doesn't exist yet - create it
                let navItemCart = document.querySelector('#nav-item-cart');
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