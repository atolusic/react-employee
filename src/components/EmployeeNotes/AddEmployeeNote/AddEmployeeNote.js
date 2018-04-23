import React from "react";
import { connect } from "react-redux";

import { addNote } from "../../../store/actions/notes";
import database from "../../../firebase/firebase";
import Auxiliary from "../../../hoc/Auxiliary";

const addEmployeeNote = props => {
  return <Auxiliary />;
};

export default connect(null, { addNote })(addEmployeeNote);
