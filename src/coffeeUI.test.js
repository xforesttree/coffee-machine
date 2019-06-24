import React from "react";
import ReactDOM from "react-dom";
import CoffeeUI from "./coffeeUI";
import { Grid } from "@material-ui/core";

const div = document.createElement("div");
const busy = false;
const error = 0;
const noChoco = false;
const noSugar = false;
const noMilk = false;
const order = ["Cappuccino", 0, 0];
const supplies = [100, 100];
const button = name => {
  if (busy) {
    return (
      <Grid item xs={2}>
        <button
          className="button--disabled"
          onClick={() => this.internalError()}
        >
          {name}
        </button>
      </Grid>
    );
  } else if (
    (name === "Cappuccino" && (noMilk || noSugar)) ||
    (noChoco && name === "Chocolate") ||
    (noChoco && name === "Wiener Melange")
  ) {
    return (
      <Grid item xs={2}>
        <button disabled className="button--disabled">
          {name}
        </button>
      </Grid>
    );
  } else if (name === "Chocolate") {
    return (
      <Grid item xs={2}>
        <button onClick={() => this.makeDrink(name, 7)}>{name}</button>
      </Grid>
    );
  } else if (name === "Wiener Melange") {
    return (
      <Grid item xs={2}>
        <button onClick={() => this.makeDrink(name, 5)}>{name}</button>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={2}>
        <button onClick={() => this.makeDrink(name, 0)}>{name}</button>
      </Grid>
    );
  }
};

it("renders without crashing", () => {
  ReactDOM.render(
    <CoffeeUI button={button} busy={busy} order={order} supplies={supplies} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
