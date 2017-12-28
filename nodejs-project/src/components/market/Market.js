
import { FireDOM } from "lib/FireDOM.js";
import { BaseComponent } from "lib/FireDOM.component.js";
import { Item } from "components/item/Item.js";
import { getMarketData } from "service.js";
import style from "./style.css";


class Market extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { marketData: null, intervalTimes: 0 };
        this.handleMarketUpdate = this.handleMarketUpdate.bind(this);
    }
    handleMarketUpdate(data) {
        this.setState({ marketData: getMarketData(), intervalTimes: this.state.intervalTimes + 1 });

        if (this.state.intervalTimes > 5) {
            window.clearInterval(this.intervalId)
        }
    }

    render() {
        if (!this.state.marketData) {
            this.intervalId = setInterval(this.handleMarketUpdate, 1000);
            return FireDOM.createElement("div", {}, "Loading...");
        }

        const { data } = this.state.marketData;
        console.log("update", data)
        return FireDOM.createElement("div", { className: style.funds }, data.map((itemData) => (FireDOM.createElement(Item, itemData))))

    }
}
export { Market }