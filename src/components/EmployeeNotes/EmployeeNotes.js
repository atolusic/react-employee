import React, { Component } from "react";

import AddEmployeeNote from "./AddEmployeeNote/AddEmployeeNote";

class EmployeeNotes extends Component {
  render() {
    return (
      <div>
        <button
          onClick={e => {
            const date = new Date()
              .toUTCString()
              .split(" ")
              .slice(0, 5)
              .join(" ");
            this.props.addNote(this.props.id, { noteDate: date });
          }}
        >
          KLIK
        </button>
      </div>
    );
  }
}

export default EmployeeNotes;
