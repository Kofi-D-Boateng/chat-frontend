import { Grid, Typography } from "@mui/material";
import { AxiosStatic } from "axios";
import { Dispatch, FC, useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { FINDROOM, REDIRECT, ROOM } from "../../component/UI/Constatns";
import LoadingSpinner from "../../component/UI/LoadingSpinner";
import { userActions } from "../../store/user/user-slice";

const Search: FC<{
  axios: AxiosStatic;
  dispatch: Dispatch<any>;
  params: URLSearchParams;
  nav: NavigateFunction;
  isMobile: boolean;
}> = ({ axios, dispatch, params, nav }) => {
  const room: string | null = params.get("room");
  const [result, setResult] = useState<number>(0);
  useEffect(() => {
    const findRoomStatus: (
      axios: AxiosStatic,
      room: string,
      n: NavigateFunction
    ) => void = async (axios, room, nav) => {
      await axios
        .get(FINDROOM, { params: { key: room } })
        .then((response) => {
          setResult(200);
          dispatch(
            userActions.setUser({
              username: response.data.username,
              isAdmin: false,
              roomID: response.data.roomID,
              token: response.data.token,
              socketID: "",
            })
          );
          setTimeout(() => {
            nav(`${ROOM}/${room}`, { replace: true });
          }, 2000);
          clearTimeout();
        })
        .catch(() => {
          setResult(400);
          dispatch(userActions.setRoom({ roomID: "" }));
          setTimeout(() => {
            nav(REDIRECT, { replace: true });
          }, 2000);
          clearTimeout();
        });
    };
    findRoomStatus(axios, room as string, nav);
  }, [axios, dispatch, nav, room]);
  return (
    <Grid container>
      {result === 0 ? (
        <LoadingSpinner />
      ) : result === 200 ? (
        <Grid sx={{ margin: "auto" }} container>
          <Typography variant="h3">Joining room....</Typography>
        </Grid>
      ) : (
        <Grid sx={{ margin: "auto" }} container>
          <Typography variant="h3">Room was not found.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Search;
