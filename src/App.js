import React from "react";
import "./App.css";
import Login from "./login/Login";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./screens/NavBar";
import { Switch, Route, useLocation } from "react-router-dom";
import Patients from "./screens/Patients/Patients";
import Stock from "./screens/Stock";
import Wallet from "./screens/Wallet";
import HomeScreen from "./screens/HomeScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";
import PatientRecords from "./screens/Patients/PatientRecords";
import Appointments from "./screens/Appointments/Appointments";

function App() {
  let location = useLocation();

  return (
    <React.Fragment>
      {location.pathname !== "/login" && <NavBar />}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/patients/records/:id" component={PatientRecords} />
        <Route path="/patients" component={Patients} />

        <Route path="/stocks" component={Stock} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/records" component={PatientRecords} />
        <Route path="/" exact component={HomeScreen} />

        {/* <ProtectedRoute
          path="/appointments"
          render={(props) => (
            <Appointments {...props} handleLogin={this.handleLogin} />
          )}
        /> */}
        <Route path="/appointments" component={Appointments} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
