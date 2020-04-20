import React, { Component } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { paginate } from "../../components/utils/paginate";
import { Link } from "react-router-dom";

export default class Patients extends Component {
  state = {
    patients: [],
    pageSize: 10,
    currentPage: 1,
    searchInput: "",
    searchReasults: [],
    searchPressed: false,
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

  handleSerchInputChange = ({ currentTarget: input }) => {
    let { searchInput } = this.state;
    searchInput = input.value;
    this.setState({ searchInput });
    console.log(this.state.searchInput);
  };

  handleSearch = (e) => {
    e.preventDefault();
    let {
      patients,
      searchInput,
      searchReasults,
      currentPage,
      searchPressed,
    } = this.state;
    currentPage = 1;
    searchPressed = true;
    let reg = new RegExp("^" + searchInput, "i");
    searchReasults = patients.filter((patient) =>
      reg.test(patient.first_name.toString())
    );
    this.setState({ currentPage, searchReasults, searchPressed });
    console.log(searchReasults);
  };

  render() {
    const {
      patients,
      pageSize,
      currentPage,
      searchReasults,
      searchPressed,
    } = this.state;
    const p_patients = paginate(
      searchReasults.length === 0 ? patients : searchReasults,
      currentPage,
      pageSize
    );
    return (
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <br />
        <form onSubmit={this.handleSearch}>
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <span className="badge"> search by patient name</span>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="patient name"
                  size="70"
                  name="searchInput"
                  onChange={this.handleSerchInputChange}
                />
              </div>
            </div>
            <div className="col">
              <button
                className="btn btn-info"
                type="submit"
                // onClick={this.handleSearch}
              >
                search
              </button>
            </div>
          </div>
        </form>
        {searchPressed && searchReasults.length === 0 ? (
          <h3>no patient with this name</h3>
        ) : (
          ""
        )}
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">First</th>
              <th scope="col">email</th>
              <th scope="col">gender</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {p_patients.map((p) => (
              <tr key={p.id}>
                <th scope="row">{p.id}</th>
                <td>
                  <Link to={`/patients/records/${p.id}`}>{p.first_name}</Link>
                </td>
                <td>{p.email}</td>
                <td>{p.gender}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => console.log("pressed")}
                  >
                    diagnose
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pagination
            itemCount={
              searchReasults.length === 0
                ? patients.length
                : searchReasults.length
            }
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}
