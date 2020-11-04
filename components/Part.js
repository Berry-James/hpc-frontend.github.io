import { App } from "./App.js";
import { Modal } from "./Modal.js";
import { User } from "./User.js";
import { Notify } from "./Notify.js";



const Part = {
    get: () => {
        // return new promise
        return new Promise((resolve, reject) => {
        // fetch parts.json
        fetch('https://recorderly.herokuapp.com/api/parts')
        .then(res => res.json())
        .then(parts => {
            resolve(parts);
        })
        .catch(err => {
            reject(err);
        })
    });
       
    },

    getCategories: () => {
        // return new promise
        return new Promise((resolve, reject) => {
        // fetch parts.json
        fetch('https://recorderly.herokuapp.com/api/categories')
        .then(res => res.json())
        .then(categories => {
            resolve(categories);
        })
        .catch(err => {
            reject(err);
        })
    });
        
    }, 

    getVehicles: () => {
        // return new promise
        return new Promise((resolve, reject) => {
        // fetch vehicles.json
        fetch('https://recorderly.herokuapp.com/api/vehicles')
        .then(res => res.json())
        .then(vehicles => {
            resolve(vehicles);
        })
        .catch(err => {
            reject(err);
        })
        });
    },

    getInVehicles: (vehicleId) => {
        // return new promise
        return new Promise((resolve, reject) => {
        // fetch parts
        let url = new URL('https://recorderly.herokuapp.com/api/parts');
        let params = { vehicle: vehicleId};
        url.search = new URLSearchParams(params).toString();

        fetch(url)
        .then(res => res.json())
        .then(parts => {
            resolve(parts);
            console.log(url);
        })
        .catch(err => {
            reject(err);
        })
    });
       
    },

    getByIds: (ids) => {
        // return new promise
        return new Promise((resolve, reject) => {
        // fetch parts
        let url = new URL('https://recorderly.herokuapp.com/api/parts');
        let params = { ids: ids};
        url.search = new URLSearchParams(params).toString();

        fetch(url)
        .then(res => res.json())
        .then(parts => {
            resolve(parts);
            console.log(url);
        })
        .catch(err => {
            reject(err);
        })
    });
       
    },

    getByName: (partName) => {
        // return new promise
        return new Promise((resolve, reject) => {
        // fetch parts
        let url = new URL('https://recorderly.herokuapp.com/api/parts');
        let params = { name: partName};
        url.search = new URLSearchParams(params).toString();

        fetch(url)
        .then(res => res.json())
        .then(parts => {
            resolve(parts);
            console.log(partName);
        })
        .catch(err => {
            reject(err);
        })
    });
    },

    getInCategory: (categoryId) => {
        // return new promise
        return new Promise((resolve, reject) => {
        // fetch parts
        let url = new URL('https://recorderly.herokuapp.com/api/parts');
        let params = { category: categoryId};
        url.search = new URLSearchParams(params).toString();

        fetch(url)
        .then(res => res.json())
        .then(parts => {
            resolve(parts);
            console.log(url);
        })
        .catch(err => {
            reject(err);
        })
    });   
    },

    createPartObj: (data) => {
        // create empty object
        const partObj = {};
        // set data from parameter
        partObj.data = data;
        // get template HTML
        partObj.template = document.querySelector('#template-part-entry').innerHTML;
        // create div element
        partObj.el = document.createElement('div');

        // render()
        partObj.render = () => {
            // set div class name
            partObj.el.className = 'part-entry';
            // set part id to data.id
            partObj.el.setAttribute('id', `part-${partObj.data._id}`);

            // if part is in User.cart
            if( User.cart.includes(partObj.data._id) ){
                partObj.el.classList.add('in-cart');
            }

            // render HTML using mustache template
            partObj.el.innerHTML = Mustache.render(partObj.template, partObj.data);
            // run events()
            partObj.events();
        }

        // events()
        partObj.events = () => {
            // get view-part-btn
            const viewPartBtn = partObj.el.querySelector('.view-part-btn');
            viewPartBtn.addEventListener('click', () => {
                Part.showModal(partObj);
            });
        }

        // run render()
        partObj.render();

        // return the object
        return partObj;
    },

    showModal: (partObj) => {
        // get modal template
        const modalTemplate = document.querySelector('#template-part-modal').innerHTML;
        // render modal content with mustache
        const modalContent = Mustache.render(modalTemplate, partObj.data);
        // show modal
        Modal.show(modalContent);

        // check if part is in cart
        if(User.cart.includes(partObj.data._id)){
            // get cart btn
            let cartBtn = document.querySelector('.modal .cart-btn');
            // change btn text to 'remove from cart'
            cartBtn.innerText = 'Remove from Cart';
        }

        // get cartBtn
        const cartBtn = document.querySelector('.modal .cart-btn');
        // click event
        cartBtn.addEventListener('click', () => {
            // if part is already in user.cart
            if( User.cart.includes(partObj.data._id) ){
                // remove from user.cart using user.removePartFromCart
                User.removePartFromCart(partObj.data._id);
                Notify.show("Remove from cart")
            }else{
                // else add part to user.cart using user.addPartToCart()
                User.addPartToCart(partObj.data._id);
                Notify.show("Added to cart")
            }
            // re-render our partObj.el
            partObj.render();

            // remove modal Modal.remove()
            Modal.remove();
        });
    }
}

export { Part }