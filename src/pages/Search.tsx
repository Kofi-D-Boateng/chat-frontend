import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosStatic } from "axios";
import { FC, FormEvent, useEffect, useRef } from "react";
import {
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import UserJoinForm from "../component/forms/userJoin/UserJoinForm";
import { FINDROOM, REDIRECT, ROOM } from "../component/UI/Constatns";
import { userActions } from "../store/user/user-slice";
import { User } from "../types/types";
import classes from "../../src/styles/SearchStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { roomActions } from "../store/room/room-slice";

const Search: FC<{
  isMobile: boolean;
  user: User;
}> = ({ isMobile }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const roomName: string = useSelector((state: RootState) => state.room.name);
  const params = useSearchParams()[0];
  const roomIdParam: string | null = params.get("roomId");
  const resultParam: string | null = params.get("result");
  const usernameRef = useRef<HTMLInputElement>();
  const URL: string = ROOM.substring(0, 8);
  useEffect(() => {
    if (!roomIdParam) {
      return;
    } else {
      const findRoomStatus: (
        axios: AxiosStatic,
        room: string,
        nav: NavigateFunction
      ) => void = async (axios, room, nav) => {
        await axios
          .get(`${FINDROOM}`, { params: { key: room } })
          .then((response) => {
            dispatch(roomActions.setRoomName(response.data.roomName));
            nav(`?roomId=${roomIdParam}&result=${response.data.message}`, {
              replace: true,
            });
          })
          .catch(() => {
            nav(`?roomId=${roomIdParam}&result=error`, {
              replace: true,
            });
            setTimeout(() => {
              nav(REDIRECT, { replace: true });
            }, 3000);
          });
      };
      findRoomStatus(axios, roomIdParam as string, nav);
    }
  }, [dispatch, nav, roomIdParam]);
  const submitHandler: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    dispatch(
      userActions.setUser({
        username: usernameRef.current?.value as string,
      })
    );
    dispatch(roomActions.setRoomId(roomIdParam as string));
    nav(`${URL}/${roomName}`, { replace: true });
  };
  return (
    <Grid className={classes.mainContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        <div className={classes.cardHeader}>
          {resultParam && resultParam === "found" && (
            <Typography variant="h6">Please enter a username</Typography>
          )}
          {!resultParam ||
            (resultParam === "error" && (
              <Typography variant="h6">Welcome to Hangout!</Typography>
            ))}
        </div>
        <CardContent>
          {roomIdParam && !resultParam && (
            <Box>
              <CircularProgress
                sx={{
                  margin: "100px auto",
                  position: "relative",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "50%",
                }}
              />
            </Box>
          )}
          {resultParam && resultParam === "found" && (
            <UserJoinForm
              isMobile={isMobile}
              classes={classes}
              username={usernameRef}
              TextField={TextField}
              Button={Button}
              submit={submitHandler}
            />
          )}
          {resultParam && resultParam === "error" && (
            <Grid className={classes.error} container>
              <Typography sx={{ margin: "auto" }} variant="h5">
                Room either does not exist or is full.
              </Typography>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Search;
