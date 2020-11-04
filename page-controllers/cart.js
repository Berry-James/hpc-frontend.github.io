// Imports
import { App } from './../components/App.js';
import { Part } from '../components/Part.js';
import { Notify } from '../components/Notify.js';
import { User } from '../components/User.js';

function cartPageController(){
    App.loadPage('Cart', 'template-page-cart', {}, () =>{
        // get div#parts-list
        const partsListDiv = document.querySelector('#parts-list');
        const partsListWrapper = document.querySelector('div.parts-page-wrapper');
        const cartTitle = document.querySelector('h1.page-title');

        // check if user has any items in cart
        if(User.cart.length == 0){
            // no items in cart - show text message within partsListWrapper
            cartTitle.remove();
            partsListWrapper.innerHTML +='<div class="cart-wrapper"><p class="cart-text">Your Cart is empty</p><a href="#parts" class="cart-redirect">Browse parts</a></div><img src="/imgs/cart.jpg" class="vehicle_img cart_img">';
        }else{
            // show cart items
            Part.getByIds(User.cart)
            .then(parts => {
             // loop through parts array
                parts.forEach(part => {
                    const partObj = Part.createPartObj(part);
                 partsListDiv.appendChild(partObj.el);
            });
        })
        .catch(err => {
            console.log(err);
            Notify.show('Problem loading parts');
        });
    }     
    });
}

export { cartPageController }