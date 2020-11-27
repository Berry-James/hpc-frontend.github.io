import { App } from "./App.js";
import { Part } from "./Part.js";

const Nav = {

    categories: ['Braking', 'Drivetrain', 'Electical', 'Engine', 'Exhaust and Emission', 'Air and Fuel', 'Ignition', 'Steering', 'Cooling'],

/*     show: () => {
        const navCont = document.createElement("div");
        navCont.classList.add("cat-cont");
        Nav.categories.forEach(category => {
            const catItem = document.createElement("a");
            catItem.className = 'cat-btn';
            catItem.innerText = category;
            navCont.appendChild(catItem);
        })
        const mainNav = document.querySelector("#main-nav");
        mainNav.appendChild(navCont);
        Nav.events();

    }, */

    events: () => {
/*         const linksContainer = document.querySelector(".drop-contents");
        const links = linksContainer.querySelectorAll("a");
        let partsStorage = [];

        links.forEach(link => {
            link.addEventListener("click", () => {
                const dataVal = link.getAttribute("data-value");
                window.location.hash = '#parts';
                Part.getInCategory(dataVal)
                .then(parts => {
                    parts.forEach(part => { 
                        const partObj = Part.createPartObj(part);
                        partsStorage.push(partObj);
                    })
                    const partsCont = document.querySelector("#parts-list");
                    partsStorage.forEach(part => {
                        partsCont.appendChild(part.el);
                    })
                    
                })
            })
        }) */

        
    },

/*     hide: () => {
        const mainNav = document.querySelector("#main-nav");
        const navCont = document.querySelector(".cat-cont");
        mainNav.removeChild(navCont);
    },
 */
/*     display: () => {

    } */
}

export { Nav }