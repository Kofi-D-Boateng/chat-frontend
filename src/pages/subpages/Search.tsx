import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { AxiosStatic } from "axios";
import { Dispatch, FC, FormEvent, useEffect, useRef, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import UserJoinForm from "../../component/forms/userJoin/UserJoinForm";
import { FINDROOM, REDIRECT, ROOM } from "../../component/UI/Constatns";
import LoadingSpinner from "../../component/UI/LoadingSpinner";
import { userActions } from "../../store/user/user-slice";
import { User } from "../../types/types";
import classes from "../../styles/SearchStyles.module.css";
import { roomActions } from "../../store/room/room-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Search: FC<{
  axios: AxiosStatic;
  dispatch: Dispatch<any>;
  params: URLSearchParams;
  nav: NavigateFunction;
  isMobile: boolean;
  user: User;
}> = ({ axios, dispatch, params, nav, user, isMobile }) => {
  const roomName: string = useSelector((state: RootState) => state.room.name);
  const roomID: string | null = params.get("roomID");
  const [result, setResult] = useState<number>(0);
  const usernameRef = useRef<HTMLInputElement | undefined>();
  const URL: string = ROOM.substring(0, 9);
  useEffect(() => {
    const findRoomStatus: (
      axios: AxiosStatic,
      room: string,
      n: NavigateFunction
    ) => void = async (axios, room, nav) => {
      await axios
        .get(FINDROOM, { params: { key: room } })
        .then((response) => {
          dispatch(roomActions.getRoomName({ name: response.data.roomName }));
          setResult(200);
        })
        .catch(() => {
          setResult(400);
          dispatch(userActions.setRoom({ roomID: "" }));
          setTimeout(() => {
            nav(REDIRECT, { replace: true });
          }, 2000);
        });
    };
    findRoomStatus(axios, roomID as string, nav);
  }, [axios, dispatch, nav, roomID]);
  const submitHandler: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    dispatch(
      userActions.setUser({
        isAdmin: false,
        roomID: roomID,
        socketID: user.socketID,
        username: usernameRef.current?.value as string,
        token: user.token as string,
      })
    );
    nav(`${URL}?room=${roomName}`, { replace: true });
  };
  return (
    <Grid container>
      {result === 0 ? (
        <LoadingSpinner />
      ) : result === 200 ? (
        <UserJoinForm
          isMobile={isMobile}
          classes={classes}
          username={usernameRef}
          Card={Card}
          TextField={TextField}
          Button={Button}
          submit={submitHandler}
        />
      ) : (
        <Grid className={classes.error} container>
          <Typography sx={{ margin: "center" }} variant="h5">
            Room was not found!
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Search;
