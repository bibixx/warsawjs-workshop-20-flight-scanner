import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  path: {
    marginBottom: 8,
    display: "grid",
    gridTemplateColumns: "1fr 5fr 1fr",

    "&:last-child": {
      marginBottom: 0,
    },
  },

  destination: {
    "&:nth-child(3)": {
      textAlign: "right",
    },
  },

  line: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    flex: 1,
    padding: [[0, 16]],
    boxSizing: "border-box",

    "&:after": {
      content: "\"\"",
      position: "absolute",
      left: 16,
      right: 16,
      display: "block",
      height: 3,
      background: "#3D5AFE",
      borderRadius: 2,
    },
  },

  transfer: {
    width: 4,
    height: 4,
    background: "#fff",
    border: "3px solid #3D5AFE",
    borderRadius: "50%",
    zIndex: 1,
    boxSizing: "content-box",
  },

  time: {
    fontSize: 24,
    margin: 0,
  },

  airport: {
    fontSize: 16,
    color: "#999",
    margin: 0,
  },
};

const formatTime = (time) => {
  const hour = Math.floor(+time);
  const minutes = +time - hour;

  const hourString = String(hour).padStart(2, "0");
  const minutesString = String(Math.floor(minutes * 60)).padStart(2, "0");

  return `${hourString}:${minutesString}`;
};

const Path = ({ path, id, classes }) => (
  <div className={classes.path}>
    <div className={classes.destination}>
      <p className={classes.time}>{formatTime(path[0].startHour)}</p>
      <p className={classes.airport}>{path[0].airportFrom}</p>
    </div>

    <div className={classes.line}>
      {new Array(path.length - 1).fill({}).map((v, i) =>
        (<div key={`${id}-${v.airportFrom}-${i}`} className={classes.transfer} />),
      )}
    </div>

    <div className={classes.destination}>
      <p className={classes.time}>
        {formatTime(path[path.length - 1].startHour + path[path.length - 1].length)}
      </p>
      <p className={classes.airport}>{path[path.length - 1].airportTo}</p>
    </div>
  </div>
);

export default withStyles(styles)(Path);