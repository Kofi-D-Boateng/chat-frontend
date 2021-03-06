import {
  ButtonTypeMap,
  ExtendButtonBase,
  GridTypeMap,
  TextFieldProps,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dispatch, FC, FormEvent, SetStateAction, useRef } from "react";
import { NavigateFunction } from "react-router-dom";
import RegularSearch from "./Regular/RegularSearch";

const RegularFindRoom: FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  TextField: (props: TextFieldProps) => JSX.Element;
  nav: NavigateFunction;
  createRoom: () => void;
  setRoom: Dispatch<
    SetStateAction<{
      id: string;
    }>
  >;
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
}> = ({
  Grid,
  Button,
  Typography,
  TextField,
  classes,
  isMobile,
  nav,
  createRoom,
  setRoom,
}) => {
  const roomID = useRef<HTMLInputElement | undefined>();

  const submitHandler: (e: FormEvent) => void = (e) => {
    e.preventDefault();
    setRoom({ id: roomID.current?.value as string });
  };

  return (
    <Grid container>
      <Grid container>
        <Typography sx={{ margin: "auto" }} variant="h5">
          Find a room to join!
        </Typography>
      </Grid>
      <Grid container>
        <Typography sx={{ margin: "10px auto" }} variant="h5">
          Enter room id or room name to join!
        </Typography>
      </Grid>
      <Grid className={classes.search} container>
        <RegularSearch
          isMobile={isMobile}
          Grid={Grid}
          Button={Button}
          TextField={TextField}
          Submit={submitHandler}
          ID={roomID}
        />
        <Grid className={classes.options} xs={12} md={6} item>
          <Grid container>
            <Button
              variant="outlined"
              sx={{
                margin: "10px auto",
                maxWidth: "70%",
                color: "green",
                backgroundColor: "white",
                borderColor: "green",
                transitionDuration: "350ms",
                textTransform: "none",
                "&:hover": {
                  color: "white",
                  backgroundColor: "green",
                  borderColor: "green",
                },
              }}
              size="small"
              onClick={() => nav("/login", { replace: true })}
              fullWidth
            >
              Login
            </Button>
          </Grid>
          <Grid container>
            <Button
              variant="outlined"
              sx={{
                margin: "10px auto",
                color: "green",
                maxWidth: "70%",
                backgroundColor: "white",
                borderColor: "green",
                textTransform: "none",
                transitionDuration: "350ms",
                "&:hover": {
                  color: "white",
                  backgroundColor: "green",
                  borderColor: "green",
                },
              }}
              size="small"
              onClick={createRoom}
              fullWidth
            >
              Create Room
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegularFindRoom;
