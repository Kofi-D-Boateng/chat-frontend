import {
  GridTypeMap,
  ExtendButtonBase,
  ButtonTypeMap,
  TextFieldProps,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, FormEvent, MutableRefObject } from "react";

const RegularSearch: FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  TextField: (props: TextFieldProps) => JSX.Element;
  Submit: (e: FormEvent) => void;
  ID: MutableRefObject<HTMLInputElement | undefined>;
  isMobile: boolean;
}> = ({ Button, Grid, TextField, isMobile, ID, Submit }) => {
  return (
    <Grid xs={12} md={6} item>
      <form onSubmit={Submit}>
        <Grid container>
          <TextField
            sx={{ width: !isMobile ? "60%" : "70%", margin: "auto" }}
            size="small"
            placeholder="Enter Room ID"
            type="text"
            inputRef={ID}
            fullWidth
          />
        </Grid>
        <Grid sx={{ margin: "20px auto", textAlign: "center" }} container>
          <Grid container>
            <Button
              variant="outlined"
              sx={{
                margin: "auto",
                color: "green",
                maxWidth: !isMobile ? "60%" : "70%",
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
        </Grid>
      </form>
    </Grid>
  );
};

export default RegularSearch;
