import * as React from "react";
import * as ReactDOM from "react-dom";
// @ts-ignore
import * as MyAction from "../../bin/ordo-bindings/MyAction.js";
// @ts-ignore
import * as MyAction2 from "../../bin/ordo-bindings/MyAction2.js";

import { Hello } from "./components/Hello";

// web worker
const worker = new Worker("worker.js");

/**worker.addEventListener("message", (e) => {
  console.log("Received from worker: " + e.data);
});*/

import("../../ordo/ordo_adapter/pkg/ordo_adapter").then(async (ordo) => {
  const store = new ordo.Node(worker);

  const func = () => {
    const state = store.getState();
    console.log("This func will be unsubscribed ", state);
  };
  store.subscribe(func);
  store.subscribe(() => {
    const state = store.getState();
    console.log("State-Change! ", state);
  });

  await store.ready();

  const state = store.getState();
  console.log("Ordo-Store: ", state);

  store.dispatch(MyAction.increment("Dispatch!"));
  store.unsubscribe(func);
  store.dispatch(MyAction.decrement());

  store.dispatch(MyAction2.decrement());
  store.dispatch(MyAction2.decrement());

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
