import { App } from "./App.js";
import { Notify } from "./Notify.js";
import { User } from "./User.js";
import { Modal } from "./Modal.js";

const Auth = {
    authenticated: false,
    signIn: (userData) => {
        // send userData to backend API using fetch - POST
        fetch('https://hpc-backend.herokuapp.com/api/auth/signin', {
            method: 'post',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })
        .then(res => {
            console.log(res);
            if(res.status !=200){
                // problem signing in
                res.json().then(res => {
                    Notify.show(res.message);
                });
               
            }else{
                // sign in success
                res.json().then(res => {
                    // 1. save the token to local storage
                    localStorage.setItem('token', res.token);
                    // 2. set Auth.authenticated to true
                    Auth.authenticated = true;
                    // 3. set user info in User object
                    User.firstName = res.user.first_name;
                    User.lastName = res.user.last_name;
                    User.email = res.user.email;
                    User.vehicle = res.user.vehicle;

                    // 4. redirect to homepage
                    location.hash = '#';
                    // 5. show welcome notification
                    Notify.show(`Welcome ${User.firstName}`)
                    
                });
            }
        })
        .catch(err => {
            console.log(err);
            Notify.show('Problem Signing in');
        });
    },

    check: (callback) => {
        // 1. check if jwt token exists in local storage
        if(localStorage.getItem('token')){
            // validate token using backend API - make fetch request (GET)
            fetch('https://hpc-backend.herokuapp.com/api/auth/validate', {
                headers: { "Authorization": `Bearer ${localStorage.token}` }
            })
            .then(res => {
                if(res.status !=200){
                    // token validation failed
                    // set Auth.authenticated = false
                    Auth.authenticated = false;
                    // remove the local token
                    localStorage.removeItem('token');
                    // redirect to sign in page
                    location.hash = '#signIn';
                    Notify.show('Invalid token, please sign in');
                    if(typeof callback == 'function'){
                        callback();
                    }

                }else{
                    // token valid!
                    res.json().then(res => {
                        console.log("user authorised");
                        // set Auth.authenticated = true
                        Auth.authenticated = true;
                        // set user Info (res.user)
                        // set user info in User
                        User.firstName = res.user.first_name;
                        User.lastName = res.user.last_name;
                        User.email = res.user.email;
                        User.vehicle = res.user.vehicle;
                        User.vehicleImg = res.user.vehicle_img;

                        // callback
                        if(typeof callback == 'function'){
                            callback();
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
                Notify.show('Problem authorising');
                if(typeof callback == 'function'){
                    callback();
                }
            })

        }else{
            // no local token
            // redirect to sign in page
            if(typeof callback == 'function'){ 
                callback();
            }
        }
    },

    signOutModal: () => {
        // get div ID for modal
        const modalTemplate = document.querySelector('#template-signOut-modal').innerHTML;
        // show modal
        Modal.show(modalTemplate);
        // add button events
            // sign out button
            document.querySelector("button#logOut-btn.button").addEventListener('click', () => {
                Auth.signOut();
            // cancel button (close modal)
            document.querySelector("#button#cancel-btn.button").addEventListener('click', () => {
                alert("hello")
                Modal.remove(modalTemplate);
            })
            })
    },   

    signOut: () => {
        // remove local token
        localStorage.removeItem('token');
        // set Auth.authenticated to false
        Auth.authenticated = false;
        // redirect to sign in page
        location.hash = '#signIn';
        Notify.show('You have been signed out');
    }
}

export { Auth }
