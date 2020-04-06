import React from "react";
import "./App.css";
import Login from "./login/Login";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./screens/NavBar";
import { Switch, Route } from "react-router-dom";
import Patients from "./screens/Patients";
import Stock from "./screens/Stock";
import Wallet from "./screens/Wallet";
import HomeScreen from "./screens/HomeScreen";
import Appointments from "./screens/Appointments";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/patients" component={Patients} />
        <Route path="/stocks" component={Stock} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/apoiments" component={Appointments} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/" exact component={Login} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
