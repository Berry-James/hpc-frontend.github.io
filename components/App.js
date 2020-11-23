import { Notify } from "./Notify.js";
import { User } from "./User.js";
import { Auth } from "./Auth.js";
import { Nav } from "./Nav.js";
import { Loader } from "./Loader.js";
import anime from './../node_modules/animejs/lib/anime.es.js';
import { Burger } from "./Burger.js";

const App = {
    // properties
    name: "Parts App",
    version: "1.0.0",
    author: "James Berry",
    rootEL: document.querySelector("#app"),
    routes: {},
    homeSearchStorage: [],

    // methods
    init: () => {
        Notify.init();
        Auth.check(() => {
            App.router();
            window.addEventListener('hashchange', App.router);
            User.getCart();
        
    });
},

    addRoute: (path, pageController) => {
        // adding an entry to App.routes
        App.routes[path] = {
            controller: pageController
        }
    },

    router: () => {
        // get the current hash location
        const path = location.hash || '#';
        // find route for this path in App.routes
        const route = App.routes[path];
        // if route exists for this path
        if(route){
            route.controller();
        // run the route.controller
        }else{
        // show 404 alert
            App.loadPage('404 Page/File Not Found', 'template-page-404', {});
        }
    },

    loadPage: (title, templateId, data, callback) => {
        // set document title
        document.title = title;

        // grab the template and store in a variable
        let template = document.querySelector(`#${templateId}`).innerHTML;
        let output = Mustache.render(template, data);

        // insert the output HTML into the rootEL
        App.rootEL.innerHTML = output;
        App.loadNav();

        // run the callback (if it exists)
        if( typeof callback == 'function' ){
            callback();
        }
    },


    loadNav: () => {
        // get nav template
        const template = document.querySelector("#template-navbar").innerHTML;
        let header = document.querySelector(".page-header");
        let output = Mustache.render(template);
        header.innerHTML = output;

        let signBtn = document.querySelector(".signInBtn");
        signBtn.tag = document.createElement("i");
        let text = document.createElement("p");

        const burgerBtn = document.querySelector(".hamburger");
        burgerBtn.addEventListener("click", () => {
            Burger.toggle();
        })

        if(Auth.authenticated) {
            text.innerText = 'Sign Out';
            signBtn.href = '#signOut';
            signBtn.tag.classList.add("fas", "fa-sign-out-alt");
            signBtn.appendChild(signBtn.tag);
            signBtn.appendChild(text);


        } else {
            text.innerText = 'Sign In';
            signBtn.href = "#signIn";
            signBtn.tag.classList.add("fas", "fa-sign-in-alt");
            signBtn.appendChild(signBtn.tag);
            signBtn.appendChild(text);

        }

        const cartBtn = document.querySelector(".cart-icon")
        const navBar = document.querySelector(".nav-bar");

        if(window.location.hash == '') {
            cartBtn.classList.add("cart-light");
            cartBtn.classList.remove("cart-dark");

        } else {
            cartBtn.classList.add("cart-dark");
            cartBtn.classList.remove("cart-light");
            navBar.classList.add("is-dark");
        }
        User.updateCartCount();
        Nav.events();

    },

    refreshNav: () => {
        // get the current path
        let currentPath = location.hash || '#';
        let navItems = document.querySelectorAll('#main-nav > a');
        navItems.forEach((navLink) => { 
            if( navLink.getAttribute('href') == currentPath){
                navLink.classList.add('active');
        }
        });
    },

    homeSearch: () => {
        window.location.href = "#parts"

        const partsContainer = document.querySelector(".parts-container");
        partsContainer.innerHTML = null;
        App.homeSearchStorage.forEach(item => {
            partsContainer.appendChild(item);
        }) 
    }


}

export { App }