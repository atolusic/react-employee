import React, { Component } from "react";
import { connect } from "react-redux";

import { uploadImage, setEmployeePhoto } from "../../store/actions/employees";
import classes from "./UploadImage.css";

class UploadImage extends Component {
  state = {
    image: null,
    imgUploadProcess: 0
  };

  onUploadClickHandler = event => {
    this.props.uploadImage(this.props.id, this.state.image).on(
      "state_changed",
      snapshot => {
        let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        this.setState({ imgUploadProcess: percentage });
      },
      err => {
        console.log(err);
      },
      () => {
        this.props.setEmployeePhoto(this.props.id);
      }
    );
  };

  render() {
    return (
      <div>
        <progress value={this.state.imgUploadProcess} max="100" />
        <input
          onChange={event => this.setState({ image: event.target.files[0] })}
          type="file"
        />
        <button
          disabled={!this.state.image}
          onClick={event => this.onUploadClickHandler(event)}
        >
          Upload
        </button>
      </div>
    );
  }
}

export default connect(null, { uploadImage, setEmployeePhoto })(UploadImage);
