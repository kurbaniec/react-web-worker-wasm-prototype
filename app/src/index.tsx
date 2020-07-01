import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

let test: number = 1;

test++;
alert(test);

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);