import { ButtonTypeMap, ExtendButtonBase, TextFieldProps } from "@mui/material";
import { FC, FormEvent } from "react";
import { User } from "../../../types/types";

const Settings: FC<{
  user: User;
  TextField: (props: TextFieldProps) => JSX.Element;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  classes: {
    readonly [key: string]: string;
  };
  Submit: (e: FormEvent<HTMLFormElement>) => void;
}> = ({ Button, TextField, user, classes, Submit }) => {
  return (
    <form className={classes.form} onSubmit={Submit}>
      {!user.isLoggedIn && (
        <TextField
          className={classes.textField}
          placeholder="enter username"
          size="small"
          type="text"
          fullWidth
        />
      )}
      <TextField
        className={classes.textField}
        placeholder="enter room name"
        size="small"
        type="text"
        fullWidth
      />
      <TextField
        className={classes.textField}
        placeholder="enter capacity"
        size="small"
        type="number"
        fullWidth
      />
      <Button className={classes.btn} variant="outlined" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default Settings;
