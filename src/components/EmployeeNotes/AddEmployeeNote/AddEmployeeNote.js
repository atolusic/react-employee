import React, { Component } from "react";
import { connect } from "react-redux";

import { addNote } from "../../../store/actions/notes";
import Auxiliary from "../../../hoc/Auxiliary";

class addEmployeeNote extends Component {
  state = {
    overallRating: 0
  };

  conutRating(propType) {
    let rateings = [];
    for (let note in propType.employee.notes) {
      rateings.push(propType.employee.notes[note].review);
    }
    return rateings.reduce((acc, next) => {
      return acc + next;
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.employee.notes) {
      let rateing = 0;
      if (
        Object.keys(this.props.employee.notes).length !==
        Object.keys(nextProps.employee.notes).length
      ) {
        rateing = this.conutRating(nextProps);
        this.setState({
          overallRating:
            rateing / (Object.keys(nextProps.employee.notes).length - 1)
        });
      }
    }
  }
  componentDidMount() {
    // let rateings = [];
    // for (let note in this.props.employees[this.props.id].notes) {
    //   rateings.push(this.props.employees[this.props.id].notes[note].review);
    // }
    // console.log(
    //   rateings.reduce((acc, next) => {
    //     return acc + next;
    //   }, 0)
    // );
    // this.setState({});
    // console.log(this.props.employee);
    let rateing = this.conutRating(this.props);
    if (Object.keys(this.props.employee.notes).length > 1) {
      this.setState({
        overallRating:
          rateing / (Object.keys(this.props.employee.notes).length - 1)
      });
    }
  }
  render() {
    const date = new Date()
      .toUTCString()
      .split(" ")
      .slice(0, 5)
      .join(" ");
    return (
      <Auxiliary>
        <form onSubmit={this.onSubmit}>
          {this.props.employee ? console.log(this.state.overallRating) : null}
          <p>
            Rate employee for this working day. ({date
              .split(" ")
              .slice(0, 4)
              .join(" ")}) Please input number 1-5.
          </p>
          <input type="number" />
        </form>
        <button
          onClick={e => {
            const date = new Date()
              .toUTCString()
              .split(" ")
              .slice(0, 5)
              .join(" ");
            this.props.addNote(this.props.id, { noteDate: date, review: 5 });
          }}
        >
          KLIK
        </button>
      </Auxiliary>
    );
  }
}

export default connect(null, { addNote })(addEmployeeNote);
