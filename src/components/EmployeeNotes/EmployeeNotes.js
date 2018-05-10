import React from "react";
import { connect } from "react-redux";

import classes from "./EmployeeNotes.css";
import AddEmployeeNote from "./AddEmployeeNote/AddEmployeeNote";
import NoteAndRating from "./NoteAndRating/NoteAndRating";

class EmployeeNotes extends React.Component {
  state = {
    disableAddNote: false,
    overallRating: 0
  };

  conutRating(propType) {
    let rateings = [];
    for (let note in propType.employee.notes) {
      rateings.push(parseInt(propType.employee.notes[note].review, 10));
    }
    return rateings.reduce((acc, next) => {
      return acc + next;
    }, 0);
  }

  setOverallRating(lifecycle, nextProps, propType) {
    let rateing = this.conutRating(propType);
    let ifTrue = null;

    const handleSetState = iftrue => {
      if (iftrue) {
        this.setState(
          {
            overallRating:
              rateing / (Object.keys(propType.employee.notes).length - 1)
          },
          () => {
            this.props.getRating(this.state.overallRating);
          }
        );
      }
    };

    switch (lifecycle) {
      case "didMount":
        ifTrue = Object.keys(this.props.employee.notes).length > 1;
        handleSetState(ifTrue);
        break;
      case "willReciveProps":
        ifTrue =
          Object.keys(this.props.employee.notes).length !==
          Object.keys(nextProps.employee.notes).length;
        handleSetState(ifTrue);
        break;
      default:
        return;
    }
  }

  componentDidMount() {
    this.disableAddNote();
    this.setOverallRating("didMount", null, this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setOverallRating("willReciveProps", nextProps, nextProps);
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
