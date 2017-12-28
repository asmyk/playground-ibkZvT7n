import "normalize.css";
import style from "main.css";

import { FireDOM } from "lib/FireDOM.js";
import { BaseComponent } from "lib/FireDOM.component.js";
import { Header } from "components/header/Header.js";
import { Market } from "components/market/Market.js";

/**
 * Place your app here
 */

class App extends BaseComponent {
    render() {
        return FireDOM.createElement("div",
            { className: style.container },
            FireDOM.createElement(Header),
            FireDOM.createElement(Market));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let rootEl = document.getElementById("rootElement");

    FireDOM.render(rootEl, FireDOM.createElement("div",
        {}, "Hello!"));
});