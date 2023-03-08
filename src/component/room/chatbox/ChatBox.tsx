import { Button, Grid, TextField, Typography } from "@mui/material";
import { FC, useRef, useState } from "react";
import { Message, Room, User } from "../../../types/types";
import classes from "../../../styles/ChatStyles.module.css";
import Messages from "./messages/Messages";
import { characterLimit } from "../../UI/Constatns";
import {
  inputView,
  limitHandler,
  sendHandler,
} from "../functions/room-functions";
import { Socket } from "socket.io-client";

const ChatBox: FC<{
  isMobile: boolean;
  socket: Socket | undefined;
  msgs: Message[];
  hideText: boolean;
  states: {
    user: User;
    room: Room;
  };
}> = ({ socket, hideText, isMobile, msgs, states }) => {
  const [limit, setLimit] = useState<number>(characterLimit);
  const [showLabel, setShowLabel] = useState(false);
  const chatRef = useRef<HTMLInputElement>();
  return (
    <>
      {isMobile || hideText ? null : (
        <Grid className={classes.chatBox} md={3} item>
          <Grid xs={12} md={12} className={classes.title} item>
            <Typography variant="body1">STREAM CHAT</Typography>
          </Grid>
          <Grid className={classes.chat} xs={12} md={12} item>
            {msgs.map((message, index) => {
              console.log(message);
              return (
                <Messages
                  key={index}
                  classes={classes}
                  sender={message.sender}
                  id={message.id}
                  myID={socket?.id as string}
                  time={message.createdAt}
                  text={message.text}
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
                  onKeyDown={(e) => limitHandler(e, setShowLabel, setLimit)}
                  onFocus={(e) => inputView(e, setShowLabel)}
                  onBlur={(e) => inputView(e, setShowLabel)}
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
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    sendHandler(
                      chatRef,
                      socket,
                      states,
                      limit,
                      setShowLabel,
                      setLimit
                    )
                  }
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
