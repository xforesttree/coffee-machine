import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Grid } from "@material-ui/core";
import Errors from "./errors";
import CoffeeUI from "./coffeeUI";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        desiredSugar: 0,
        desiredMilk: 0,
        type: ""
      },
      supplies: {
        chocolate: 15,
        sugar: 200,
        milk: 200
      },
      busy: false,
      error: 0,
      noChoco: false,
      noSugar: false,
      noMilk: false
    };

    this.awaitError();
  }

  awaitDrink = () => {
    setTimeout(
      function() {
        this.setState({ busy: false });
      }.bind(this),
      Math.random() * 20000
    );
  };

  awaitError = () => {
    const errorValue = Math.round(Math.random() * 4);
    setTimeout(
      function() {
        this.setState({ error: errorValue }, () => this.awaitRecovery(true));
      }.bind(this),
      Math.random() * 60000
    );
  };

  awaitRecovery = shouldRepeat => {
    setTimeout(
      function() {
        shouldrepeat
          ? this.setState({ error: 0 }, () => this.awaitError())
          : this.setState({ error: 0 });
      }.bind(this),
      Math.random() * 40000
    );
  };

  checkLevels = () => {
    const {
      supplies: { chocolate, sugar, milk },
      noChoco,
      noMilk,
      noSugar
    } = this.state;
    if (chocolate < 8 && !noChoco) {
      this.setState({ noChoco: true, busy: false }, () => this.checkLevels());
    } else if (milk < 15 && !noMilk) {
      this.setState({ noMilk: true, busy: false }, () => this.checkLevels());
    } else if (sugar < 12 && !noSugar) {
      this.setState({ noSugar: true }, () => this.checkLevels());
    } else {
      this.awaitDrink();
    }
  };

  internalError = () => {
    this.setState({ error: 2 }, () => this.awaitRecovery(false));
  };

  makeDrink = (type, choco) => {
    const {
      order,
      order: { desiredMilk, desiredSugar },
      supplies: { milk, sugar, chocolate }
    } = this.state;
    const newMilk = milk - desiredMilk;
    const newSugar = sugar - desiredSugar;
    const newChoco = chocolate - choco;
    this.setState(
      {
        busy: true,
        order: { ...order, type },
        supplies: {
          milk: newMilk,
          sugar: newSugar,
          chocolate: newChoco
        }
      },
      () => this.checkLevels()
    );
  };

  milk = value => {
    const { order } = this.state;
    this.setState({
      order: {
        ...order,
        desiredMilk: value
      }
    });
  };

  sugar = value => {
    const { order } = this.state;
    this.setState({
      order: {
        ...order,
        desiredSugar: value
      }
    });
  };

  render() {
    const {
      order,
      supplies,
      busy,
      error,
      noChoco,
      noMilk,
      noSugar
    } = this.state;

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

    const view =
      error === 0 ? (
        <CoffeeUI
          button={button}
          busy={busy}
          order={order}
          supplies={supplies}
          updateSugar={this.sugar}
          updateMilk={this.milk}
          {...this.props}
        />
      ) : (
        <Errors errorCode={error} {...this.props} />
      );

    return view;
  }
}
export default App;
ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
