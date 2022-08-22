import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import {
  Dispatch,
  FC,
  ForwardedRef,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  MutableRefObject,
} from "react";
import { useSelector } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import { connect, Socket, io } from "socket.io-client";
import Peer from "simple-peer";
import { RootState } from "../store/store";
import { userActions } from "../store/user/user-slice";
import {
  addPeerData,
  createPeerData,
  MessageDatagram,
  Messages,
  Participant,
  User,
} from "../types/types";
import classes from "../styles/RoomStyles.module.css";
import { videoActions } from "../store/video/video-slice";
import {
  CHAT,
  LEAVE,
  GETUSERSINROOM,
  HOMEPAGE,
  JOINROOM,
  MESSAGES,
  RECEIVESIGNAL,
  ROOMSTATUS,
  SOCKETURI,
  USERID,
  USERJOINED,
  USERSLEFTINROOM,
  RETURNINGSIGNAL,
  SENDINGSIGNAL,
  SIGNAL,
} from "../component/UI/Constatns";

import Video from "../component/room/screen/Video";
import Options from "../component/room/options/Options";
import Chatbox from "../component/room/chatbox/ChatBox";
import {
  createPeer,
  addPeer,
  _LEAVE,
} from "../component/room/functions/room-functions";

const Room: FC<{
  isMobile: boolean;
  nav: NavigateFunction;
  dispatch: Dispatch<any>;
  param: URLSearchParams;
  myInfo: User;
}> = ({ isMobile, nav, dispatch }) => {
  const myInfo = useSelector((state: RootState) => state.user);
  const [hideText, setHideText] = useState(false);
  const [peers, setPeers] = useState<Participant[]>([]);
  const [messages, setMessages] = useState([]);
  const socket = useRef<Socket>();
  const userVideo: ForwardedRef<any> = useRef();
  const peersRef = useRef<{ peerID: string; instance: Peer.Instance }[]>([]);

  useEffect(() => {
    socket.current = connect("http://localhost:7000");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;

        socket.current?.emit("join-room", {
          roomID: myInfo.roomID,
          username: myInfo.username as string,
          id: socket.current?.id as string,
          position: myInfo.position,
        });
        socket.current?.on("room-status", (data) => {
          console.log(data);
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
            console.log(users);
            const peers: Participant[] = [];
            users.map((user) => {
              const peer = createPeer({
                userToSignal: user.id,
                myID: socket.current?.id as string,
                stream: stream,
                roomID: myInfo.roomID as string,
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

        socket.current?.on("chat", async (data) => {
          const { message, id } = data;
          const timestamp = new Date().toLocaleTimeString();
          // setMessages((prev) => [
          //   ...prev,
          //   { id: id, message: message, time: timestamp, sender: user },
          // ]);
        });

        socket.current?.on("users-left", async (data) => {
          const { leaver } = data;
          const REMAINERS = _LEAVE({
            leaver: leaver,
            peers: peers,
            peersRef: peersRef,
          });
          if (REMAINERS.peers.length === 0) {
            peersRef.current = [];
            setPeers([]);
          } else {
            let peers: Participant[] = [];
            REMAINERS.peers.forEach((p) => {
              peers.push(p);
              return true;
            });
            console.log(peers);
            setPeers(peers);
          }
        });
      });
  }, [myInfo, dispatch]);

  const videoHandler = () => {
    const src: MediaStream = userVideo.current.srcObject;
    const video = src.getTracks().find((track) => track.kind === "video");
    console.log(video);
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

  const chatHandler = async (data: any) => {
    const { msg } = data;
    if (msg !== null) {
      socket.current?.emit("message", { message: msg });
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

  const roomExit = (event: any) => {
    dispatch(userActions.clearUser());
    socket.current?.emit("disconnect", { room: myInfo.roomID });
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
                users={peers}
                onLeave={roomExit}
                isMobile={isMobile}
                count={messages.length}
              />
            </Grid>
          </Grid>
        </Grid>
        <Chatbox
          isMobile={isMobile}
          MyID={myInfo.socketID}
          msgs={messages}
          peers={peers}
          onSend={chatHandler}
          hideText={hideText}
        />
      </Grid>
    </>
  );
};

export default Room;
