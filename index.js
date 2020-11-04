// Import Components ---------------------------
import { App } from './components/App.js';

// Import Page Controllers
import { homePageController } from './page-controllers/home.js';
import { partsPageController } from './page-controllers/parts.js';
import { userProfileController } from './page-controllers/user.js';
import { cartPageController } from './page-controllers/cart.js';
import { signUpPageController } from './page-controllers/signUp.js';
import { signInPageController } from './page-controllers/signIn.js';
import { Auth } from './components/Auth.js';
import { Modal } from './components/Modal.js';

// Page Controllers ------------------

// Routes ----------------------------
// # (home)
App.addRoute('#', homePageController);

// #parts
App.addRoute('#parts', partsPageController);

// #userProfile
App.addRoute('#userProfile', userProfileController);

// #cart
App.addRoute('#cart', cartPageController);

// #signUp
App.addRoute('#signUp', signUpPageController);

// #signIn
App.addRoute('#signIn', signInPageController);

// #signOut
App.addRoute('#signOut', () => {
   // Auth.signOut();
   Auth.signOutModal();

});

// Load app --------------------------
document.addEventListener('DOMContentLoaded', App.init );