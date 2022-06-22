import {
  ExtendButtonBase,
  ButtonTypeMap,
  TextFieldProps,
  GridTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {
  FC,
  FormEvent,
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes,
} from "react";
import { NavLinkProps } from "react-router-dom";
import { SIGNUP } from "../UI/Constatns";

const LoginForm: FC<{
  Submit: (e: FormEvent<HTMLFormElement>) => void;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  TextField: (props: TextFieldProps) => JSX.Element;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  username: MutableRefObject<HTMLInputElement | undefined>;
  password: MutableRefObject<HTMLInputElement | undefined>;
  Link: ForwardRefExoticComponent<
    NavLinkProps & RefAttributes<HTMLAnchorElement>
  >;
}> = ({ Button, Submit, TextField, Grid, password, username, Link }) => {
  const SX: {
    GRID: { margin: string };
  } = {
    GRID: { margin: "15px 0" },
  };

  return (
    <form onSubmit={Submit}>
      <Grid container>
        <Grid sx={SX.GRID} container>
          <TextField
            sx={{ maxWidth: "60%", margin: "auto" }}
            size="small"
            type="text"
            placeholder="username"
            inputRef={username}
            fullWidth
          />
        </Grid>
        <Grid sx={SX.GRID} container>
          <TextField
            sx={{ maxWidth: "60%", margin: "auto" }}
            size="small"
            type="password"
            placeholder="password"
            inputRef={password}
            fullWidth
          />
        </Grid>
        <Grid sx={SX.GRID} container>
          <Button
            variant="outlined"
            sx={{
              maxWidth: "60%",
              margin: "auto",
              color: "green",
              backgroundColor: "white",
              borderColor: "green",
              transitionDuration: "500ms",
              "&:hover": {
                backgroundColor: "green",
                borderColor: "green",
                color: "white",
              },
            }}
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </Grid>
        <Grid sx={SX.GRID} container>
          <Link style={{ margin: "auto" }} to={SIGNUP}>
            Make an account
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
