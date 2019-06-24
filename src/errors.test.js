import React from "react";
import ReactDOM from "react-dom";
import Errors from "./errors";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Errors errorcode={1} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
