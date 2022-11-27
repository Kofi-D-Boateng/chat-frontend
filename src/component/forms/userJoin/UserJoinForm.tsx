import { ButtonTypeMap, ExtendButtonBase, TextFieldProps } from "@mui/material";
import { FC, FormEvent, MutableRefObject } from "react";

const UserJoinForm: FC<{
  username: MutableRefObject<HTMLInputElement | undefined>;
  classes: {
    readonly [key: string]: string;
  };
  TextField: (props: TextFieldProps) => JSX.Element;
  submit: (e: FormEvent<HTMLFormElement>) => void;
  isMobile: boolean;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
}> = ({ username, TextField, submit, Button, classes, isMobile }) => {
  return (
    <form onSubmit={submit}>
      <TextField
        className={classes.input}
        inputRef={username}
        variant="outlined"
        size="small"
        placeholder="enter username"
        fullWidth
      />
      <Button
        className={classes.btn}
        variant="outlined"
        type="submit"
        fullWidth
      >
        Join
      </Button>
    </form>
  );
};

export default UserJoinForm;
