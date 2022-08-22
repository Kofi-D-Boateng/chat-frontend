import { Button, Grid, TextField, Typography } from "@mui/material";
import { FC, FocusEvent, KeyboardEvent, useRef, useState } from "react";
import { MessageDatagram, Messages, Participant } from "../../../types/types";
import classes from "../../../styles/ChatStyles.module.css";
import Message from "./messages/Message";

const ChatBox: FC<{
  isMobile: boolean;
  MyID: string | null;
  msgs: Messages[];
  peers: Participant[];
  hideText: boolean;
  onSend: (data: MessageDatagram) => void;
}> = ({ MyID, hideText, isMobile, msgs, peers, onSend }) => {
  const [limit, setLimit] = useState(250);
  const [showLabel, setShowLabel] = useState(false);
  const chatRef = useRef<HTMLInputElement>();
  // console.log(msgs);
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
    // console.log(event.key);
    const regex = /[A-Za-z0-9]/;
    const spaceRegEx = /Space/;
    const { key } = event;
    const { code } = event;
    const regTest = regex.test(key);
    const spaceTest = spaceRegEx.test(code);
    setShowLabel(true);
    if (key === "Backspace" && limit !== 250) {
      setLimit(limit + 1);
      // console.log(limit);
      return;
    }
    if (regTest || spaceTest) {
      if (limit <= 250) {
        setLimit(limit - 1);
        // console.log(limit);
      }
      return;
    }
  };

  const sendHandler: () => void = () => {
    const text = chatRef.current?.value as string;
    console.log(text);
    if (limit <= 0 || text.trim().length === 0) {
      return;
    }

    onSend({
      room: "",
      user: { position: 0, username: MyID as string, msg: text },
    });
    setShowLabel(false);
    setLimit(250);
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
                  variant="standard"
                  label={showLabel && `${limit}/250`}
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
