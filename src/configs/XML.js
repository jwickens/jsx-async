const xml = require("xml");

export default class XML {
  getRootHostContext() {
    return {};
  }
  appendInitialChild(host, instance) {
    host[element.type] = [instance];
  }
  appendChild(parent, instance) {}
  createInstance(type, props) {
    return { type, value: [{ _attrs: props }] };
  }
  createTextInstance(text) {
    return text;
  }
}
