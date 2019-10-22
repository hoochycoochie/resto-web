import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (true ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

export default withRouter(GuestRoute);
