import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { AxiosStatic } from "axios";
import { Dispatch, FC, FormEvent, useEffect, useRef, useState } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { FETCHLOGIN, ROOM } from "../component/UI/Constatns";
import { userActions } from "../store/user/user-slice";
import { User } from "../types/types";
import LoginForm from "../component/forms/LoginForm";
import classes from "../styles/LoginStyles.module.css";

const Login: FC<{
  dispatch: Dispatch<any>;
  user: User;
  isMobile: boolean;
  params: URLSearchParams;
  axios: AxiosStatic;
}> = ({ axios, dispatch, isMobile, params, user }) => {
  const [userPassword, setUserPassword] = useState<string>("");
  const username = useRef<HTMLInputElement | undefined>();
  const password = useRef<HTMLInputElement | undefined>();
  const nav: NavigateFunction = useNavigate();
  const userSearchParam: string | null = params.get("username");

  useEffect(() => {
    if (userSearchParam) {
      const fetchUser: (
        axios: AxiosStatic,
        username: string,
        password: string
      ) => void = async (axios, username, password) => {
        await axios
          .post(FETCHLOGIN, { username: username, password: password })
          .then((response) => {
            dispatch(
              userActions.getAccess({
                token: response.data.token,
                isAdmin: false,
                roomID: "",
              })
            );
          })
          .catch(() => {
            nav("/", { replace: true });
          });
      };
      fetchUser(axios, userSearchParam, userPassword);
    }
    if ((user.roomID?.trim().length as number) > 0) {
      nav(ROOM.substring(0, 3) + user.roomID, { replace: true });
    }
  }, [user.roomID, nav, axios, userPassword, userSearchParam, dispatch]);

  const submitHandler: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    setUserPassword(password.current?.value as string);
    nav(`?username=${username.current?.value}`, { replace: true });
  };

  return (
    <Grid className={classes.loginContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        <div className={classes.cardHeader}>
          <p>Please login</p>
        </div>
        <CardContent>
          <LoginForm
            Link={NavLink}
            Submit={submitHandler}
            TextField={TextField}
            Button={Button}
            Grid={Grid}
            username={username}
            password={password}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;
