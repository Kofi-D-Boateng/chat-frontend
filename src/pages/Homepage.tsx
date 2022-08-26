import { Dispatch, FC, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosStatic } from "axios";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { SEARCH } from "../component/UI/Constatns";
import classes from "../styles/HomeStyles.module.css";
import RegularFindRoom from "../component/homepage/RegularFindRoom";

const Homepage: FC<{
  isMobile: boolean;
  axios: AxiosStatic;
  dispatch: Dispatch<any>;
}> = ({ isMobile, axios, dispatch }) => {
  const nav: NavigateFunction = useNavigate();
  const [room, setRoom] = useState<{ id: string }>({ id: "" });

  useEffect(() => {
    if ((room.id.trim().length as number) > 0) {
      nav(`${SEARCH}?roomID=${room.id}`, { replace: false });
    }
  }, [room, nav, axios, dispatch]);

  return (
    <Grid className={classes.homeContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        <>
          <div className={classes.cardHeader}>
            <p>Welcome to Hangout!</p>
          </div>
          <CardContent>
            <RegularFindRoom
              isMobile={isMobile}
              classes={classes}
              Grid={Grid}
              Typography={Typography}
              TextField={TextField}
              Button={Button}
              nav={nav}
              setRoom={setRoom}
            />
          </CardContent>
        </>
      </Card>
    </Grid>
  );
};

export default Homepage;
