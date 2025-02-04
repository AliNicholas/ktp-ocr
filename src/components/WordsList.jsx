import React from "react";
import {
  Box,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";
import { COLORS, FONTS } from "@mindee/web-elements.assets";

const COMPONENT_ID = "WordsList";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
  },
  list: {
    overflow: "hidden auto",
    height: "465px",
    width: "100%",
  },
  item: {
    width: "100%",
    padding: 20,
    cursor: "pointer",
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    borderLeft: "3px solid transparent",
    "&:hover": {
      borderLeftWidth: 8,
    },
  },
  loader: {
    margin: "auto",
  },
}));

export default function WordsList({
  words,
  onFieldMouseEnter,
  onFieldMouseLeave,
  extractingWords,
  fieldRefsObject,
}) {
  const classes = useStyles();
  return (
    <Card
      topBar
      header={
        <Box display="flex" flexDirection="column">
          <Typography
            style={{ fontFamily: FONTS.bold }}
            paragraph
            variant="subtitle1"
          >
            Informasi yang terbaca
          </Typography>
          <Typography style={{ fontSize: 14, marginTop: -5 }} variant="caption">
            {words.length ? `${words.length}  words identified` : ""}
          </Typography>
        </Box>
      }
      contentStyle={{
        paddingTop: 20,
      }}
      id={COMPONENT_ID}
      className={classes.wrapper}
    >
      <Grid container id={COMPONENT_ID} className={classes.list}>
        {!extractingWords && !words.length && (
          <Box
            height="100%"
            width="100%"
            borderRadius="4px"
            border={`1px solid ${COLORS.border}`}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body2">foto belum di proses</Typography>
          </Box>
        )}
        {extractingWords ? (
          <CircularProgress className={classes.loader} />
        ) : (
          words.map((word, key) => (
            <Grid
              onMouseEnter={() => onFieldMouseEnter(word)}
              onMouseLeave={() => onFieldMouseLeave(word)}
              className={classes.item}
              key={key}
              item
              ref={fieldRefsObject[key]}
              xs={12}
              style={{
                borderLeftColor: word.color,
                borderLeftWidth: word.isActive ? 8 : undefined,
              }}
            >
              <Typography key={key}>{word.words.join(", ")}</Typography>
            </Grid>
          ))
        )}
      </Grid>
    </Card>
  );
}
