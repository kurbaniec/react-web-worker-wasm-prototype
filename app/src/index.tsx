import * as React from "react";
import * as ReactDOM from "react-dom";
// @ts-ignore
import * as MyAction from "../../bin/ordo-bindings/MyAction.js";

import { Hello } from "./components/Hello";

// web worker
const worker = new Worker("worker.js");

/**worker.addEventListener("message", (e) => {
  console.log("Received from worker: " + e.data);
});*/

import("../../ordo/ordo-adapter/pkg/ordo_adapter").then(async (ordo) => {
  const store = new ordo.Node(worker);
  await store.ready();

  const state = store.getState();
  console.log("Ordo-Store: ", state);
  store.dispatch(MyAction.increment("Dispatch!"));
  store.dispatch(MyAction.decrement());

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/appSW.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/workerSW.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }

  ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("root")
  );
});
