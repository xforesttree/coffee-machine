import React from "react";
import ReactDOM, { render } from "react-dom";
import App from "./index";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const div = document.createElement("div");
const wrapper = shallow(<App />);
const instance = wrapper.instance();

it("renders without crashing", () => {
  render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("milk(value) updates desiredMilk", () => {
  expect(wrapper.state().order.desiredMilk).toBe(0);
  instance.milk(6);
  expect(wrapper.state().order.desiredMilk).toBe(6);
});
it("sugar(value) updates desiredSugar", () => {
  expect(wrapper.state().order.desiredSugar).toBe(0);
  instance.sugar(6);
  expect(wrapper.state().order.desiredSugar).toBe(6);
});
it("makeDrink(type, choco) updates supplies and type", () => {
  expect(wrapper.state().order.type).toBe("");
  expect(wrapper.state().supplies.chocolate).toBe(15);
  expect(wrapper.state().supplies.milk).toBe(200);
  expect(wrapper.state().supplies.sugar).toBe(200);
  instance.makeDrink("Chocolate", 7);
  expect(wrapper.state().order.type).toBe("Chocolate");
  expect(wrapper.state().supplies.chocolate).toBe(8);
  expect(wrapper.state().supplies.milk).toBe(194);
  expect(wrapper.state().supplies.sugar).toBe(194);
});
it("internalError() updates error", () => {
  expect(wrapper.state().error).toBe(0);
  instance.internalError();
  expect(wrapper.state().error).toBe(2);
});
it("checkLevels() evaluates supply levels", () => {
  expect(wrapper.state().noChoco).toBeFalsy();
  expect(wrapper.state().noSugar).toBeFalsy();
  expect(wrapper.state().noMilk).toBeFalsy();
  wrapper.setState({ supplies: { chocolate: 0, sugar: 0, milk: 0 } });
  instance.checkLevels();
  expect(wrapper.state().noChoco).toBeTruthy();
  expect(wrapper.state().noMilk).toBeTruthy();
  expect(wrapper.state().noSugar).toBeTruthy();
});
