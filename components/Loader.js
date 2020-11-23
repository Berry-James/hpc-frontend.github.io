import { App } from './App.js';

const Loader = {
    
    show: (location, message) => {
        // define objects
        const loader = document.createElement("div");
        loader.icon = document.createElement("img");
        loader.txt = document.createElement("h4");

        // set classes
        loader.className = 'loading-wrapper-absolute';

        loader.icon.className = 'loading-icon'
        loader.txt.className = 'loading-text';
        loader.txt.innerText = message;

        // set attributes
        loader.icon.setAttribute("src", "./imgs/icons/loader.svg");

        // append
        loader.appendChild(loader.icon);
        if(loader.txt.innerText.length < 1) {
            loader.appendChild(loader.txt);
        }
        location.appendChild(loader);
    },

    showBG: (location, message) => {
        // define objects
        const loader = document.createElement("div");
        loader.icon = document.createElement("img");
        loader.txt = document.createElement("h4");
        loader.bg = document.createElement("div");

        // set classes
        loader.className = 'loading-wrapper-fixed';
        loader.bg.className = 'loading-background';

        loader.icon.className = 'loading-icon';
        loader.txt.className = 'loading-text';
        loader.txt.innerText = message;

        // set attributes
        loader.icon.setAttribute("src", "./imgs/icons/loader-invert.svg");


        // append
        loader.appendChild(loader.icon);
        if(loader.txt.innerText.length < 1) {
            loader.appendChild(loader.txt);
        }        
        location.appendChild(loader.bg);
        location.appendChild(loader);
    },

    remove: (location) => {
        // get loader components
        const loaderFixed = document.querySelector(".loading-wrapper-fixed");
        const loaderAbsolute = document.querySelector(".loading-wrapper-absolute");
        const bg = document.querySelector(".loading-background");
        let loaderLocation = location;

        // remove from root element
        if(loaderFixed){
            loaderLocation.removeChild(loaderFixed);
        }
        if(loaderAbsolute){
            loaderLocation.removeChild(loaderAbsolute);
        }
        if(bg) {
            loaderLocation.removeChild(bg);
        }
    }

}

export { Loader }