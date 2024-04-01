import { Grid, makeStyles } from "@material-ui/core";
import { COLORS } from "@mindee/web-elements.assets";
import VisionWrapper from "./components/VisionWrapper";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
    width: "100%",
  },
  content: {
    background: COLORS.background,
    paddingLeft: 42,
    paddingRight: 42,
    paddingTop: 10,
    marginTop: 0.5,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.wrapper} container>
        <Grid item xs={12}>
          <VisionWrapper />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
