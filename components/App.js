import { Notify } from "./Notify.js";
import { User } from "./User.js";
import { Auth } from "./Auth.js";

const App = {
    // properties
    name: "Parts App",
    version: "1.0.0",
    author: "James Berry",
    rootEL: document.querySelector("#app"),
    routes: {},

    // methods
    init: () => {
        Notify.init();
        Auth.check(() => {
            App.router();
            window.addEventListener('hashchange', App.router);
        
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
        // get main nav div
        let sideNav = document.querySelector('#side-nav')
        let mainNav = document.querySelector('#main-nav');
        mainNav.innerHTML = `
        <a href="#">Home</a>
        <a href="#parts">Parts</a>
        <a href="#cart" id="nav-item-cart">Cart</a>`
        if(Auth.authenticated){
            // signed in - show nav item (profile, sign out)
            sideNav.innerHTML += `<a href="#userProfile"><i class="fas fa-user profile-icon"></i></a>
            <a href="#signOut">Sign Out</a>`;
            
        }else{
            // not signed in - show nav items (sign in)
            sideNav.innerHTML += `
            <a href="#signIn" class="signInBtn">Sign In</a>`;
        }
        
        App.refreshNav();
        User.updateCartCount();
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
    }
}

export { App }