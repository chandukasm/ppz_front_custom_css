import React from "react";
import logo from "../login/img/logo.jpg";
import { Link } from "react-router-dom";
import { Component } from "react";

export default class NavBar extends Component {
  handleLogOut = () => {
    // this.props.history.push("/login");

    console.log(this.context);
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          {/* ALPHA */}
          <img className="image" src={logo} alt=""></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end "
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link className="nav-link" to="/">
                Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/patients">
                patients
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stocks">
                stocks
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wallet">
                wallet
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/appointments">
                appointments
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-sm btn-info"
                onClick={this.handleLogOut}
              >
                log-out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

{
  /* <Link className="nav-link" to="/logout">
log-out
<button className="btn btn-info btn-sm"> log-out</button> 
 <badge className="badge badge-info">log-out</badge>
</Link> */
}
