// Imports
import { App } from './../components/App.js';
import { Part } from '../components/Part.js';
import { Notify } from '../components/Notify.js';
import anime from './../node_modules/animejs/lib/anime.es.js';
import { Modal } from '../components/Modal.js';
import { Loader } from '../components/Loader.js';
import { Observer } from '../components/Observer.js';

function partsPageController(){
    let data = {
        intro: "Browse the parts catalog here",
    }
    App.loadPage('Parts', 'template-page-parts', data, () =>{
        // get div#parts-list
        const partsListDiv = document.querySelector('#parts-list');
        const queryDiv = document.querySelector(".query-div");
        const query = document.querySelector(".query");

        // NEW STUFF
        const filterBtns = document.querySelectorAll(".filters");

        filterBtns.forEach(button => {
            button.addEventListener("click", () => {
                let content = button.querySelector(".parts-list-filters");
                content.classList.toggle("show-filters");
                content.querySelectorAll("a").forEach(a => {
                    anime({
                        begin: () => {
                            a.classList.toggle('is-active-filter-btn');
                            delay: anime.stagger(50);
                        }
                    })
                    a.classList.toggle('is-active-filter-btn');
                });
                
                button.querySelector("i").classList.toggle("chev-down");
                anime({
                    targets: document.querySelectorAll(".filter-btn"),
                    opacity: 0,
                    opacity: 1,
                    delay: anime.stagger(200)
                })   
                if(document.documentElement.clientWidth <= 760 ){
                    const backdrop = document.querySelector(".parts-list-filters-backdrop");
                    backdrop.classList.toggle("is-active");
                }             
            })
        })


        // get div#parts-list-filters
        const catCont = document.querySelector("#category-filter-container");
        const vCont = document.querySelector("#vehicle-filter-container");
        // render category buttons
        Part.getCategories()
        .then(categories => {
            // loop through each category and create a button
            categories.forEach(category => {
                // create buttons
                let categoryBtn = document.createElement('a');
                categoryBtn.className = 'filter-btn';
                categoryBtn.innerText = category.name;
                // append CategoryBtn to filters div
                catCont.appendChild(categoryBtn);
                
                // click
                categoryBtn.addEventListener('click', () => {
                    // remove is-active from all buttons
                    let allCategoryBtns = document.querySelectorAll('.filter-btn');
                    allCategoryBtns.forEach(btn => {
                        btn.classList.remove('is-active');
                    });
                    // make current button active
                    categoryBtn.classList.add('is-active', 'filter-active');
                    // clear partslistdiv content
                    partsListDiv.innerHTML = '';
                
                // backend api call - get parts from only certain category
                Part.getInCategory(category._id)
                .then(parts => {
                    parts.forEach(part => {
                        const partObj = Part.createPartObj(part);

                        partsListDiv.appendChild(partObj.el);
                    });

                    let partsItems = document.querySelectorAll(".part-entry");

                    anime({
                        targets: partsItems,
                        opacity: 1,
                        delay: anime.stagger(100),
                    })   

                })
                .catch(err => {
                    console.log(err);
                    Notify.show('Problem loading parts');
                });
                });
            });
        })
        .catch(err => {
            console.log(err);
        })

        // render vehicle buttons
        Part.getVehicles()
        .then(vehicles => {
            // loop through each vehicle type and create a button
            vehicles.forEach(vehicle => {
                
                // create buttons
                let vehicleBtn = document.createElement('a');
                vehicleBtn.className = 'filter-btn';
                vehicleBtn.innerText = vehicle.name;
                // append Vehicle button to filters div
                vCont.appendChild(vehicleBtn);
                
                // click
                vehicleBtn.addEventListener('click', () => {
                    // remove is-active from all buttons
                    let allVehicleBtns = document.querySelectorAll('.filter-btn');
                    allVehicleBtns.forEach(btn => {
                        btn.classList.remove('is-active-vehicle');
                    });
                    // make current button active
                    vehicleBtn.classList.add('is-active-vehicle',  'filter-active');
                    // clear partslistdiv content
                    partsListDiv.innerHTML = '';
                
                // backend api call - get parts for only selected vehicle
                Part.getInVehicles(vehicle._id)
                .then(parts => {
                    parts.forEach(part => {
                        const partObj = Part.createPartObj(part);
                        partsListDiv.appendChild(partObj.el);
                    });

                    let partsItems = document.querySelectorAll(".part-entry");

                    anime({
                        targets: partsItems,
                        begin: () => {
                            partsItems.forEach(part => {
                                part.classList.add('is-active-part');
                            })
                        },
                        delay: anime.stagger(100),
                    })   

                })
                .catch(err => {
                    console.log(err);
                    Notify.show('Problem loading parts');
                });
                });
            });
        })
        .catch(err => {
            console.log(err);
        })

        // create a clear filters button
        let clearFiltersBtn = document.createElement('button');
        const filterContainer = document.querySelector(".filter-container");
        clearFiltersBtn.className = 'button clear-filters';
        clearFiltersBtn.innerText = 'Clear Filters';
        filterContainer.append(clearFiltersBtn);
        
        // click
        clearFiltersBtn.addEventListener('click', () => {
            // remove is-active from all buttons
            let allCategoryBtns = document.querySelectorAll('.filter-btn');
            allCategoryBtns.forEach(btn => {
                btn.classList.remove('is-active', 'is-active-vehicle');
                clearFiltersBtn.classList.add('is-active');
            });
            partsListDiv.innerHTML = '';
            getAllParts();
            
        });

        // get all parts
        function getAllParts(){

            partsListDiv.innerHTML = null;  

            Part.get()
            .then(parts => {
                // loop through parts array
                parts.forEach(part => {     
                    const partObj = Part.createPartObj(part);
                    partsListDiv.appendChild(partObj.el);
                });
                            
            let partsItems = document.querySelectorAll(".part-entry");

            partsItems.forEach(part => {
                Observer.parts(part);
            })
            })

            .catch(err => {
                console.log(err);
                Notify.show('Problem loading parts');
            });
    }
    
    function search() {

        partsListDiv.innerHTML = null;  
        let searchVal = document.querySelector("#search-input").value;
/*         Loader.show(partsListDiv);
 */        Part.get()
        .then(parts => {
            parts.forEach(part => {
                if(part.part_name.toLowerCase().includes(searchVal.toLowerCase()) || part.manufacturer.toLowerCase().includes(searchVal.toLowerCase()) || part.part_number.toLowerCase().includes(searchVal.toLowerCase()) || part.vehicle_fitment.toLowerCase().includes(searchVal.toLowerCase())) {
                const partObj = Part.createPartObj(part);
                partsListDiv.appendChild(partObj.el);
                
   
            }
            if(!partsListDiv.querySelectorAll(".part-entry").indexOf == -1) {
                const empty = document.createElement("div");
                empty.text = document.createElement("p");
                empty.text.innerText = 'No results were found';
                empty.appendChild(empty.text);
                partsListDiv.appendChild(empty);
            }

            let partsItems = document.querySelectorAll(".part-entry");

            anime({
                targets: partsItems,
                opacity: 1,
                delay: anime.stagger(100),
            })   

            
            queryDiv.style.display = 'block';
            query.innerHTML = `Searching for: <strong>${searchVal}</strong>`;

            })
        })
    }


    // run function to get all parts
    getAllParts();

    // search function
    const searchBar = document.querySelector("#search-input");
    searchBar.addEventListener("search", () => {
        search();
    });
});  
}

export { partsPageController }