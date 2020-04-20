import React, { Component } from "react";
import "./css/login.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
    redirectToReferer: false,
  };

  handleLoginPress = () => {
    // const { redirectToReferer } = this.state;
    console.log("called handleLoginPress");

    this.props.handleLogin(
      this.setState(() => ({
        redirectToReferer: true,
      }))
    );
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //k console.log(this.state.user);
      let res = await axios.post(
        "http://localhost:3000/api/auth",
        this.state.user
      );
      let { data } = res;

      localStorage.setItem("x-auth-token", data);
      this.props.history.push(this.props.location.state.from.pathname);
      this.handleLoginPress();
      console.log(data);

      // console.log(await data);
    } catch (error) {
      console.log(error);
      // console.log("Error :" + error.response.data);
      // alert(error.response.data);
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
    const { redirectToReferer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (redirectToReferer) {
      return <Redirect to={from} />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="outer-box ">
          <div className="container1">
            <div className="login-box">
              <h1 className="display-4  " style={{ textAlign: "center" }}>
                LOGIN
              </h1>
              <div>
                <label htmlFor="email">email:</label>
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  // required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  onChange={this.handleChange}

                  // required
                />
              </div>

              <div className="col text-center  ">
                <button
                  className="btn btn-info "
                  style={{
                    backgroundColor: "#75aabd",
                    width: "85px",
                    borderColor: "#8bbae3",
                    marginTop: "60px",
                  }}
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
