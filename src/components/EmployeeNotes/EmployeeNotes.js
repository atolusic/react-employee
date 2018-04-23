import React, { Component } from "react";
import { connect } from "react-redux";

import { addNote } from "../../store/actions/notes";
import database from "../../firebase/firebase";

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

export default connect(null, { addNote })(EmployeeNotes);
