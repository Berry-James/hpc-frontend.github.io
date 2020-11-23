// Import Components ---------------------------
import { App } from './components/App.js';
import { User } from './components/User.js';

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
App.addRoute('#signUp', () => {
/*    
   const formWrapper = document.querySelector(".form-wrapper");
   formWrapper.right = formWrapper.querySelector(".form-right");
   const template = document.querySelector("#template-sign-up-new").innerHTML;
   const output = Mustache.render(template);
   formWrapper.right.innerHTML = output;
   formWrapper.left = formWrapper.querySelector(".form-left");
   console.log(formWrapper);

   const signUpForm = document.querySelector('#form-sign-up')
   signUpForm.addEventListener('submit', (e) => {
      // prevent the form from loading new page
      e.preventDefault();
      // create formData object
      let formData = new FormData(signUpForm);
      // create empty object
      let formDataObj = {};
      // loop through formData entries
      for(let field of formData.entries()){
        //  console.log(field[0]+', '+ field[1]);
        formDataObj[field[0]] = field[1]

      }
      // send the form data object to User.create
      User.create(formDataObj);
  }); */

});

// #signIn
App.addRoute('#signIn', signInPageController);

// #signOut
App.addRoute('#signOut', () => {
   // Auth.signOut();
   Auth.signOutModal();

});



// Load app --------------------------
document.addEventListener('DOMContentLoaded', App.init );