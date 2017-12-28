import { FireDOM } from "./FireDOM.js";

class BaseComponent {
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    setState(nextState) {
        this.state = Object.assign({}, this.state, nextState);
        this.updateComponent();
    }
    updateComponent() {
        let prevElement = this._currentElement;

        let nextElement = this.render();
        this._currentElement = nextElement;
        
        FireDOM.update(prevElement, nextElement, this._parentElement);
    }

    render() {
        return "";
    }
}

export { BaseComponent };