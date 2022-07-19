import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosStatic } from "axios";
import { FC, FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";
import Settings from "../../component/forms/create/Settings";
import classes from "../../styles/CreateRoomStyles.module.css";
import { User } from "../../types/types";

const CreateRoom: FC<{
  params: URLSearchParams;
  axios: AxiosStatic;
  nav: NavigateFunction;
  isMobile: boolean;
  user: User;
}> = ({ params, axios, nav, isMobile, user }) => {
  const isLoggedin: boolean = params.get("loggedIn") as unknown as boolean;

  const submitHandler: (e: FormEvent) => void = (e) => {
    e.preventDefault();
  };

  return (
    <Grid className={classes.mainContainer} container>
      {!isLoggedin ? (
        <Card className={!isMobile ? classes.card : classes.mobCard}>
          <Grid>
            <Typography className={classes.cardHeader} variant="h5">
              Please fill out the form below!
            </Typography>
            <CardContent>
              <Settings
                classes={classes}
                user={user}
                TextField={TextField}
                Button={Button}
                Submit={submitHandler}
              />
            </CardContent>
          </Grid>
        </Card>
      ) : (
        <Card className={!isMobile ? classes.card : classes.mobCard}>
          <Grid>
            <Typography className={classes.cardHeader} variant="h5">
              Please fill out the form below!
            </Typography>
            <CardContent>
              <Settings
                classes={classes}
                user={user}
                TextField={TextField}
                Button={Button}
                Submit={submitHandler}
              />
            </CardContent>
          </Grid>
        </Card>
      )}
    </Grid>
  );
};

export default CreateRoom;
