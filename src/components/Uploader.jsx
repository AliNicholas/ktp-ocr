import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useDropzone } from "react-dropzone";

const COMPONENT_ID = "Uploader";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: 0,
  },
}));

export default function Uploader({ children, onUpload, style }) {
  const classes = useStyles();
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((acceptedFile) => {
      onUpload({
        source: acceptedFile,
        image: URL.createObjectURL(acceptedFile),
      });
    });
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    onDrop,
    multiple: false,
  });
  return (
    <Box
      id={COMPONENT_ID}
      height="100%"
      width="100%"
      className={classes.wrapper}
      display="flex"
      style={style}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {children}
    </Box>
  );
}
