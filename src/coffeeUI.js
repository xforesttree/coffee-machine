import React from "react";
import "react-rangeslider/lib/index.css";
import Slider from "react-rangeslider";
import { Grid } from "@material-ui/core";

const coffeeUI = props => {
  const {
    button,
    updateMilk,
    updateSugar,
    busy,
    order: { type, desiredMilk, desiredSugar },
    supplies: { sugar, milk }
  } = props;

  const busyMessage = `Making ${type}, please wait...`;
  const readyMessage = "Ready for order";

  const status = busy ? busyMessage : readyMessage;
  const maxSugar = sugar < 100 ? sugar : 100;
  const maxMilk = milk < 100 ? milk : 100;

  return (
    <Grid
      style={{ justifyContent: "center" }}
      container
      spacing={8}
      direction="row"
    >
      <Grid item xs={6} />
      <Grid container item spacing={8} direction="column" xs={2}>
        {button("Americano")}
        {button("Chocolate")}
      </Grid>
      <Grid container item spacing={8} direction="column" xs={2}>
        {button("Cappuccino")}
        {button("Black Tea")}
      </Grid>
      <Grid container item spacing={8} direction="column" xs={2}>
        {button("Wiener Melange")}
        {button("Earl Gray")}
      </Grid>
      <Grid item xs={6} />
      <Grid container item spacing={8} direction="column" xs={3}>
        <Grid item xs={6}>
          <Slider
            value={desiredMilk}
            orientation="horizontal"
            onChange={updateMilk}
            max={maxMilk}
          />
          <p>Milk</p>
        </Grid>
      </Grid>
      <Grid container item spacing={8} direction="column" xs={3}>
        <Grid item xs={6}>
          <Slider
            value={desiredSugar}
            orientation="horizontal"
            onChange={updateSugar}
            max={maxSugar}
          />
          <p>Sugar</p>
        </Grid>
      </Grid>
      <Grid item xs={6} />
      <Grid container item spacing={8} direction="column" xs={12}>
        <Grid item>
          <p>{status}</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default coffeeUI;
