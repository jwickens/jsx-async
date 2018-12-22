import * as React from "react";

export default class JSON {
  getRootHostContext() {
    return null;
  }
  appendInitialChild(host, element) {
    if (element.type === React.Fragment) {
      host = [];
    } else if (element) {
      host = {};
      host[element.type] = element.props;
    }
  }
  appendChild(parent, instance) {
    if (Array.isArray(parent)) {
      parent.push(element);
    }
  }
  createInstance(type, props) {
    return { type, props };
  }
  createTextInstance(text) {
    return text;
  }
}
