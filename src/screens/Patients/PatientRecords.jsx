import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import TableCreator from "../../components/TableCreator";

export default class recordsRecords extends Component {
  state = {
    records: [],
    pageSize: 10,
    currentPage: 1,
    searchInput: "",
    searchReasults: [],
    searchPressed: false,
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const { data: records } = await axios.get(
      `http://localhost:3000/api/diagnose/${id}`
    );
    console.log(records);

    this.setState({ records });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { records, pageSize, currentPage } = this.state;
    return records.length === 0 ? (
      <h1 style={{ textAlign: "center" }}>No records for this patient</h1>
    ) : (
      // <div>
      //   {this.props.match.params.id}
      //   <table className="table table-striped table-sm">
      //     <thead>
      //       <tr>
      //         <th scope="col">reciept id</th>
      //         <th scope="col">description</th>
      //         <th scope="col">created date</th>
      //         <th scope="col">doctor</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {records.map((p) => (
      //         <tr key={p.id}>
      //           <th scope="row">{p.id}</th>

      //           <td>{p.description}</td>
      //           <td>{p.created}</td>
      //           <td>{p.doctor}</td>
      //         </tr>
      //       ))}
      //     </tbody>
      //   </table>
      //   <Pagination
      //     itemCount={records.length}
      //     pageSize={pageSize}
      //     onPageChange={this.handlePageChange}
      //     currentPage={currentPage}
      //   />
      // </div>
      <React.Fragment>
        <div className="container m-2" style={{ textAlign: "center" }}>
          <button className="btn btn-success ">
            <i class="fa fa-download"></i> download
            {/* <FontAwesomeIcon icon="coffee" /> */}
          </button>
        </div>

        <TableCreator
          items={this.state.records}
          pageSize={10}
          headers={["reciept id", "description", "created date", "doctor"]}
          tds={["id", "description", "created", "doctor_name"]}
        />
      </React.Fragment>
    );
  }
}
