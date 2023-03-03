import { Button, Grid, TextField, Typography } from "@mui/material";
import { FC, useRef, useState } from "react";
import { Message, MessageData } from "../../../types/types";
import classes from "../../../styles/ChatStyles.module.css";
import Messages from "./messages/Messages";
import { characterLimit } from "../../UI/Constatns";
import {
  inputView,
  limitHandler,
  sendHandler,
} from "../functions/room-functions";

const ChatBox: FC<{
  isMobile: boolean;
  MyID: string | null;
  msgs: Message[];
  hideText: boolean;
  onSend: (data: MessageData) => void;
}> = ({ MyID, hideText, isMobile, msgs, onSend }) => {
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
            {msgs.map((map, index) => (
              <Messages
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
            ))}
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
                      MyID as string,
                      limit,
                      onSend,
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
