import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

import Worker from 'worker-loader!./worker/worker';

// web worker
const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

worker.addEventListener('message', (event) => {});


ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);