import * as React from "react";
import { renderJSX } from "../render";
import jsxToString from "jsx-to-string";

function expectSameJsx(left, right) {
  expect(jsxToString(left)).toEqual(jsxToString(right));
}
describe("renderJSX", () => {
  it("can render a sync functional component", async () => {
    const MyComponent = ({ a }) => <a>{a}</a>;
    const response = await renderJSX(<MyComponent a={1} />);
    expectSameJsx(response, <a key="0">1</a>);
  });

  it("can render an async functional component", async () => {
    const MyComponent = async ({ a }) => <a>{a}</a>;
    const response = await renderJSX(<MyComponent a={2} />);
    expectSameJsx(response, <a key={"0"}>2</a>);
  });

  it("can render two nested async functional component", async () => {
    const MyComponentA = async ({ a }) => <a>{a}</a>;
    const MyComponentB = async ({ a }) => (
      <b key="0">
        <MyComponentA a={a} />
      </b>
    );
    const response = await renderJSX(<MyComponentB a={3} />);
    expectSameJsx(
      response,
      <b key="0">
        <a key="0">3</a>
      </b>
    );
  });
});
