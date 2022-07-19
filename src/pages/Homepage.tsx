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
import { User } from "../types/types";
import RegularFindRoom from "../component/homepage/RegularFindRoom";
import LoggedInFindRoom from "../component/homepage/LoggedInFindRooom";

const Homepage: FC<{
  user: User;
  isMobile: boolean;
  axios: AxiosStatic;
  dispatch: Dispatch<any>;
  param: URLSearchParams;
}> = ({ user, isMobile, axios, dispatch, param }) => {
  const nav: NavigateFunction = useNavigate();
  const [room, setRoom] = useState<{ id: string }>({ id: "" });
  const isLoggedIn: String | null = param.get("loggedIn");

  useEffect(() => {
    if ((room.id.trim().length as number) > 0) {
      nav(`${SEARCH}?room=${room.id}`, { replace: true });
    }
  }, [room, nav, axios, dispatch]);

  return (
    <Grid className={classes.homeContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        <>
          <div className={classes.cardHeader}>
            <p>
              {!isLoggedIn || !user.isLoggedIn
                ? "Welcome to Hangout!"
                : `Welcome back ${user.username}`}
            </p>
          </div>
          <CardContent>
            {!isLoggedIn ? (
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
            ) : (
              <LoggedInFindRoom
                Button={Button}
                Grid={Grid}
                Typography={Typography}
                TextField={TextField}
                nav={nav}
                setRoom={setRoom}
              />
            )}
          </CardContent>
        </>
      </Card>
    </Grid>
  );
};

export default Homepage;
