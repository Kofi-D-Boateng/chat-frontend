import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { AxiosStatic } from "axios";
import { Dispatch, FC, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import LoggedInFindRoom from "../component/homepage/LoggedInFindRooom";
import RegularFindRoom from "../component/homepage/RegularFindRoom";
import { SEARCH, ROOM, CREATEROOM } from "../component/UI/Constatns";
import LoadingSpinner from "../component/UI/LoadingSpinner";
import { userActions } from "../store/user/user-slice";
import classes from "../styles/HomeStyles.module.css";
import { User } from "../types/types";

const Homepage: FC<{
  user: User;
  isMobile: boolean;
  axios: AxiosStatic;
  dispatch: Dispatch<any>;
}> = ({ user, isMobile, axios, dispatch }) => {
  const nav: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<{ id: string }>({ id: "" });

  useEffect(() => {
    if ((room.id.trim().length as number) > 0) {
      nav(`${SEARCH}?room=${room.id}`, { replace: true });
    }
  }, [room, nav, axios, dispatch]);

  const createRoom: () => void = async () => {
    setLoading(true);
    await axios
      .get(CREATEROOM)
      .then((response) => {
        dispatch(userActions.setRoom({ roomID: response.data.roomID }));
        nav(`${ROOM}/${user.roomID}/settings`, { replace: true });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Grid className={classes.homeContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        {!loading ? (
          <>
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
                  isMobile={isMobile}
                  classes={classes}
                  Grid={Grid}
                  Typography={Typography}
                  createRoom={createRoom}
                  TextField={TextField}
                  Button={Button}
                  nav={nav}
                  setRoom={setRoom}
                />
              ) : (
                <LoggedInFindRoom Button={Button} />
              )}
            </CardContent>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Card>
    </Grid>
  );
};

export default Homepage;
