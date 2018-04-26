import React from "react";
import StarRatings from "react-star-ratings";

const NotesAndRatings = props => {
  return (
    <li>
      <p>{props.noteDate}</p>
      <p>{props.note}</p>
      <StarRatings
        rating={parseInt(props.review, 10)}
        starDimension="10px"
        starSpacing="1px"
        starRatedColor="#FDE16D"
      />
    </li>
  );
};

export default NotesAndRatings;
