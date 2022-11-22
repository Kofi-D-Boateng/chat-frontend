import { FC, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { SEARCH } from "../component/UI/Constatns";
import classes from "../styles/HomeStyles.module.css";
import RegularFindRoom from "../component/homepage/RegularFindRoom";
import { useDispatch } from "react-redux";

const Homepage: FC<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  const nav: NavigateFunction = useNavigate();
  const [room, setRoom] = useState<{ id: string }>({ id: "" });
  const dispatch = useDispatch();
  useEffect(() => {
    if ((room.id.trim().length as number) > 0) {
      nav(`${SEARCH}?roomId=${room.id}`, { replace: false });
    }
  }, [room, nav, dispatch]);

  return (
    <Grid className={classes.homeContainer} container>
      <Card className={!isMobile ? classes.card : classes.mobCard}>
        <div className={classes.cardHeader}>
          <p>Welcome to Hangout!</p>
        </div>
        <CardContent>
          <RegularFindRoom
            isMobile={isMobile}
            classes={classes}
            Grid={Grid}
            Typography={Typography}
            TextField={TextField}
            Button={Button}
            nav={nav}
            setRoom={setRoom}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Homepage;
