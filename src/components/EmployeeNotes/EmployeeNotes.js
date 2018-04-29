import React from "react";

import classes from "./EmployeeNotes.css";
import AddEmployeeNote from "./AddEmployeeNote/AddEmployeeNote";
import NoteAndRating from "./NoteAndRating/NoteAndRating";

const EmployeeNotes = props => {
  let notesArray = [];
  for (let key in props.employee.notes) {
    if (key !== "initialNote") {
      notesArray.push(props.employee.notes[key]);
    }
  }
  return (
    <div
      className={`${classes.EmployeeNotes} ${
        props.toggleVisibility ? classes.EmployeeNotesVisible : null
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
        getRating={props.getRating}
        id={props.id}
        employee={props.employee}
      />
    </div>
  );
};

export default EmployeeNotes;
