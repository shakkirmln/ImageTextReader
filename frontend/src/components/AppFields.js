import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, TextField, Button, withStyles } from '@material-ui/core';
import UploadService from "../services/Upload";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default class AppFields extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      currentFile: undefined,
      previewImage: undefined,
      progress: 0,
      imgtxt: "",

      message: "",
      isError: false,
    };
  }

  componentDidMount() {
    
  }

  selectFile(event) {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      imgtxt: "",
      message: ""
    });
  }

  upload() {
    this.setState({
      progress: 0
    });

    UploadService.upload(this.state.currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
        message: "Please wait, uploading and processing the image...",
      });
    })
      .then((response) => {
        this.setState({
          imgtxt: response.data.text,
          message: response.data.message,
          isError: false
        });
      })
      .catch((err) => {
        this.setState({
          progress: 0,
          message: "Timeout!, processing the image took more time",
          currentFile: undefined,
          imgtxt: "",
          isError: true
        });
      });
  }

  render() {
    const {
      currentFile,
      previewImage,
      progress,
      message,
      imgtxt,
      isError
    } = this.state;
    
    return (
      <div className="container">
        <div className="mg20">
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="image"
              style={{ display: 'none' }}
              type="file"
              accept="image/png, image/jpeg, image/gif"
              onChange={this.selectFile} />
            <Button
              className="btn-choose"
              variant="outlined"
              component="span" >
              Choose Image
            </Button>
          </label>
          <div className="file-name">
          {currentFile ? currentFile.name : null}
          </div>
          <Button
            className="btn-upload"
            color="primary"
            variant="contained"
            component="span"
            disabled={!currentFile}
            onClick={this.upload}>
            Upload
          </Button>

          {currentFile && (
            <Box className="my20" display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <BorderLinearProgress variant="determinate" value={progress} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
              </Box>
            </Box>)
          }
          <div className="out">
            {previewImage && (
              <div>
                <img className="preview my20" src={previewImage} alt="" />
              </div>
            )}

            {message && (
              <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                {message}
              </Typography>
            )}
            <Box mt={7} >
              <TextField
                id="outlined-textarea"
                label="Text from the Image"
                className="outtxt"
                value={imgtxt}
                placeholder="Text"
                multiline
                variant="outlined"
              />
            </Box>
          </div>
        </div >
      </div>
    );
  }
}
