import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosStatic } from "axios";
import { Dispatch, FC, FormEvent, useRef } from "react";
import { NavigateFunction } from "react-router-dom";
import Settings from "../component/forms/create/Settings";
import { CREATEROOM, ROOM } from "../component/UI/Constatns";
import { userActions } from "../store/user/user-slice";
import classes from "../../src/styles/CreateRoomStyles.module.css";
import { Room, User } from "../types/types";

const CreateRoom: FC<{
  axios: AxiosStatic;
  nav: NavigateFunction;
  isMobile: boolean;
  user: User;
  dispatch: Dispatch<any>;
}> = ({ axios, nav, isMobile, user, dispatch }) => {
  const URL: string = ROOM.substring(0, 9);
  const roomNameRef = useRef<HTMLInputElement | undefined>();
  const usernameRef = useRef<HTMLInputElement | undefined>();
  const capacityRef = useRef<HTMLInputElement | undefined>();
  const submitHandler: (e: FormEvent) => void = (e) => {
    e.preventDefault();
    const numberCheck = parseInt(capacityRef.current?.value as string);
    if (
      roomNameRef.current?.value === undefined ||
      usernameRef.current?.value === undefined
    )
      return;
    if (isNaN(numberCheck)) return;

    setRoom({
      name: roomNameRef.current?.value as string,
      creator: usernameRef.current?.value as string,
      capacity: numberCheck,
    });
  };

  const setRoom: (data: Room) => void = async (data) => {
    const result = await axios.post(CREATEROOM, data);
    if (result.status < 200 || result.status > 204) return;
    const { roomName, roomID, username } = result.data;
    dispatch(
      userActions.setUser({
        username: username,
        roomID: roomID,
        socketID: user.socketID,
      })
    );
    nav(`${URL}?room=${roomName}`, { replace: true });
  };

  return (
    <Grid className={classes.mainContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        <Grid>
          <Typography className={classes.cardHeader} variant="h5">
            Please fill out the form below!
          </Typography>
          <CardContent>
            <Settings
              classes={classes}
              TextField={TextField}
              Button={Button}
              onSubmit={submitHandler}
              username={usernameRef}
              roomName={roomNameRef}
              capacity={capacityRef}
            />
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CreateRoom;
