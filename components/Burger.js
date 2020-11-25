import anime from './../node_modules/animejs/lib/anime.es.js';
import { Auth } from './Auth.js';


const Burger = {
    
    toggle: () => {
        const burgerBtn = document.querySelector(".hamburger");
        const burgerContent = document.querySelector(".burger-content");



        burgerBtn.addEventListener("click", () => {


            if(burgerContent.classList.contains("is-hidden")) {



                anime({
                    begin: () => {
                        burgerBtn.classList.add("is-rotated");
                        burgerContent.classList.remove("is-hidden");
                    },
                    targets: burgerContent,
                    keyframes: [
                        { right: '-400px' },
                        { right: '0px' }
                    ],
                    right: '0px',
                    easing: 'linear',
                    duration: 150,
                    complete: () => {
                    }
                })



            } else {
                anime({
                    targets: burgerContent,
                    right: '-400px',
                    easing: 'linear',
                    duration: 150,
                    complete: () => {
                        burgerContent.classList.add('is-hidden');
                        burgerBtn.classList.remove('is-rotated');
                    }
                })


            }

            if(Auth.authenticated) {
                const profBtn = document.querySelector(".burger-prof-btn");
                profBtn.classList.remove("burger-prof-btn-hide");
                const burgerSign = document.querySelector(".burger-sign");
                burgerSign.icon = burgerSign.querySelector("i");
                burgerSign.span = burgerSign.querySelector("span");
                burgerSign.span.innerText = 'Sign Out'; 
                burgerSign.icon.className = '';
                burgerSign.icon.classList.add("fas", "fa-sign-out-alt")
                burgerSign.href = "#signOut";
            }
        })

    }
}

export { Burger }