import React, { Component } from "react";
import { paginate } from "./utils/paginate";
import Pagination from "./Pagination";

export default class TableCreator extends Component {
  state = {
    currentPage: 1,
  };

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };
  render() {
    const { items, pageSize, headers, tds } = this.props;
    const tabledata = paginate(items, this.state.currentPage, pageSize);

    return (
      <div className="container">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabledata.map((obj, i) => (
              <tr key={obj.id}>
                {tds.map((td) => (
                  <td key={i++}>{obj[td]}</td>
                ))}
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
            itemCount={items.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}
