import { FireDOM } from "lib/FireDOM.js";
import { BaseComponent } from "lib/FireDOM.component.js";
import style from "./style.css";

const Item = (props) => {
    return FireDOM.createElement("div", { className: style.item },
        FireDOM.createElement("h2", {}, "$" + props.price_usd), FireDOM.createElement("p", {}, `${props.name}(${props.symbol})`));
}
export { Item }