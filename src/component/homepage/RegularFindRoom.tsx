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
import { SETUPROOM } from "../UI/Constatns";

const RegularFindRoom: FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  TextField: (props: TextFieldProps) => JSX.Element;
  nav: NavigateFunction;
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
  setRoom,
}) => {
  const roomID = useRef<HTMLInputElement | undefined>();

  const submitHandler: (e: FormEvent) => void = (e) => {
    e.preventDefault();
    setRoom({ id: roomID.current?.value as string });
  };

  return (
    <>
      <Grid container>
        <Typography
          sx={{ margin: "10px auto", textAlign: "center" }}
          variant="h5"
        >
          Enter a room ID to join or create your own!
        </Typography>
      </Grid>
      <form onSubmit={submitHandler}>
        <Grid className={classes.search} container>
          <Grid container>
            <TextField
              sx={{ margin: "20px auto", maxWidth: "70%" }}
              size="small"
              placeholder="Enter Room ID"
              type="text"
              inputRef={roomID}
              fullWidth
            />
          </Grid>
          <Grid sx={{ margin: "20px auto", textAlign: "center" }} container>
            <Grid sx={{ margin: "auto" }} xs={12} md={6} item>
              <Button
                variant="outlined"
                sx={{
                  margin: isMobile ? "10px 0" : "",
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
                type="submit"
                size="small"
                fullWidth
              >
                Join Room
              </Button>
            </Grid>
            <Grid xs={12} md={6} item>
              <Button
                variant="outlined"
                sx={{
                  margin: isMobile ? "10px 0" : "",
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
                onClick={() =>
                  nav(`${SETUPROOM.substring(0, 13)}`, {
                    replace: true,
                  })
                }
                fullWidth
              >
                Create Room
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default RegularFindRoom;
