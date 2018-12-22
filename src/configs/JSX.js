import { createElement, Fragment } from "react";

class JSXConfig {
  constructor() {
    this.root = [];
  }
  createRawInstance(raw) {
    return raw;
  }

  createInstance(type, props) {
    return { type, props, children: [] };
  }

  appendRaw(parent, raw) {
    parent.children.push(raw);
  }

  appendChild(parent, instance) {
    parent.children.push(instance);
  }

  appendChildToContainer(instance) {
    this.root.push(instance);
  }

  appendRawToContainer(text) {
    this.root.push(text);
  }
  output() {
    const asReactEls = recurseCreateChildren(this.root);
    if (asReactEls.length === 1) {
      return asReactEls[0];
    } else {
      return createElement(Fragment, null, asReactEls);
    }
  }
}

function recurseCreateChildren(children) {
  if (!children) return null;
  const newChildren = children.map((child, i) => {
    if (typeof child.type === "string") {
      return createElement(
        child.type,
        { ...child.props, key: i },
        recurseCreateChildren(child.children)
      );
    } else {
      return child.toString();
    }
  });
  if (newChildren.length === 1 && !newChildren[0].type) {
    return newChildren[0];
  } else {
    return newChildren;
  }
}

export default JSXConfig;
