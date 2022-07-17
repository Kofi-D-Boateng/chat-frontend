import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { AxiosStatic } from "axios";
import { Dispatch, FC, FormEvent, useEffect, useRef, useState } from "react";
import { NavigateFunction, NavLink } from "react-router-dom";
import { FETCHLOGIN, HOMEPAGE, LOGGEDIN } from "../component/UI/Constatns";
import { userActions } from "../store/user/user-slice";
import LoginForm from "../component/forms/LoginForm";
import classes from "../styles/LoginStyles.module.css";

const Login: FC<{
  dispatch: Dispatch<any>;
  isMobile: boolean;
  params: URLSearchParams;
  axios: AxiosStatic;
  nav: NavigateFunction;
}> = ({ axios, dispatch, isMobile, params, nav }) => {
  const [userPassword, setUserPassword] = useState<string>("");
  const username = useRef<HTMLInputElement | undefined>();
  const password = useRef<HTMLInputElement | undefined>();
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
            dispatch(userActions.login({ username: response.data.username }));
            nav(LOGGEDIN, { replace: true });
          })
          .catch(() => {
            nav(HOMEPAGE, { replace: true });
          });
      };
      fetchUser(axios, userSearchParam, userPassword);
    }
  }, [nav, axios, userPassword, userSearchParam, dispatch]);

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
