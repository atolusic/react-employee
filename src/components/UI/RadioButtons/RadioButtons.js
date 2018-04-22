import React from "react";

import Auxiliary from "../../../hoc/Auxiliary";

const RadioButtons = props => {
  let radio = props.labels.map((label, i) => {
    return (
      <Auxiliary key={i}>
        <label>{label}</label>
        <input
          name={props.radioButtonFor}
          type="radio"
          checked={label === "F" ? !props.isMale : props.isMale}
          onChange={props.onClickChangeGenderHandler}
        />
      </Auxiliary>
    );
  });

  return <Auxiliary>{radio}</Auxiliary>;
};

export default RadioButtons;
