import { FireDOM } from "lib/FireDOM.js";
import { BaseComponent } from "lib/FireDOM.component.js";
import style from "./style.css";

const Header = () => {
    return FireDOM.createElement("div", { className: style.header }, FireDOM.createElement("h1", {}, "Coin market"));
}
export { Header }