// Imports
import { App } from './../components/App.js';
import { Notify } from '../components/Notify.js';
import { Modal } from '../components/Modal.js';
import { Auth } from '../components/Auth.js';
import { Part } from '../components/Part.js';
import anime from './../node_modules/animejs/lib/anime.es.js';

function homePageController(){
    let data = {
        intro: "Welcome to the homepage.",
        secondaryContent: "This is secondary content."

    }
    App.loadPage('Home', 'template-page-home', data, () => {

        function getAllParts(){
            Part.get()
            .then(parts => {
                console.log("got parts!");
                // loop through parts array
                const saleDiv = document.querySelector(".sale-content");
                const part = document.createElement("div");
                parts.forEach(part => { 
                    let partItem = Part.createPartObj(part);
                    saleDiv.appendChild(partItem.el);
                });
               
            })
            .catch(err => {
                console.log(err);
                Notify.show('Problem loading parts');
            });
            
        }
       
        // Change display of home page buttons depending on Auth.authenticated value (user sign in status)
        let profBtn = document.querySelector('a#profBtn.home-button');
        if(Auth.authenticated == true) {
            profBtn.innerHTML = "Your Profile";
            profBtn.href ="#userProfile";
            
        }else{
            profBtn.innerHTML = "Sign in";
            profBtn.href ="#signIn";
        };

        getAllParts()

    });


}

export { homePageController }