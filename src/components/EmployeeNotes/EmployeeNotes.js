import React from "react";

import classes from "./EmployeeNotes.css";
import AddEmployeeNote from "./AddEmployeeNote/AddEmployeeNote";
import NoteAndRating from "./NoteAndRating/NoteAndRating";

class EmployeeNotes extends React.Component {
  render() {
    let notesArray = [];
    for (let key in this.props.employee.notes) {
      if (key !== "initialNote") {
        notesArray.push(this.props.employee.notes[key]);
      }
    }

    return (
      <div
        className={`${classes.EmployeeNotes} ${
          this.props.showNotes ? classes.EmployeeNotesExpanded : null
        }`}
      >
        <div>
          <p>Notes and ratings</p>
          <ul>
            {notesArray.map(note => {
              return <NoteAndRating key={note.noteDate} {...note} />;
            })}
          </ul>
        </div>
        <AddEmployeeNote
          getRating={this.props.getRating}
          id={this.props.id}
          employee={this.props.employee}
        />
      </div>
    );
  }
}

export default EmployeeNotes;
