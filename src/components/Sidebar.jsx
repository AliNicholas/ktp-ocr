import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";
import { SelectInput } from "@mindee/web-elements.ui.select-input";
import { DET_CONFIG, RECO_CONFIG } from "../utils/constants";
import { FONTS } from "@mindee/web-elements.assets";

const COMPONENT_ID = "Sidebar";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
  },
  item: {
    rowGap: 5,
  },
}));

export default function Sidebar({
  detConfig,
  setDetConfig,
  recoConfig,
  setRecoConfig,
}) {
  const classes = useStyles();
  return (
    <Card
      topBar
      // header={
      //   <Typography
      //     style={{ fontFamily: FONTS.bold }}
      //     paragraph
      //     variant="subtitle1"
      //   >
      //     Upload Foto KTP
      //   </Typography>
      // }
      contentStyle={{
        paddingTop: 10,
      }}
      id={COMPONENT_ID}
      className={classes.wrapper}
    >
      <Box
        display={"flex"}
        flexDirection="column"
        style={{
          rowGap: 8,
        }}
      >
        {/* <Box className={classes.item} display="flex" flexDirection="column ">
          <Typography>Detection model</Typography>
          <SelectInput
            value={detConfig}
            onChange={(value) => setDetConfig(value)}
            options={Object.values(DET_CONFIG)}
          />
        </Box>
        <Box className={classes.item} display="flex" flexDirection="column ">
          <Typography>Recognition model</Typography>
          <SelectInput
            value={recoConfig}
            onChange={(value) => setRecoConfig(value)}
            options={Object.values(RECO_CONFIG)}
          />
        </Box> */}
        <Box mt="10px" id="upload-container"></Box>
      </Box>
    </Card>
  );
}
