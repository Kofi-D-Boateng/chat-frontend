import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FC, FormEvent, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Settings from "../component/forms/create/Settings";
import { CREATEROOM, ROOM } from "../component/UI/Constatns";
import { userActions } from "../store/user/user-slice";
import classes from "../../src/styles/CreateRoomStyles.module.css";
import { Room } from "../types/types";
import { useDispatch } from "react-redux";

const CreateRoom: FC<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  const URL: string = ROOM.substring(0, 9);
  const roomNameRef = useRef<HTMLInputElement | undefined>();
  const usernameRef = useRef<HTMLInputElement | undefined>();
  const capacityRef = useRef<HTMLInputElement | undefined>();
  const nav = useNavigate();
  const dispatch = useDispatch();

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
    const result = await axios.post(`${CREATEROOM}`, data);
    if (result.status < 200 || result.status > 204) return;
    const { roomID } = result.data;
    dispatch(
      userActions.setUser({
        username: usernameRef.current?.value as string,
        roomId: roomID,
      })
    );
    nav(`${URL}/${roomNameRef.current?.value}`, { replace: true });
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
