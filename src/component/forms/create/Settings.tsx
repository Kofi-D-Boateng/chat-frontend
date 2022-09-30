import { ButtonTypeMap, ExtendButtonBase, TextFieldProps } from "@mui/material";
import { FC, FormEvent, MutableRefObject } from "react";

const Settings: FC<{
  TextField: (props: TextFieldProps) => JSX.Element;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  classes: {
    readonly [key: string]: string;
  };
  onSubmit: (e: FormEvent) => void;
  username: MutableRefObject<HTMLInputElement | undefined>;
  roomName: MutableRefObject<HTMLInputElement | undefined>;
  capacity: MutableRefObject<HTMLInputElement | undefined>;
}> = ({
  Button,
  TextField,
  classes,
  onSubmit,
  capacity,
  roomName,
  username,
}) => {
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <TextField
        className={classes.textField}
        placeholder="enter username"
        size="small"
        type="text"
        inputRef={username}
        required
        fullWidth
      />
      <TextField
        className={classes.textField}
        placeholder="enter room name"
        size="small"
        type="text"
        inputRef={roomName}
        required
        fullWidth
      />
      <TextField
        className={classes.textField}
        placeholder="enter capacity"
        size="small"
        type="number"
        inputRef={capacity}
        required
        fullWidth
      />
      <Button
        className={classes.btn}
        variant="outlined"
        type="submit"
        fullWidth
      >
        Submit
      </Button>
    </form>
  );
};

export default Settings;
