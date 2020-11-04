// Imports
import { App } from './../components/App.js';
import { User } from '../components/User.js';
import { Part } from '../components/Part.js';

function userProfileController(){
    let data = {
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.email,
        vehicle: User.vehicle,
        vehicleImg: User.vehicleImg,

    }
    let vehicleImg = User.vehicleImg;
   
    App.loadPage('User Profile', 'template-page-user-profile', data, () => {
        // Currently, this function only runs the SECOND time the page is navigated to (i.e. you must go to the user page, navigate to a different page, and then back again)
       User.vehicleImgUpdate();
    });
}

export { userProfileController }