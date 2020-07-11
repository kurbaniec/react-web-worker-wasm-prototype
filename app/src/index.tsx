import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

// web worker
const worker = new Worker("worker.js");

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

/**
worker.addEventListener('message', (e) => {
    console.log("Received from worker: " + e.data);
});*/

import {Node} from "ordo";
const test = new Node(worker);


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/appSW.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/workerSW.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}



ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);