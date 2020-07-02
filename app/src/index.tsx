import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

// web worker
 //import Worker from 'worker-loader!./worker/worker';
 //const worker = new Worker();
const worker = new Worker("worker.js");

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

worker.addEventListener('message', (event) => {});

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);