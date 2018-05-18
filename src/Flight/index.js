import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Path from "./Path/";

// import styles from "./Flight.css";

const styles = {
  flight: {
    display: "grid",
    gridTemplateColumns: "5fr 2fr",
    width: "100%",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
    background: "#fff",
    margin: "0 auto",
    marginBottom: 16,
    boxSizing: "border-box",
    borderRadius: "2px",
    cursor: "pointer",
    transition: "all .2s ease-in-out",
    maxWidth: 600,

    "&:last-child": {
      marginBottom: 0,
    },

    "&:hover": {
      boxShadow: "0 3px 15px rgba(0, 0, 0, 0.2)",
      transform: "translateY(-4px)",
    },
  },

  paths: {
    padding: [[16, 40]],
  },

  price: {
    padding: [[16, 0]],
    borderLeft: "2px dashed rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 30,
  },
};

const Flight = ({ flight, classes }) => {
  const {
    price, outboundPath, inboundPath, id,
  } = flight;
  return (
    <div className={classes.flight}>
      <div className={classes.paths}>
        <Path path={outboundPath} id={id} />
        <Path path={inboundPath} id={id} />
      </div>
      <div className={classes.price}>${price}</div>
    </div>
  );
};

export default withStyles(styles)(Flight);