// Imports
import { App } from './../components/App.js';
import { Part } from '../components/Part.js';
import { Notify } from '../components/Notify.js';
import anime from './../node_modules/animejs/lib/anime.es.js';
import { Modal } from '../components/Modal.js';

function partsPageController(){
    let data = {
        intro: "Browse the parts catalog here",
    }
    App.loadPage('Parts', 'template-page-parts', data, () =>{
        // get div#parts-list
        const partsListDiv = document.querySelector('#parts-list');
        const vehicleFiltersBtn = document.querySelector("#vehicle-filters-text");
        const vehicleFilters = document.querySelector("#vehicle-filters")
        const categoryTxt = document.querySelector("#category-filters-text")
        const categories = document.querySelector("#parts-list-filters")


        vehicleFiltersBtn.addEventListener("click", function(){
            vehicleFilters.classList.toggle("show-filters");
            vehicleFiltersBtn.classList.toggle("filter-active");
            categories.classList.remove("show-filters");
            categoryTxt.classList.remove("filter-active");
        })

        
        categoryTxt.addEventListener("click", function(){
            categories.classList.toggle("show-filters");
            vehicleFilters.classList.remove("show-filters");
            categoryTxt.classList.toggle("filter-active");
            vehicleFiltersBtn.classList.remove("filter-active");


        })

        // get div#parts-list-filters
        const partsListFiltersDiv = document.querySelector('#parts-list-filters');
        const vehicleSelectDiv = document.querySelector('#vehicle-filters');
        const vehicleModal = document.querySelector('#template-vehicle-modal');
        const vehicleModalContent = document.querySelector('div.modal');

        // render category buttons
        Part.getCategories()
        .then(categories => {
            // loop through each category and create a button
            categories.forEach(category => {
                // create buttons
                let categoryBtn = document.createElement('button');
                categoryBtn.className = 'button filter-btn';
                categoryBtn.innerText = category.name;
                // append CategoryBtn to filters div
                partsListFiltersDiv.appendChild(categoryBtn);
                
                // click
                categoryBtn.addEventListener('click', () => {
                    // remove is-active from all buttons
                    let allCategoryBtns = document.querySelectorAll('.filter-btn');
                    allCategoryBtns.forEach(btn => {
                        btn.classList.remove('is-active');
                    });
                    // make current button active
                    categoryBtn.classList.add('is-active');
                    // clear partslistdiv content
                    partsListDiv.innerHTML = '';
                
                // backend api call - get parts from only certain category
                Part.getInCategory(category._id)
                .then(parts => {
                    parts.forEach(part => {
                        const partObj = Part.createPartObj(part);
                        partsListDiv.appendChild(partObj.el);
                    });
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
                let vehicleBtn = document.createElement('button');
                vehicleBtn.className = 'button filter-btn';
                vehicleBtn.innerText = vehicle.name;
                // append Vehicle button to filters div
                vehicleSelectDiv.appendChild(vehicleBtn);
                
                // click
                vehicleBtn.addEventListener('click', () => {
                    // remove is-active from all buttons
                    let allVehicleBtns = document.querySelectorAll('.filter-btn');
                    allVehicleBtns.forEach(btn => {
                        btn.classList.remove('is-active-vehicle');
                    });
                    // make current button active
                    vehicleBtn.classList.add('is-active-vehicle');
                    // clear partslistdiv content
                    partsListDiv.innerHTML = '';
                
                // backend api call - get parts for only selected vehicle
                Part.getInVehicles(vehicle._id)
                .then(parts => {
                    parts.forEach(part => {
                        const partObj = Part.createPartObj(part);
                        partsListDiv.appendChild(partObj.el);
                    });
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
        clearFiltersBtn.className = 'button filter-btn clear-filters';
        clearFiltersBtn.innerText = 'All Categories / Vehicles';
        partsListFiltersDiv.append(clearFiltersBtn);
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
        Part.get()
        .then(parts => {
            console.log("got parts!");
            // loop through parts array
            const part = document.createElement("div");
            parts.forEach(part => { 
                Part.createPartObj(part);
            });
        })
        .catch(err => {
            console.log(err);
            Notify.show('Problem loading parts');
        });
        
    }

    // Search bar for part names (Not fully functional, currently can only search based on 'part_name_id' which is an ObjectId assigned to each part.  I'm leaving this in as I feel I was getting close, but not quite there yet)
    // FOR TESTING PURPOSES, INPUTTING THE ID 5ee0b275b965a28fb8b14239 INTO THE SEARCH BOX WILL RETURN A SINGLE PART
    // Creating a static array (would preferrably bring the array in dynamically)
    var names = [ '5ee0b275b965a28fb8b14239', '5ee0b13bb965a28fb8b14238', 'part3' ];
    // Search function
    function search(){
        // Take the input from the #search-input input box
        let searchFor = $('#search-input').val();
        let searchIndex = names.indexOf(searchFor);
        // If part does not exist, show message 'no parts found'
        if(searchIndex == -1)
            $('#search-results').html("No parts found");
        else{
            // clear partsListDiv content
            partsListDiv.innerHTML = '';
            // Run function based on value of input field #search-input
            Part.getByName(searchFor)
                .then(parts => {
                    // generate parts based on returned data
                    parts.forEach(part => {
                        const partObj = Part.createPartObj(part);
                        partsListDiv.appendChild(partObj.el);
                    });
                })
        }
    }
    // run search function on keypress
    $('#search-input').on('keyup', search);

    // run function to get all parts
    getAllParts();
});  
}

export { partsPageController }