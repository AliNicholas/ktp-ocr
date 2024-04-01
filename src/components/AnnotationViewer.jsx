import { Box, makeStyles } from "@material-ui/core";
import { COLORS, FONTS } from "@mindee/web-elements.assets";
import { Card } from "@mindee/web-elements.ui.card";
import { Typography } from "@mindee/web-elements.ui.typography";
import { Spinner } from "@mindee/web-elements.ui.spinner";
import { AnnotationViewer as AnnotationViewerBase } from "react-mindee-js";
const COMPONENT_ID = "AnnotationViewer";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
}));

export default function AnnotationViewer({
  setAnnotationStage,
  annotationData,
  onShapeMouseLeave,
  onShapeClick,
  loadingImage,
  onShapeMouseEnter,
}) {
  const classes = useStyles();
  return (
    <Card
      topBar
      id={COMPONENT_ID}
      contentStyle={{
        paddingTop: 15,
        height: "100%",
        display: "flex",
        width: "100%",
      }}
      header={
        <Typography
          style={{ fontFamily: FONTS.bold }}
          paragraph
          variant="subtitle1"
        >
          KTP yang sudah di proses
        </Typography>
      }
      className={classes.wrapper}
    >
      {loadingImage ? (
        <Spinner />
      ) : !annotationData.image ? (
        <Box
          height="465px"
          borderRadius="4px"
          border={`1px solid ${COLORS.border}`}
          display="flex"
          alignItems="center"
          width="100%"
          justifyContent="center"
        >
          <Typography variant="body2">foto belum di upload</Typography>
        </Box>
      ) : (
        <AnnotationViewerBase
          onShapeMouseLeave={onShapeMouseLeave}
          onShapeMouseEnter={onShapeMouseEnter}
          onShapeClick={onShapeClick}
          data={annotationData}
          getStage={setAnnotationStage}
          style={{ height: "465px", width: "100%", background: "white" }}
        />
      )}
    </Card>
  );
}
