import React, { Component } from "react";

export default class HomeScreen extends Component {
  handleClick = () => {
    this.props.history.replace("/login");
  };
  render() {
    return (
      <div>
        <h1> HomeScreen</h1>
        <button className="btn btn-info" onClick={this.handleClick}>
          to login
        </button>
      </div>
    );
  }
}
