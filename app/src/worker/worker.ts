const ctx: Worker = self as any;

import("../../../bin/pkg/bin").then((wasm) => {
  //wasm.logging();
  //wasm.test();
  const myApp = new wasm.MyApp();
});

//import * as wasm from "../../../bin/pkg/bin";
//wasm.test();
