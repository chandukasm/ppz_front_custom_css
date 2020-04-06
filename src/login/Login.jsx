import React, { Component } from "react";
import "./css/login.css";
import axios from "axios";

export default class Login extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(this.state.user);
    try {
      // console.log(this.state.user);
      let res = await axios.post(
        "http://localhost:3000/api/auth",
        this.state.user
      );
      let { data } = res;

      localStorage.setItem("x-auth-token", data);
      console.log(data);

      // console.log(await data);
    } catch (error) {
      console.log("Error :" + error.response.data);
      alert(error.response.data);
    }

    // axios
    //   .post("http://localhost:3000/api/auth", this.state.user)
    //   .then(({ data }) => localStorage.setItem("x-auth-token", data))
    //   .catch((e) => console.log(e.message));
  };

  handleChange = ({ currentTarget: input }) => {
    const user = { ...this.state.user };
    user[input.name] = input.value;
    this.setState({ user });
    console.log(this.state.user);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="outer-box ">
          <div className="container1">
            <div className="login-box">
              <h1 className="display-4 ">login-ppz</h1>
              <div>
                <label htmlFor="email" style={{ float: "left" }}>
                  email:
                </label>
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  // required
                />
                <br />
                <label htmlFor="password" style={{ float: "left" }}>
                  Password:
                </label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  onChange={this.handleChange}
                  // required
                />
              </div>

              <div className="m-1">
                <button
                  className="btn btn-info "
                  // style={{
                  //   backgroundColor: "gray",
                  //   width: "85px",
                  // }}
                  onSubmit={this.handleSubmit}
                >
                  login
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
