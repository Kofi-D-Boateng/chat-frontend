import { GridTypeMap, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

const Messages: FC<{
  classes: {
    readonly [key: string]: string;
  };
  sender: string;
  id: string;
  myID: string;
  time: number;
  message: string;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
}> = ({ classes, id, message, myID, sender, time, Grid, Typography }) => {
  const check: boolean = id === myID;
  return (
    <Grid className={check ? classes.msg : classes.peerMsg} container>
      <Grid xs={12} md={12} item>
        <Typography variant="h6" className={classes.msgTitle}>
          {check
            ? `You:${new Date(time).toUTCString()}`
            : `${sender}:${new Date(time).toUTCString()}`}
        </Typography>
      </Grid>
      <Grid xs={12} md={12} item>
        <Typography variant="h6">{message}</Typography>
      </Grid>
    </Grid>
  );
};

export default Messages;
