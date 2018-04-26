import React, { Component } from "react";

import AddEmployeeNote from "./AddEmployeeNote/AddEmployeeNote";

class EmployeeNotes extends Component {
  state = {
    rating: ""
  };
  getRating = overall => {
    let rating = (Math.round(overall * 100) / 100).toString();
    this.setState({ rating });
  };

  render() {
    return (
      <div>
        <p>Rating: {this.state.rating}</p>
        <AddEmployeeNote
          getRating={this.getRating}
          id={this.props.id}
          employee={this.props.employee}
        />
      </div>
    );
  }
}

export default EmployeeNotes;
