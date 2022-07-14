import { FC, ForwardedRef, useEffect, useRef } from "react";
import { Participants } from "../../../types/types";
import { Instance } from "simple-peer";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { GridTypeMap, PaperTypeMap, TypographyTypeMap } from "@mui/material";

const Video: FC<{
  classes: {
    readonly [key: string]: string;
  };
  users: Participants[];
  myUsername: string;
  peer: Instance;
  Paper: OverridableComponent<PaperTypeMap<{}, "div">>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
}> = ({ myUsername, peer, users, Grid, Paper, Typography, classes }) => {
  const ref: ForwardedRef<any> = useRef<HTMLVideoElement | MediaStream>();
  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);
  return (
    <Paper className={classes.paper} sx={{ backgroundColor: "black" }}>
      <Grid item xs={12} md={12}>
        {users
          .filter((u) => {
            return u.alias !== myUsername;
          })
          .map((u, index) => {
            return (
              <Typography
                key={index}
                variant="h5"
                className={classes.name}
                gutterBottom
              >
                {u.alias}
              </Typography>
            );
          })}
        <video playsInline muted ref={ref} autoPlay className={classes.video} />
      </Grid>
    </Paper>
  );
};

export default Video;
