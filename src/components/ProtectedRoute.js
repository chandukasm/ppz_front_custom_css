import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return isAuthenticated ? (
    <Route {...rest} render={(props) => <Component {...props} />} /> //insted of using the path using render for ginving the props
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: rest.location } }} />
  );
};
