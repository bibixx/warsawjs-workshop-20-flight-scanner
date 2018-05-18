import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

const withLoading = children => ({ isLoading }) => (
  isLoading ? <CircularProgress size={100} /> : children
);


export default withLoading;