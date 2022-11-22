import { Grid, Paper, Typography } from "@mui/material";
import { FC, ForwardedRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connect, Socket } from "socket.io-client";
import Peer from "simple-peer";
import { RootState } from "../store/store";
import { userActions } from "../store/user/user-slice";
import {
  MessageData,
  MessageDatagram,
  Messages,
  Participant,
} from "../types/types";
import classes from "../styles/RoomStyles.module.css";
import { videoActions } from "../store/video/video-slice";
import { SOCKETURI } from "../component/UI/Constatns";

import Video from "../component/room/screen/Video";
import Options from "../component/room/options/Options";
import Chatbox from "../component/room/chatbox/ChatBox";
import {
  createPeer,
  addPeer,
  _LEAVE,
} from "../component/room/functions/room-functions";
import LinkCopyMessage from "../component/UI/Modal/LinkCopyMessage";

const Room: FC<{
  isMobile: boolean;
  param: URLSearchParams;
}> = ({ isMobile }) => {
  const myInfo = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [view, setView] = useState<boolean>(false);
  const [hideText, setHideText] = useState(false);
  const [peers, setPeers] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<Messages[]>([]);
  const socket = useRef<Socket>();
  const userVideo: ForwardedRef<any> = useRef();
  const peersRef = useRef<{ peerID: string; instance: Peer.Instance }[]>([]);
  const positionRef = useRef<number>(0);
  console.log(myInfo);

  useEffect(() => {
    socket.current = connect(SOCKETURI);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;

        socket.current?.emit("join-room", {
          roomId: myInfo.roomId,
          username: myInfo.username as string,
        });
        socket.current?.on("room-status", (data) => {
          if (data.msg.contains("full") || data.msg.contains("error")) {
            dispatch(userActions.clearUser());
            return;
          }
        });
        socket.current?.on(
          "all-users",
          (data: {
            users: { id: string; position: number; username: string }[];
            position: number;
          }) => {
            const { users, position } = data;
            if (!positionRef.current) positionRef.current = position;
            const peers: Participant[] = [];
            users.map((user) => {
              const peer = createPeer({
                userToSignal: user.id,
                myID: socket.current?.id as string,
                stream: stream,
                roomId: myInfo.roomId as string,
                socket: socket,
              });
              peersRef.current.push({ peerID: user.id, instance: peer });
              peers.push({
                alias: user.username as string,
                id: user.id as string,
                instance: peer,
              });
              return true;
            });
            setPeers(peers);
          }
        );

        socket.current?.on(
          "user-joined",
          (data: {
            signal: any;
            callerID: string;
            updatedUserList: {
              id: string;
              position: number;
              username: string;
            }[];
          }) => {
            const peer = addPeer({
              signal: data.signal,
              callerID: data.callerID,
              stream: stream,
              socket: socket,
            });
            peersRef.current.push({
              peerID: data.callerID,
              instance: peer,
            });
            const addedUser = data.updatedUserList.find((p) => {
              return p.id === data.callerID;
            });
            const user: Participant = {
              alias: addedUser?.username as string,
              id: addedUser?.id as string,
              instance: peer,
            };
            setPeers((prevState) => [...prevState, user]);
          }
        );

        socket.current?.on("receiving-signal", (data) => {
          var item = peersRef.current.find((p) => {
            return p.peerID === data.id;
          });
          item?.instance.signal(data.signal);
        });

        socket.current?.on(
          "chat",
          async (data: { message: string; id: string; sender: string }) => {
            console.log(data);
            const { message, id, sender } = data;
            const timestamp = new Date().toLocaleTimeString();
            const messageObject: Messages = {
              id: id,
              message,
              sender: sender,
              timestamp,
            };
            setMessages((prev) => [...prev, messageObject]);
          }
        );

        socket.current?.on(
          "users-left",
          async (data: {
            leaver: string;
            updatedList: {
              id: string;
              position: number;
              username: string;
            }[];
          }) => {
            const { leaver, updatedList } = data;
            const newPosition = updatedList.find((p) => {
              return p.id === socket.current?.id;
            })?.position;
            positionRef.current = newPosition!;
            const REMAINERS = _LEAVE({
              leaver: leaver,
              peersRef: peersRef,
            });
            if (REMAINERS.length === 0) {
              peersRef.current = [];
              setPeers([]);
            } else {
              setPeers((prev) => {
                const updatedPress = prev.filter((p) => {
                  return p.id !== leaver;
                });
                return updatedPress;
              });
            }
          }
        );
      });
  }, [myInfo, dispatch]);

  const videoHandler = () => {
    const src: MediaStream = userVideo.current.srcObject;
    const video = src.getTracks().find((track) => track.kind === "video");
    if (video?.enabled) {
      video.enabled = false;
      dispatch(videoActions.setVideo({ isPlaying: true }));
    } else {
      video!.enabled = true;
      dispatch(videoActions.setVideo({ isPlaying: true }));
    }
  };

  const micHandler = () => {
    const src: MediaStream = userVideo.current.srcObject;
    const mic = src.getTracks().find((track) => track.kind === "audio");
    if (mic?.enabled) {
      mic.enabled = false;
      dispatch(videoActions.setAudio({ canHear: false }));
    } else {
      mic!.enabled = true;
      dispatch(videoActions.setAudio({ canHear: true }));
    }
  };

  const linkHandler = () => {
    navigator.clipboard.writeText(myInfo.roomId as string).then(() => {
      setView(true);
      setTimeout(() => {
        setView(false);
      }, 3000);
    });
  };

  const chatHandler = async (data: MessageData) => {
    const { message, id } = data;
    const messageDatagram: MessageDatagram = {
      room: myInfo.roomId as string,
      user: {
        id: id,
        username: myInfo.username as string,
        position: positionRef.current as number,
        message: message,
      },
    };
    if (messageDatagram.user.message !== null) {
      socket.current?.emit("message", messageDatagram);
    }
  };

  const viewHandler = async () => {
    if (isMobile) {
      return;
    }
    if (hideText) {
      setHideText(false);
    } else {
      setHideText(true);
    }
  };

  const roomExit = () => {
    dispatch(userActions.clearUser());
    const src: MediaStream = userVideo.current.srcObject;
    src.getTracks().forEach((track) => track.stop());
    socket.current?.emit("leave", {
      room: myInfo.roomId,
      user: {
        position: positionRef.current,
        id: socket.current.id,
        username: myInfo.username,
      },
    });
    nav("/", { replace: true });
  };

  return (
    <>
      <Grid className={classes.backgroundContainer} container>
        <Grid
          className={classes.screen}
          xs={12}
          md={isMobile || hideText ? 12 : 9}
          item
        >
          {view && <LinkCopyMessage classes={classes} isMobile={isMobile} />}
          <Grid sx={{ margin: "auto 0" }} container>
            <Paper className={classes.paper} sx={{ backgroundColor: "black" }}>
              <Grid xs={12} md={12} item>
                <Typography variant="h5" className={classes.name} gutterBottom>
                  {myInfo.username}
                </Typography>
                <Grid className={classes.disabled} xs={12} md={12} item />
                <video
                  playsInline
                  muted
                  ref={userVideo}
                  autoPlay
                  className={classes.video}
                />
              </Grid>
            </Paper>
            {peers.map((peer, index) => {
              return <Video key={index} classes={classes} peer={peer} />;
            })}
          </Grid>
          <Grid container>
            <Grid className={classes.bar} xs={12} md={12} item>
              <Options
                onSetVideo={videoHandler}
                onSetAudio={micHandler}
                onHide={viewHandler}
                onLink={linkHandler}
                length={peers.length}
                onLeave={roomExit}
                isMobile={isMobile}
                count={messages.length}
              />
            </Grid>
          </Grid>
        </Grid>
        <Chatbox
          isMobile={isMobile}
          MyID={socket.current?.id as string}
          msgs={messages}
          onSend={chatHandler}
          hideText={hideText}
        />
      </Grid>
    </>
  );
};

export default Room;
