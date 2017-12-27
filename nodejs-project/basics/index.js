function FireDOM() {
};

FireDOM.prototype.createVElement = function (tag, props, children) {
    return {
        _type: "fn",
        tag,
        props,
        children,
        dom: null
    }
};

FireDOM.prototype.createVComponent = function (tag, props, children) {
    return {
        _type: "class-based",
        tag,
        props,
        children,
        dom: null,
        instance: null
    }
}

FireDOM.prototype.createElement = function (tag, props, ...children) {
    let vNode;

    if (Array.isArray(children[0])) {
        children = children[0];
    }

    if (typeof tag === "function" && tag.prototype instanceof BaseComponent) {
        vNode = this.createVComponent(tag, props, children);
    } else {
        vNode = this.createVElement(tag, props, children);
    }
    return vNode;
}

FireDOM.prototype.createDomElement = function (node) {
    let domNode;
    if ((["string", "number"].indexOf(typeof node) >= 0)) {
        domNode = document.createTextNode(node);
    } else if (typeof node.tag === "function") {
        if (node._type === "class-based") {
            domNode = ""
        } else {
            domNode = node.tag(node.props)
        }
    }
    else {
        domNode = document.createElement(node.tag);
    }

    return domNode;
}

FireDOM.prototype.mountVElement = function (node, parent) {
    const { tag, props, children } = node;

    let domNode = this.createDomElement(node);
    node.dom = domNode;

    this.updateNodeProps(null, node);

    if (node.children) {
        for (let child of node.children) {
            this.mount(child, domNode);
        }
    }

    return parent.appendChild(domNode);
}

FireDOM.prototype.mountVComponent = function (node, parent) {
    const { tag, props, children } = node;
    let Component = tag;

    let instance = new Component(props);
    let vDomNode = instance.render(props);
    instance._parentElement = parent;
    instance._currentElement = vDomNode;

    const componentDom = this.mount(vDomNode, parent);
    instance.dom = componentDom;
    node.children = vDomNode;
    node.instance = instance;

    return componentDom;
}

FireDOM.prototype.mountVFnElement = function (node, parent) {
    let vNode = node.tag(node.props);
    const componentDom = this.mount(vNode, parent);
    node.dom = componentDom;

    return componentDom;
}

FireDOM.prototype.mountTextElement = function (text, parent) {
    return parent.appendChild(this.createDomElement(text));
}

FireDOM.prototype.updateNodeProps = function (prevElement, nextElement) {
    let { props: prevProps = {} } = prevElement || {},
        { props: nextProps = {} } = nextElement;

    if (prevProps.className !== nextProps.className) {
        nextElement.dom.className = nextProps.className;
    }
}

FireDOM.prototype.updateVFnElement = function (prevElement, nextElement, parent) {
    let propsEqual = false;

    // element is removed
    if (!nextElement) {
        return this.unmount(prevElement, parent);
    }

    if (!prevElement) {
        return this.mount(nextElement, parent);
    }

    if (prevElement && nextElement) {
        if (!propsEqual) {
            // this.unmount(prevElement, parent);
            //this.mount(nextElement, parent);

            this.replaceVNode(prevElement, nextElement, parent)
        }
    }

}

FireDOM.prototype.updateVElement = function (prevElement, nextElement, parent) {
    // if element has diffrent tag - replace element without diff childrens
    if (prevElement.tag !== nextElement.tag) {
        parent.replaceChild(this.createDomElement(nextElement), prevElement.dom);
    } else {
        nextElement.dom = prevElement.dom;
        this.updateNodeProps(prevElement, nextElement)

        if (nextElement.children || prevElement.children) {
            this.updateChildrens(prevElement.children, nextElement.children, nextElement.dom);
        }
    }
}

FireDOM.prototype.updateChildrens = function (prevChildrens, nextChildrens, parent) {
    const toArray = (obj) => (Array.isArray(obj) ? obj : [obj])
    prevChildrens = toArray(prevChildrens);
    nextChildrens = toArray(nextChildrens);

    let maxLength = Math.max(prevChildrens.length, nextChildrens.length);

    for (let i = 0; i < maxLength; i++) {
        if (!prevChildrens[i]) {
            this.mount(nextChildrens[i], parent);
        } else if (!nextChildrens[i]) {
            this.unmount(nextChildrens[i], parent);
        } else {
            this.update(prevChildrens[i], nextChildrens[i], parent);
        }
    }
}

FireDOM.prototype.updateVTextElement = function (prevElement, nextElement, parent) {
    parent.textContent = nextElement;
}

FireDOM.prototype.updateVComponent = function (prevComponent, nextComponent, parent) {
    if (prevComponent.tag === nextComponent.tag) {
        nextComponent.instance = prevComponent.instance;
        nextComponent.instance.props = nextComponent.props;

        let vDomNode = nextComponent.instance.render(nextComponent.props);
        nextComponent.children = vDomNode;
        nextComponent.instance._parentElement = parent;
        nextComponent.instance._currentElement = vDomNode;

        this.updateChildrens(prevComponent.children, nextComponent.children, parent);

    }
}

FireDOM.prototype.update = function (prevElement, nextElement, parent) {
    if (typeof nextElement.tag === "function") {
        if (nextElement._type === "class-based") {
            this.updateVComponent(prevElement, nextElement, parent)
        }
        else {
            this.updateVFnElement(prevElement, nextElement, parent);
        }
    } else if (typeof nextElement === "string") {
        this.updateVTextElement(prevElement, nextElement, parent);
    } else {
        this.updateVElement(prevElement, nextElement, parent);
    }
};

FireDOM.prototype.mount = function (node, parent) {
    if (typeof node.tag === "function") {
        if (node._type === "class-based") {
            // element is class-based component
            return this.mountVComponent(node, parent);
        } else {
            // element is simple function
            return this.mountVFnElement(node, parent)
        }
    } else if (["string", "number"].indexOf(typeof node) >= 0) {
        return this.mountTextElement(node, parent);
    } else if (typeof node.tag === "string") {
        return this.mountVElement(node, parent);
    }
}

FireDOM.prototype.unmount = function (node, parent) {
    // unmount components
    if (node.dom) {
        return parent.removeChild(node.dom);
    }
    if (typeof node === "string") {
        return parent.innerHTML = "";
    }
    parent.removeChild(node);
}

FireDOM.prototype.replaceVNode = function (prevNode, nextNode, parent) {
    let fakeParent = document.createElement("div"),
        renderedNode = this.mount(nextNode, fakeParent);

    if (!prevNode.dom) {
        this.unmount(prevNode, parent);
        return this.mount(nextNode, parent)
    }
    parent.replaceChild(renderedNode, prevNode.dom)
}

FireDOM.prototype.render = function (rootNode, app) {
    if (typeof app === "function") {
        app = this.createElement(app);
    }
    this.mount(app, rootNode);
}


let framework = new FireDOM();

document.addEventListener('DOMContentLoaded', function () {
    let rootEl = document.getElementById("rootElement");

    FireDOM.render(rootEl, FireDOM.createElement("div",
        {}, "Hello!"));
});