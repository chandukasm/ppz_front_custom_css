import React, { Component } from "react";
import TableCreator from "../components/TableCreator";
import axios from "axios";

export default class Wallet extends Component {
  state = {
    patients: [],

    currentPage: 1,
  };
  async componentDidMount() {
    const { data: patients } = await axios.get(
      "http://localhost:3000/api/patient/all"
    );
    console.log(patients);

    this.setState({ patients });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    return (
      <div>
        <TableCreator
          items={this.state.patients}
          pageSize={10}
          headers={["id", "first", "email", "gender"]}
          tds={["id", "first_name", "email", "gender"]}
        />
      </div>
    );
  }
}
