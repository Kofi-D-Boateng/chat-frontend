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

const Search: FC<{
  isMobile: boolean;
  user: User;
}> = ({ isMobile }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const roomName: string = useSelector((state: RootState) => state.room.name);
  const params = useSearchParams()[0];
  const roomIdParam: string | null = params.get("roomId");
  const resultParam: string | null = params.get("valid");
  const usernameRef = useRef<HTMLInputElement>();
  const URL: string = ROOM.substring(0, 9);
  useEffect(() => {
    const findRoomStatus: (
      axios: AxiosStatic,
      room: string,
      nav: NavigateFunction
    ) => void = async (axios, room, nav) => {
      await axios
        .get(`${FINDROOM}`, { params: { key: room } })
        .then(() => {
          nav("?valid=true", { replace: true });
        })
        .catch(() => {
          nav("?valid=false", { replace: true });
          setTimeout(() => {
            nav(REDIRECT, { replace: true });
          }, 2000);
        });
    };
    findRoomStatus(axios, roomIdParam as string, nav);
  }, [dispatch, nav, roomIdParam]);
  const submitHandler: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    dispatch(
      userActions.setUser({
        roomId: roomIdParam,
        username: usernameRef.current?.value as string,
      })
    );
    nav(`${URL}/${roomName}`, { replace: true });
  };
  return (
    <Grid className={classes.mainContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        <div className={classes.cardHeader}>
          {roomIdParam && (
            <Typography variant="h6">Please enter a username</Typography>
          )}
          {resultParam && (
            <Typography variant="h6">Welcome to Hangout!</Typography>
          )}
        </div>
        <CardContent>
          {roomIdParam && (
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
          {resultParam && resultParam === "true" && (
            <UserJoinForm
              isMobile={isMobile}
              classes={classes}
              username={usernameRef}
              TextField={TextField}
              Button={Button}
              submit={submitHandler}
            />
          )}
          {resultParam && resultParam === "false" && (
            <Grid className={classes.error} container>
              <Typography sx={{ margin: "auto" }} variant="h5">
                Room was not found!
              </Typography>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Search;
