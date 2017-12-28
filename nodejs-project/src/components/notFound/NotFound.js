import { FireDOM } from "lib/FireDOM.js";
import { BaseComponent } from "lib/FireDOM.component.js";

const NotFoundComponent = (props) => (
    FireDOM.createElement("div", {}, `${props.text}`)
);
export { NotFoundComponent }