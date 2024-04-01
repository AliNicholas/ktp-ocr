import { Box, makeStyles, Typography } from "@material-ui/core";
import Uploader from "./Uploader";
import placeholder from "../assets/image-placeholder.svg";
import { FONTS } from "@mindee/web-elements.assets";
import { Spinner } from "@mindee/web-elements.ui.spinner";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
  },
  image: {
    height: 200,
    width: "100%",
    objectFit: "contain",
  },
  placeholder: {
    height: 100,
    borderRadius: 8,
    objectFit: "contain",
    cursor: "pointer",
  },
}));

export default function ImageViewer({ onUpload, loadingImage }) {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Typography
        style={{ fontFamily: FONTS.bold, marginBottom: 20 }}
        paragraph
        variant="subtitle1"
      >
        Upload KTP
      </Typography>
      <Uploader
        style={{ height: "225px", justifyContent: "center" }}
        onUpload={onUpload}
      >
        {loadingImage ? (
          <Spinner />
        ) : (
          <Box
            border="1px solid #E6E9EC"
            borderRadius="4px"
            justifyContent="center"
            display="flex"
            width="100%"
            alignItems="center"
            flexDirection="column"
            style={{ rowGap: 10 }}
          >
            <img
              alt="placeholder"
              src={placeholder}
              className={classes.placeholder}
            />
            <Typography align="center" style={{ fontSize: 15 }} variant="body2">
              Upload foto KTP <br />
              (.jpg, .png, .webp)
            </Typography>
          </Box>
        )}
      </Uploader>
    </Box>
  );
}
