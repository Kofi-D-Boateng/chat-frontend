import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosStatic } from "axios";
import { Dispatch, FC, useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import Settings from "../../component/forms/create/Settings";
import { CREATEROOM, ROOM } from "../../component/UI/Constatns";
import { userActions } from "../../store/user/user-slice";
import classes from "../../styles/CreateRoomStyles.module.css";
import { Room, User } from "../../types/types";

const CreateRoom: FC<{
  params: URLSearchParams;
  axios: AxiosStatic;
  nav: NavigateFunction;
  isMobile: boolean;
  user: User;
  dispatch: Dispatch<any>;
}> = ({ params, axios, nav, isMobile, user, dispatch }) => {
  const URL: string = ROOM.substring(0, 9);
  const isLoggedin: boolean = params.get("loggedIn") as unknown as boolean;
  const [room, setRoom] = useState<Room>({
    name: "",
    creator: "",
    capacity: 0,
  });

  useEffect(() => {
    if (room.capacity === 0) return;
    const fetchCreateRoom: (
      createdRoom: Room,
      axios: AxiosStatic,
      nav: NavigateFunction
    ) => void = async (room, axios, nav) => {
      await axios
        .post(CREATEROOM, room)
        .then((response) => {
          const { roomName, roomID, username } = response.data;
          dispatch(
            userActions.setUser({
              isAdmin: true,
              username: username,
              token: user.token as string,
              roomID: roomID,
              socketID: user.socketID,
            })
          );
          nav(`${URL}?room=${roomName}`, { replace: true });
        })
        .catch();
    };
    fetchCreateRoom(room, axios, nav);
  }, [room, axios, nav, URL, dispatch, user.socketID, user.token]);

  return (
    <Grid className={classes.mainContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        <Grid>
          <Typography className={classes.cardHeader} variant="h5">
            Please fill out the form below!
          </Typography>
          <CardContent>
            <Settings
              isLoggedIn={isLoggedin}
              classes={classes}
              user={user}
              TextField={TextField}
              Button={Button}
              setRoom={setRoom}
            />
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CreateRoom;
