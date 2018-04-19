import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary";
import classes from "./SearchEmployee.css";

class SearchEmployee extends Component {
  render() {
    return (
      <Auxiliary>
        <input
          placeholder="Search Employee By Name"
          className={classes.Search}
          disabled={this.props.employees}
          type="text"
          value={this.props.search}
          onChange={e => this.props.searchHandler(e)}
        />
      </Auxiliary>
    );
  }
}

export default SearchEmployee;
