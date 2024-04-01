import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  image: {
    height: "35vh",
    margin: "auto",
    display: "none",
  },
}));

export default function HeatMap({ heatMapContainerRef }) {
  const classes = useStyles();
  return (
    <canvas className={classes.image} id="heatmap" ref={heatMapContainerRef} />
  );
}
