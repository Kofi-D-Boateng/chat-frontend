import { Button, Grid, TextField, Typography } from "@mui/material";
import { FC, FocusEvent, KeyboardEvent, useRef, useState } from "react";
import { MessageData, Messages } from "../../../types/types";
import classes from "../../../styles/ChatStyles.module.css";
import Message from "./messages/Message";
import { characterLimit } from "../../UI/Constatns";
import { regex, spaceRegEx } from "../../UI/RegExp";

const ChatBox: FC<{
  isMobile: boolean;
  MyID: string | null;
  msgs: Messages[];
  hideText: boolean;
  onSend: (data: MessageData) => void;
}> = ({ MyID, hideText, isMobile, msgs, onSend }) => {
  const [limit, setLimit] = useState<number>(characterLimit);
  const [showLabel, setShowLabel] = useState(false);
  const chatRef = useRef<HTMLInputElement>();
  const inputView: (event: FocusEvent<HTMLInputElement>) => void = (event) => {
    const { type } = event;
    if (type === "focus") {
      setShowLabel(true);
      return;
    }
    if (type === "blur") {
      setShowLabel(false);
    }
  };

  const limitHandler: (event: KeyboardEvent<HTMLDivElement>) => void = (
    event
  ) => {
    const { key } = event;
    const { code } = event;
    const char = regex.test(key);
    const spacebar = spaceRegEx.test(code);
    setShowLabel(true);
    if (key === "Backspace" && limit < characterLimit) {
      setLimit(limit + 1);
      return;
    }
    if (char || spacebar) {
      if (key !== "Backspace" && limit !== 0) {
        setLimit(limit - 1);
      }
      return;
    }
  };

  const sendHandler: () => void = () => {
    const text = chatRef.current?.value as string;
    if (limit <= 0 || limit === characterLimit || text.trim().length === 0) {
      return;
    }

    onSend({
      id: MyID as string,
      message: text,
    });
    setShowLabel(false);
    setLimit(characterLimit);
    chatRef.current!.value = "";
  };

  return (
    <>
      {isMobile || hideText ? null : (
        <Grid className={classes.chatBox} md={3} item>
          <Grid xs={12} md={12} className={classes.title} item>
            <Typography variant="h6">Chat</Typography>
          </Grid>
          <Grid className={classes.chat} xs={12} md={12} item>
            {msgs.map((map, index) => {
              return (
                <Message
                  key={index}
                  classes={classes}
                  sender={map.sender}
                  id={map.id}
                  myID={MyID as string}
                  time={map.timestamp}
                  message={map.message}
                  Grid={Grid}
                  Typography={Typography}
                />
              );
            })}
          </Grid>
          <Grid className={classes.chatBar} xs={12} md={12} item>
            <Grid container>
              <Grid md={9} item>
                <TextField
                  variant="filled"
                  label={showLabel && `${limit}/${characterLimit}`}
                  className={classes.textField}
                  onKeyDown={limitHandler}
                  onFocus={inputView}
                  onBlur={inputView}
                  inputRef={chatRef}
                  size="small"
                  margin="none"
                  placeholder="Type here"
                  minRows={1}
                  maxRows={5}
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid md={3} sx={{ margin: "auto 0" }} item>
                <Button
                  className={classes.btn}
                  type="button"
                  variant="contained"
                  size="small"
                  onClick={sendHandler}
                  fullWidth
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ChatBox;
