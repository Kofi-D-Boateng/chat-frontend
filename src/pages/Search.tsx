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
import { FC, FormEvent, useEffect, useRef, useState } from "react";
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
  const roomID: string | null = useSearchParams()[0].get("roomId");
  const [result, setResult] = useState<number>(0);
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
          setResult(200);
        })
        .catch(() => {
          setResult(400);
          setTimeout(() => {
            nav(REDIRECT, { replace: true });
          }, 2000);
        });
    };
    findRoomStatus(axios, roomID as string, nav);
  }, [dispatch, nav, roomID]);
  const submitHandler: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    dispatch(
      userActions.setUser({
        roomId: roomID,
        username: usernameRef.current?.value as string,
      })
    );
    nav(`${URL}/${roomName}`, { replace: true });
  };
  return (
    <Grid className={classes.mainContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        <div className={classes.cardHeader}>
          <p>Welcome to Hangout!</p>
        </div>
        <CardContent>
          {result === 0 ? (
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
          ) : (
            <>
              {result === 200 ? (
                <UserJoinForm
                  isMobile={isMobile}
                  classes={classes}
                  username={usernameRef}
                  TextField={TextField}
                  Button={Button}
                  submit={submitHandler}
                />
              ) : (
                <Grid className={classes.error} container>
                  <Typography sx={{ margin: "auto" }} variant="h5">
                    Room was not found!
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Search;
