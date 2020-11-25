// Imports
import { App } from './../components/App.js';
import { Part } from '../components/Part.js';
import { Notify } from '../components/Notify.js';
import { User } from '../components/User.js';
import anime from './../node_modules/animejs/lib/anime.es.js';
import { Modal } from '../components/Modal.js';

function cartPageController(){
    App.loadPage('Cart', 'template-page-cart', {}, () =>{
        // get div#parts-list
        const partsListDiv = document.querySelector('#parts-list');
        const cartTitle = document.querySelector('.cart-title');
        let cartContent = JSON.parse(window.localStorage.getItem('cart'));
        let cartArray = [];
        if(window.localStorage.getItem('cart')){
            cartContent.forEach(id => {
                cartArray.push(id.itemId);
            });
        }

        // check if user has any items in cart
        if(cartArray.length == 0){
            // no items in cart - show text message within partsListWrapper
            cartTitle.querySelector("h1").innerText = 'Your cart is empty';
            document.querySelector(".cart-summary").style.display = 'none';

        }else{
            // preTax price
            let preTax = null;
            // get local storage cart
            // show cart items
            Part.getByIds(cartArray)
            .then(parts => {
             // loop through parts array
                parts.forEach(part => {
                    preTax += part.price;
                    const partObj = Part.createPartObj(part);
                    let buttons = partObj.el.querySelector(".part-btns");
                    partObj.el.removeChild(buttons);
                    const removeBtn = document.createElement("button");
                    removeBtn.innerHTML = '&times;';
                    removeBtn.classList.add("button", "remove-btn");
                    removeBtn.addEventListener("click", () => {
                        User.removePartFromCart(partObj.data._id);
                        partsListDiv.removeChild(partObj.el);
                        User.cartCount --;
                        preTax -= part.price;
                        calcs();

                    });
                    partObj.el.appendChild(removeBtn);
                partsListDiv.appendChild(partObj.el);

            });
            const cartParts = document.querySelectorAll(".part-entry");
            anime({
                targets: cartParts,
                opacity: 1,
                delay: anime.stagger(150)
            })

            function calcs() {
                let tax = preTax * 0.1;
                let postTax = preTax * 1.1;
                const preTaxBox = document.querySelector("#preTax");
                preTaxBox.innerText = `Before tax: ${preTax.toFixed(2)}`;
                const taxBox = document.querySelector("#tax");
                taxBox.innerText = `+ Tax: ${tax.toFixed(2)}`;
                const postTaxBox = document.querySelector("#postTax");
                postTaxBox.innerText = `Total: $${postTax.toFixed(2)}`;
            }

            calcs();



        })
        .catch(err => {
            console.log(err);
            Notify.show('Problem loading parts');
        });
        const modalTemplate = document.querySelector("#template-checkout-modal").innerHTML;
        const output = Mustache.render(modalTemplate);
        const paymentBtn = document.querySelector("#payment-btn");
        paymentBtn.addEventListener('click', () => {
            Modal.show(output)
            const price = document.querySelector("#total-price");
            price.innerText = postTax.innerText;
        })
    }     
    });

}

export { cartPageController }