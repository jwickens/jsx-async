import * as React from "react";
import JSXConfig from "./configs/JSX";
import JSONConfig from "./configs/JSON";
import ObjectConfig from "./configs/Object";
import XMLConfig from "./configs/XML";

export function makeRenderer(ConfigClass) {
  async function render(rootElement) {
    if (!rootElement.type) {
      throw new Error(
        "Invalid jsx, did you remember to express the component as an element jsxAsync.render(<MyComponent />) ?"
      );
    }
    const queue = [{ child: rootElement }];
    const config = new ConfigClass();
    while (queue.length > 0) {
      const nextElement = queue.shift();
      await _render(nextElement, config, queue);
    }
    return config.output();
  }

  return render;
}

export const renderJSX = makeRenderer(JSXConfig);
export const renderJSON = makeRenderer(JSONConfig);
export const renderObject = makeRenderer(ObjectConfig);
export const renderXML = makeRenderer(XMLConfig);

async function _render({ parent, child }, config, queue) {
  if (!child.type) {
    const raw = await config.createRawInstance(child);
    if (!parent) {
      await config.appendRawToContainer(raw);
    } else {
      await config.appendRaw(parent, raw);
    }
  } else if (typeof child.type === "string") {
    const instance = await config.createInstance(child.type, child.props);
    if (!parent) {
      await config.appendChildToContainer(instance);
    } else {
      await config.appendChild(parent, instance);
    }
    const children = React.Children.toArray(child.props.children);

    for (const newChild of children) {
      queue.push({ child: newChild, parent: instance });
    }
  } else if (typeof child.type === "function") {
    const result = await child.type(child.props);
    queue.push({ parent, child: result });
  }
}
