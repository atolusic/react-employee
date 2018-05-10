import React, { Component } from "react";
import { connect } from "react-redux";

import { addNote } from "../../../store/actions/notes";
import Auxiliary from "../../../hoc/Auxiliary";

class addEmployeeNote extends Component {
  state = {
    rateInput: 0,
    noteInput: "",
    rateValid: false,
    formValid: false
  };

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value }, () => {
      if (name === "rateInput") {
        this.validateField(name, value);
      }
    });
  }

  validateField(fieldName, value) {
    let rateValid = this.state.rateInput;
    switch (fieldName) {
      case "rateInput":
        let parsed = parseInt(value, 10);
        rateValid = parsed >= 1 && parsed <= 5;
        break;
      default:
        break;
    }

    this.setState({ rateValid: rateValid }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.rateValid });
  }

  onSubmit(e, date) {
    const { addNote, id, disableAddNote } = this.props;
    const { noteInput, rateInput } = this.state;

    e.preventDefault();

    let noteAndRating = {
      note: noteInput,
      noteDate: date,
      review: rateInput
    };

    addNote(id, noteAndRating);
    this.setState({ rateInput: 0, noteInput: "" });
    disableAddNote();
  }

  render() {
    const { noteInput, rateInput, formValid } = this.state;

    const date = new Date()
      .toUTCString()
      .split(" ")
      .slice(0, 5)
      .join(" ");

    return (
      <Auxiliary>
        <form onSubmit={e => this.onSubmit(e, date)}>
          <p>
            Rate or add notes for this working day. ({date
              .split(" ")
              .slice(0, 4)
              .join(" ")})
          </p>
          <label htmlFor="noteInput">Notes</label>
          <textarea
            value={noteInput}
            name="noteInput"
            onChange={e => this.handleUserInput(e)}
          />
          <label htmlFor="rateInput">Rate employee 1-5.</label>
          <input
            name="rateInput"
            type="number"
            onChange={e => this.handleUserInput(e)}
            value={rateInput}
          />
          <button disabled={!formValid}>Add</button>
        </form>
      </Auxiliary>
    );
  }
}

export default connect(null, { addNote })(addEmployeeNote);
