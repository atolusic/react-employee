import React, { Component } from "react";

import AddEmployeeNote from "./AddEmployeeNote/AddEmployeeNote";

class EmployeeNotes extends Component {
  render() {
    return (
      <div>
        <AddEmployeeNote id={this.props.id} employee={this.props.employee} />
      </div>
    );
  }
}

export default EmployeeNotes;
