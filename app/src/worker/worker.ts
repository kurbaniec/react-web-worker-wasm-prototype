

const ctx: Worker = self as any;

// Post data to parent thread
ctx.postMessage({ foo: 'foo' });

// Respond to message from parent thread
ctx.addEventListener('message', (event) => console.log(event));

import("../../../bin/pkg/bin").then(wasm => {
    //wasm.logging();
    wasm.test();
});