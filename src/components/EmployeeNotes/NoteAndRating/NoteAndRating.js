import React from "react";
import StarRatings from "react-star-ratings";

const NotesAndRatings = props => {
  const { editNote, note, noteId, noteDate, review } = props;
  return (
    <li>
      <p>{noteDate}</p>
      <p>{note}</p>
      <StarRatings
        rating={parseInt(review, 10)}
        starDimension="10px"
        starSpacing="1px"
        starRatedColor="#FDE16D"
      />
      <button onClick={e => editNote(noteId)}>Edit</button>
    </li>
  );
};

export default NotesAndRatings;
