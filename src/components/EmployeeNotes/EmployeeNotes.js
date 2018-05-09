import React from "react";
import { connect } from "react-redux";

import classes from "./EmployeeNotes.css";
import AddEmployeeNote from "./AddEmployeeNote/AddEmployeeNote";
import NoteAndRating from "./NoteAndRating/NoteAndRating";

class EmployeeNotes extends React.Component {
  state = {
    disableAddNote: false
  };

  componentDidMount() {
    this.disableAddNote();
  }

  editNote = noteId => {
    console.log(noteId);
  };

  createNotesArray(arr, notes) {
    for (let key in notes) {
      if (key !== "initialNote") {
        arr.push({ ...notes[key], noteId: key });
      }
    }
  }

  disableAddNote = () => {
    const { employee } = this.props;

    let notesArray = [];
    this.createNotesArray(notesArray, employee.notes);

    const date = {
      day: new Date().getDay(),
      month: new Date().getMonth()
    };

    notesArray.forEach(note => {
      const noteDate = new Date(note.noteDate);
      if (
        noteDate.getDay() === date.day &&
        noteDate.getMonth() === date.month
      ) {
        this.setState({ disableAddNote: true });
      }
    });
  };

  render() {
    const { getRating, id, employee, showNotes } = this.props;
    const { EmployeeNotes, EmployeeNotesExpanded } = classes;
    const { disableAddNote } = this.state;

    let notesArray = [];
    this.createNotesArray(notesArray, employee.notes);

    return (
      <div
        className={`${EmployeeNotes} ${
          showNotes ? EmployeeNotesExpanded : null
        }`}
      >
        <div>
          <p>Notes and ratings</p>
          <ul>
            {notesArray.map(note => {
              return (
                <NoteAndRating
                  editNote={this.editNote}
                  key={note.noteDate}
                  {...note}
                />
              );
            })}
          </ul>
        </div>
        {!disableAddNote ? (
          <AddEmployeeNote
            disableAddNote={() => this.setState({ disableAddNote: true })}
            getRating={getRating}
            id={id}
            employee={employee}
          />
        ) : (
          <p>You already added note for today!</p>
        )}
      </div>
    );
  }
}

export default connect()(EmployeeNotes);
