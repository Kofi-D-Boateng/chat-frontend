import { ButtonTypeMap, ExtendButtonBase, TextFieldProps } from "@mui/material";
import { Dispatch, FC, FormEvent, useRef } from "react";
import { CreatedRoom, User } from "../../../types/types";

const Settings: FC<{
  isLoggedIn: boolean;
  user: User;
  TextField: (props: TextFieldProps) => JSX.Element;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  classes: {
    readonly [key: string]: string;
  };
  setRoom: Dispatch<React.SetStateAction<CreatedRoom>>;
}> = ({ Button, TextField, user, classes, setRoom, isLoggedIn }) => {
  const roomNameRef = useRef<HTMLInputElement | undefined>();
  const usernameRef = useRef<HTMLInputElement | undefined>();
  const capacityRef = useRef<HTMLInputElement | undefined>();
  const submitHandler: (e: FormEvent) => void = (e) => {
    e.preventDefault();
    console.log(roomNameRef.current?.value);
    console.log(usernameRef.current?.value);
    console.log(capacityRef.current?.value);
    const numberCheck = parseInt(capacityRef.current?.value as string);
    if (!roomNameRef.current?.value || !usernameRef.current?.value) return;
    setRoom({
      name: roomNameRef.current?.value as string,
      creator: usernameRef.current?.value as string,
      capacity: numberCheck,
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {!isLoggedIn || !user.isLoggedIn ? (
        <TextField
          className={classes.textField}
          placeholder="enter username"
          size="small"
          type="text"
          inputRef={usernameRef}
          fullWidth
        />
      ) : null}
      <TextField
        className={classes.textField}
        placeholder="enter room name"
        size="small"
        type="text"
        inputRef={roomNameRef}
        fullWidth
      />
      <TextField
        className={classes.textField}
        placeholder="enter capacity"
        size="small"
        type="number"
        inputRef={capacityRef}
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