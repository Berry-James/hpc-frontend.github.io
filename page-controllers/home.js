// Imports
import { App } from './../components/App.js';
import { Notify } from '../components/Notify.js';
import { Modal } from '../components/Modal.js';
import { Auth } from '../components/Auth.js';
import { Part } from '../components/Part.js';
import { Loader } from '../components/Loader.js';
import { Observer } from '../components/Observer.js';
import anime from './../node_modules/animejs/lib/anime.es.js';

function homePageController(){
    let data = {
        intro: "Welcome to the homepage.",
        secondaryContent: "This is secondary content."

    }
    App.loadPage('Home', 'template-page-home', data, () => {        
        // OBSERVER INIT
        Observer.brands();
        Observer.about();
        // get all headers for observer
        const headers = document.querySelectorAll(".header") 
            headers.forEach(header => {
                Observer.header(header);

            })


        // NAV STICKY
        const header = document.querySelector(".page-header");
        document.addEventListener("scroll", () => {
            if(window.pageYOffset >= 100) {
                header.classList.add("is-sticky");
            } else {
                header.classList.remove("is-sticky");
            }
        })

        const aboutBtn = document.querySelector("#about-btn");
        const aboutTemplate = document.querySelector("#template-about-modal").innerHTML;
        aboutBtn.addEventListener("click", () => {
            Modal.show(aboutTemplate);
        })

        function getAllParts(){
            const saleDiv = document.querySelector(".sale-content");

            Loader.show(saleDiv);
            
            Part.get()
            .then(parts => {
                Loader.remove(saleDiv);
                // loop through parts array
                const trimmed = parts.slice(0, 8);
                trimmed.forEach(part => { 
                    let partItem = Part.createPartObj(part);
                    const sale = document.createElement("div");
                    const saleNum = document.createElement("p");
                    sale.className = "sale";
                    let price = part.price * 1.2;
                    saleNum.innerText = '$ ' + price.toFixed(2);
                    sale.appendChild(saleNum);
                    partItem.el.appendChild(sale);
                    saleDiv.appendChild(partItem.el);
                    Observer.parts(partItem.el)

                });
                const partItems = document.querySelectorAll(".part-entry");
                /* anime({
                    targets: partItems,
                    opacity: 1,
                    delay: anime.stagger(150)
                }) */
               
            })
            .catch(err => {
                console.log(err);
                Notify.show('Problem loading parts');
            });
        }

        function search() {

            let searchVal = document.querySelector(".homeSearch").value;

            let array = [];
    
            Part.get()
            .then(parts => {
                parts.forEach(part => {
                    if(part.part_name.toLowerCase().includes(searchVal.toLowerCase())) {
                        const partObj = Part.createPartObj(part);
                        App.homeSearchStorage.push(partObj);
                    }
                })
                App.homeSearch();
            })
        }

        getAllParts()
        
    // search function
    const searchBar = document.querySelector(".homeSearch");
    searchBar.addEventListener("search", () => {
        search();
    });

    });


}

export { homePageController }