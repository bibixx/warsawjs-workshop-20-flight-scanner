import React from "react";

import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";

import ArrowBack from "@material-ui/icons/ArrowBack";

import Flight from "../Flight";
import TopBar from "../TopBar";
import withLoading from "../WithLoading";
import FlightsFilter from "../FlightsFilter";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto",
    boxSizing: "border-box",
  },
  contentIsLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toolbar: theme.mixins.toolbar,
});

class FlightsView extends React.Component {
  state = {
    flights: [],
    flightsFetching: false,
    filteredFlights: [],
  }

  async componentDidMount() {
    this.setState({
      flightsFetching: true,
    });

    const url = "https://warsawjs-flights-api.herokuapp.com/flights";
    const {
      to, from, depart, return: returnDate,
    } = this.props.searchData;

    const result = await fetch(`${url}/${depart}/${returnDate}/${from}/${to}`).then(res => res.json());

    this.setState({
      flights: result,
      filteredFlights: result,
      flightsFetching: false,
    });
  }

  filterFlights = (filterFunc) => {
    this.setState({
      filteredFlights: this.state.flights.filter(filterFunc),
    });
  }

  render() {
    const flights = this.state.filteredFlights
      .map(flight => <Flight key={flight.id} flight={flight} />);

    const { classes } = this.props;

    const Flights = withLoading(flights);

    return (
      <div className={classes.root}>
        <TopBar>
          <IconButton onClick={this.props.goToSearch} aria-label="Return" color="inherit">
            <ArrowBack />
          </IconButton>
        </TopBar>

        <FlightsFilter filterFlights={this.filterFlights} />

        <main className={`${classes.content} ${this.state.flightsFetching ? classes.contentIsLoading : ""}`}>
          <div className={classes.toolbar} />

          <Flights isLoading={this.state.flightsFetching} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(FlightsView);