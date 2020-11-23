import anime from './../node_modules/animejs/lib/anime.es.js';


const Observer = {

    options: {
        root: null,
        threshold: 1,
    },

    optionsParts: {
        root: null,
        threshold: 0.1
    },

    brands: () => {
        const brands = document.querySelectorAll(".brand");
        const brandSection = document.querySelector('.brands-container');
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if(!entry.isIntersecting) {
                    return;
                  }
                    anime({
                        targets: brands,
                        opacity: 1,
                        invert: '0',
                        delay: anime.stagger(150)
                    })
                    observer.unobserve(entry.target);
                });
        }, Observer.options);

        observer.observe(brandSection);
    },

    about: () => {
        const aboutContent = document.querySelector(".about-content");
        const aboutItems = aboutContent.querySelectorAll("div"); 
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if(!entry.isIntersecting) {
                    return;
                  }
                    aboutItems.forEach(item => {
                        item.classList.add("is-active-part");
                    })

                  observer.unobserve(entry.target);

                 });
        }, Observer.optionsParts);
            observer.observe(aboutContent);
    },

    parts: (part) => {
        const parts = document.querySelectorAll(".part-entry");
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if(!entry.isIntersecting) {
                    return;
                  }
                    part.classList.add("is-active-part");

                  observer.unobserve(entry.target);

                 });
        }, Observer.optionsParts);
            observer.observe(part);
    },

    header: (header) => {
        const headers = document.querySelectorAll(".header");
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if(!entry.isIntersecting) {
                    return;
                }
                  
                header.classList.add("is-active-header");
                observer.unobserve(entry.target);

                 });
        }, Observer.optionsParts);

       
        observer.observe(header);
       
    }


}

export { Observer }