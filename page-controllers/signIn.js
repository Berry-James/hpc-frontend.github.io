// Imports
import { App } from './../components/App.js';
import { Notify } from '../components/Notify.js';
import { User } from '../components/User.js';
import { Auth } from '../components/Auth.js';
import anime from './../node_modules/animejs/lib/anime.es.js';

function signInPageController(){
    App.loadPage('Sign In', 'template-page-sign-in', {}, () => {
        // get sign up form
        let signInForm = document.querySelector('#form-sign-in')
        // submit event
        signInForm.addEventListener('submit', (e) => {
            // prevent the form from loading new page
            e.preventDefault();
            // create formData object
            let formData = new FormData(signInForm);
            // create empty object
            let formDataObj = {};
            // loop through formData entries
            for(let field of formData.entries()){
              //  console.log(field[0]+', '+ field[1]);
              formDataObj[field[0]] = field[1]

            }
            // send the form data object to Auth.signIn
            Auth.signIn(formDataObj);
        });

        function signUp() {
            const signUpBtn = document.querySelector(".create_acc");
            signUpBtn.addEventListener("click", () => {

                // APPEND DATA
                const formWrapper = document.querySelector(".form-wrapper");
                formWrapper.left = formWrapper.querySelector(".form-left");
                formWrapper.classList.remove("signUp-switch");
                formWrapper.classList.add("signIn-switch");
                const template = document.querySelector("#template-sign-up-new").innerHTML;
                const output = Mustache.render(template);
                // set innerHTML of form-left to signup form
                formWrapper.left.innerHTML = output;

                // get and add event listener to back btn
                const signUpBack = document.querySelector("#sign-up-back");
                
                signUpBack.addEventListener("click", () => {
                    formWrapper.classList.remove("signIn-switch");
                    formWrapper.classList.add("signUp-switch");
                       const template = document.querySelector("#template-sign-in-back").innerHTML;
                       const output = Mustache.render(template);
                       formWrapper.left.innerHTML = output;
                       const signUpBtn = document.querySelector(".create_acc");

                       signUpBtn.addEventListener("click", () => {
                           signUp();
                       })

                                            // get sign up form
                        let signInForm = document.querySelector('#form-sign-in')
                        // submit event
                        signInForm.addEventListener('submit', (e) => {
                            // prevent the form from loading new page
                            e.preventDefault();
                            // create formData object
                            let formData = new FormData(signInForm);
                            // create empty object
                            let formDataObj = {};
                            // loop through formData entries
                            for(let field of formData.entries()){
                            //  console.log(field[0]+', '+ field[1]);
                            formDataObj[field[0]] = field[1]

                            }
                            // send the form data object to Auth.signIn
                            Auth.signIn(formDataObj);
                        });
                        
                })
                
    
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
                });
            })
        }

        signUp();



            
    });
}

export { signInPageController }