import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { AxiosStatic } from "axios";
import { Dispatch, FC, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import LoggedInFindRoom from "../component/homepage/LoggedInFindRooom";
import RegularFindRoom from "../component/homepage/RegularFindRoom";
import { SEARCH } from "../component/UI/Constatns";
import classes from "../styles/HomeStyles.module.css";
import { User } from "../types/types";

const Homepage: FC<{
  user: User;
  isMobile: boolean;
  axios: AxiosStatic;
  dispatch: Dispatch<any>;
}> = ({ user, isMobile, axios, dispatch }) => {
  const nav: NavigateFunction = useNavigate();

  useEffect(() => {
    if ((user.roomID?.trim().length as number) > 0) {
      nav(`${SEARCH}?room=${user.roomID as string}`, { replace: true });
    }
  }, [user.roomID, nav, axios, dispatch]);

  return (
    <Grid className={classes.homeContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        <div className={classes.cardHeader}>
          <p>
            {!user.isLoggedIn
              ? "Welcome to Hangout!"
              : `Welcome back ${user.username}`}
          </p>
        </div>
        <CardContent>
          {!user.isLoggedIn ? (
            <RegularFindRoom
              dispatch={dispatch}
              isMobile={isMobile}
              classes={classes}
              Grid={Grid}
              Typography={Typography}
              TextField={TextField}
              Button={Button}
              nav={nav}
            />
          ) : (
            <LoggedInFindRoom Button={Button} />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Homepage;
