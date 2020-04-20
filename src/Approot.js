import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import App from "./App";

export default class Approot extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/app" component={App} />
        </Switch>
      </React.Fragment>
    );
  }
}
