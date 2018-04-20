import React, { Component } from "react";
import { connect } from "react-redux";

import { uploadImage } from "../../store/actions/employees";

class UploadImage extends Component {
  state = {
    image: null
  };

  render() {
    return (
      <div>
        <progress value="0" max="100" />
        <input
          onChange={event => this.setState({ image: event.target.files[0] })}
          type="file"
        />
        <button
          disabled={!this.state.image}
          onClick={event =>
            this.props.uploadImage(this.props.id, this.state.image)
          }
        >
          Upload
        </button>
      </div>
    );
  }
}

export default connect(null, { uploadImage })(UploadImage);
