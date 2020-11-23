import { App } from "./App.js";
import anime from './../node_modules/animejs/lib/anime.es.js';

const Notify = {
    showDuration: 3500,
    container: null,

    init: () => {
        // Create notifications container div and append to body
        Notify.container = document.createElement('div');
        Notify.container.setAttribute('id', 'notifications');
        document.body.appendChild(Notify.container);
    },

    show: (message, icon) => {
        // Create notificationEntryDiv and set class
        const notificationEntryDiv = document.createElement('div');
        notificationEntryDiv.className = 'notification-entry';
        const notificationText = document.createElement("p");
        notificationText.innerText = message;

        notificationEntryDiv.appendChild(notificationText);

        // Append notificationEntryDiv to container div
        Notify.container.appendChild(notificationEntryDiv);
        // wait for showDuration

       // anime.js version
        anime({
            targets: notificationEntryDiv,
            keyframes: [
                { opacity: 0, top: '50px', duration: 0 },
                { opacity: 1, top: 0, duration: 800, endDelay: Notify.showDuration },
                { opacity: 0, top: '-50px', duration: 800 },
            ],
            complete: () => {
                notificationEntryDiv.remove();
            }
        });
    }
} 

export { Notify }