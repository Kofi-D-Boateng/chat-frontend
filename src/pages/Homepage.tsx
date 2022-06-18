import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import UserLogin from "../component/homepage/UserLogin";
import classes from "../styles/HomeStyles.module.css";
import { User } from "../types/types";

const Homepage: FC<{ user: User }> = ({ user }) => {
  const [login, setLogin] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const submitHandler: (e: FormEvent<HTMLInputElement>) => void = ({
    preventDefault,
    currentTarget,
  }) => {
    preventDefault();
    const { value } = currentTarget;
  };
  return (
    <Grid className={classes.homeContainer} container>
      <UserLogin
        user={user}
        submit={submitHandler}
        classes={classes}
        Grid={Grid}
        Card={Card}
        CardContent={CardContent}
        Typography={Typography}
        Button={Button}
      />
    </Grid>
  );
};

export default Homepage;
