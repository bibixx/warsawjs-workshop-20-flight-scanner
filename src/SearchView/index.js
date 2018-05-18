import React from "react";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import TopBar from "../TopBar/";
import { SerachSectionInput, SerachSectionSelect } from "../SearchSection/";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 5,
    height: "100vh",
    boxSizing: "border-box",

  },
  toolbar: theme.mixins.toolbar,
  search: {
    margin: "0 auto",
    maxWidth: 800,
    paddingTop: 16,
  },
});

class SearchView extends React.Component {
  constructor({ searchData }) {
    super();
    this.state = {
      to: "",
      from: "",
      depart: "",
      return: "",
      errors: {},
      ...searchData,
    };
  }

  onToChange = (e) => {
    this.setState({
      to: e.target.value,
    });
  }

  onFromChange = (e) => {
    this.setState({
      from: e.target.value,
    });
  }

  onDepartChange = (e) => {
    this.setState({
      depart: e.target.value,
    });
  }

  onReturnChange = (e) => {
    this.setState({
      return: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (this.state.to === "") {
      errors.to = true;
    }

    if (this.state.from === "") {
      errors.from = true;
    }

    if (this.state.depart === "") {
      errors.depart = true;
    }

    if (this.state.return === "") {
      errors.return = true;
    }

    if (new Date(this.state.return) - new Date(this.state.depart) < 0) {
      errors.return = true;
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors,
      });
      return;
    }

    this.props.onSearch({
      to: this.state.to,
      from: this.state.from,
      depart: this.state.depart,
      return: this.state.return,
    });
  }

  render() {
    const options = this.props.airports;
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <TopBar />
        <div className={classes.toolbar} />
        <form onSubmit={this.onSubmit} className={classes.search}>
          <div className="field is-grouped" />

          <Grid container spacing={24}>
            <Grid item xs={12} sm={3}>
              <SerachSectionSelect
                label="From"
                error={this.state.errors.from}
                options={options}
                value={this.state.from}
                onChange={this.onFromChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <SerachSectionSelect
                label="To"
                error={this.state.errors.to}
                options={options}
                value={this.state.to}
                onChange={this.onToChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <SerachSectionInput
                label="Depart"
                error={this.state.errors.depart}
                type="date"
                value={this.state.depart}
                onChange={this.onDepartChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <SerachSectionInput
                label="Return"
                error={this.state.errors.return}
                type="date"
                value={this.state.return}
                onChange={this.onReturnChange}
              />
            </Grid>
          </Grid>

          <Button variant="raised" color="primary" type="submit" margin="normal">
            Search
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SearchView);