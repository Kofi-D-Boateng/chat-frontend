import { FC, ForwardedRef, useEffect, useRef } from "react";
import { Participant } from "../../../types/types";
import { Grid, Paper, Typography } from "@mui/material";

const Video: FC<{
  classes: {
    readonly [key: string]: string;
  };
  peer: Participant;
}> = ({ peer, classes }) => {
  const userVideo: ForwardedRef<any> = useRef<HTMLVideoElement | MediaStream>();
  useEffect(() => {
    peer.instance?.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
  });
  return (
    <Paper className={classes.paper} sx={{ backgroundColor: "black" }}>
      <Grid item xs={12} md={12}>
        <Typography variant="h5" className={classes.name} gutterBottom>
          {peer.alias}
        </Typography>
        <video ref={userVideo} playsInline autoPlay className={classes.video} />
      </Grid>
    </Paper>
  );
};

export default Video;
