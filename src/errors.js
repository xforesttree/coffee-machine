import React from "react";

const Errors = props => {
  const { errorCode } = props;

  const styles = {
    display: "flex",
    backgroundColor: "red",
    position: "absolute",
    height: "800px",
    width: "1280px",
    justifyContent: "center",
    alignItems: "center"
  };
  let error = "Error";

  if (errorCode === 1) {
    error = "No water";
  } else if (errorCode === 2 || 3) {
    error = "Machine is broken";
  }

  const errorMessage = `Unfortunately there is a technical error: ${error}. Making drinks is not possible at this time`;

  return (
    <div style={styles}>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Errors;
