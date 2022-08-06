import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import {
  Dispatch,
  FC,
  ForwardedRef,
  useEffect,
  useRef,
  useState,
  lazy,
  MouseEvent,
} from "react";
import { useSelector } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import { connect, Socket } from "socket.io-client";
import Peer from "simple-peer";
import { RootState } from "../store/store";
import { userActions } from "../store/user/user-slice";
import { MessageDatagram, Messages, Participants, Peers } from "../types/types";
import classes from "../styles/RoomStyles.module.css";
import { videoActions } from "../store/video/video-slice";
import {
  CHAT,
  DISCONNECT,
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
} from "../component/UI/Constatns";
import {
  addPeer,
  createPeer,
  _LEAVE,
} from "../component/room/functions/room-functions";
const Video = lazy(() => import("../component/room/screen/Video"));
const Options = lazy(() => import("../component/room/options/Options"));
const Chatbox = lazy(() => import("../component/room/chatbox/ChatBox"));

const Room: FC<{
  isMobile: boolean;
  nav: NavigateFunction;
  dispatch: Dispatch<any>;
  param: URLSearchParams;
}> = ({ isMobile, nav, dispatch }) => {
  const myInfo = useSelector((state: RootState) => state.user);
  const [hideText, setHideText] = useState(false);
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [users, setUsers] = useState<Participants[]>([]);
  const socket = useRef<Socket<any, any>>();
  const userVideo: ForwardedRef<any> = useRef<HTMLVideoElement | MediaStream>();
  const peersRef = useRef<Peers[]>([]);

  useEffect(() => {
    socket.current = connect(SOCKETURI);
    socket.current?.on(USERID, (ID: string) => {
      dispatch(
        userActions.setUser({
          isAdmin: myInfo.isAdmin,
          roomID: myInfo.roomID as string,
          socketID: ID,
          token: myInfo.token as string,
          username: myInfo.username as string,
        })
      );
      setUsers((prevState) => [
        ...prevState,
        {
          alias: myInfo.username as string,
          roomID: myInfo.roomID as string,
        },
      ]);
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        userVideo.current.srcObject = stream;
        socket.current?.emit(JOINROOM, {
          roomID: myInfo.roomID,
          username: myInfo.username,
          id: myInfo.socketID,
        });
        socket.current?.on(ROOMSTATUS, (data: { msg: string }) => {
          if (data.msg.includes("full")) {
            nav(HOMEPAGE, { replace: true });
            return;
          }
        });
        socket.current?.on(
          GETUSERSINROOM,
          (data: {
            users: { id: string; position: number; username: string }[];
          }) => {
            // CREATE CLASS BASED OFF OF HOW WE STORE DATA IN THE BACKEND;
            const Self = data.users.filter((User) => {
              return User.id === myInfo.socketID;
            });
            dispatch(userActions.setPosition({ position: Self[0].position }));
            const usersInRoom = data.users.filter((User) => {
              return User.id != myInfo.socketID;
            });
            const peers: Peer.Instance[] = [];
            usersInRoom.forEach((user) => {
              const peer = createPeer(
                {
                  user: user.id,
                  myID: myInfo.socketID,
                  stream: stream,
                },
                socket
              );
              peersRef.current.push({ peerID: user.id, instance: peer });
              peers.push(peer);
              return true;
            });
            setPeers(peers);
          }
        );
        socket.current?.on(
          USERJOINED,
          (data: { signal: string | Peer.SignalData; ID: string }) => {
            const peer = addPeer(
              {
                signal: data.signal,
                ID: data.ID,
                stream: stream,
              },
              socket
            );
            peersRef.current.push({
              peerID: data.ID,
              instance: peer,
            });
            setPeers((prevState) => [...prevState, peer]);
          }
        );
        socket.current?.on(
          RECEIVESIGNAL,
          (data: { id: string; signal: string | Peer.SignalData }) => {
            const item = peersRef.current.filter((p) => {
              return p.peerID === data.id;
            });
            const peer = item[0];
            peer.instance.signal(data.signal);
          }
        );
      });
    socket.current.on(CHAT, async (data: { message: string; id: string }) => {
      const { message, id } = data;
      const timestamp = new Date().toLocaleTimeString();
      setMessages((prev) => [
        ...prev,
        {
          id: id,
          message: message,
          timestamp: timestamp,
          sender: myInfo.username as string,
        },
      ]);
    });
    socket.current.on(USERSLEFTINROOM, async (data: { leaver: string }) => {
      const { leaver } = data;
      const REMAINERS = _LEAVE(leaver, peersRef);
      if (REMAINERS.length === 0) {
        peersRef.current = [];
        setPeers([]);
      } else {
        const peers: Peer.Instance[] = [];
        REMAINERS.forEach((p) => {
          peers.push(p.instance);
        });
        console.log(peers);
        peersRef.current = REMAINERS;
        setPeers(peers);
      }
    });
  });

  const chatHandler: (data: MessageDatagram) => void = async (
    data: MessageDatagram
  ) => {
    data.room = myInfo.roomID as string;
    data.user.id = myInfo.socketID as string;
    if (data.user.msg !== null) {
      socket.current?.emit(MESSAGES, data);
    }
  };

  const viewHandler: () => void = async () => {
    if (isMobile) {
      return;
    }
    if (hideText) {
      setHideText(false);
    } else {
      setHideText(true);
    }
  };

  const roomExit: (e: MouseEvent<HTMLButtonElement>) => void = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    const { value } = e.currentTarget;
    if (value.trim() === "Leave") {
      //   dispatch(authActions.logout());
      socket.current?.emit(DISCONNECT, { room: myInfo.socketID });
      nav(HOMEPAGE, { replace: true });
    }
  };

  const videoHandler: () => void = () => {
    const src: MediaStream = userVideo.current.srcObject;
    const video = src
      .getTracks()
      .find((track: MediaStreamTrack) => track.kind === "video");
    console.log(video);
    if (video?.enabled) {
      video.enabled = false;
      dispatch(videoActions.setVideo({ isPlaying: video.enabled }));
    } else {
      video!.enabled = true;
      dispatch(videoActions.setVideo({ isPlaying: video!.enabled }));
    }
  };

  const micHandler: () => void = () => {
    const src: MediaStream = userVideo.current.srcObject;
    const video = src
      .getTracks()
      .find((track: MediaStreamTrack) => track.kind === "audio");
    console.log(video);
    if (video?.enabled) {
      video.enabled = false;
      dispatch(videoActions.setVideo({ isPlaying: video.enabled }));
    } else {
      video!.enabled = true;
      dispatch(videoActions.setVideo({ isPlaying: video!.enabled }));
    }
  };

  return (
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
            return (
              <Video
                classes={classes}
                key={index}
                users={users}
                myUsername={myInfo.username as string}
                peer={peer}
                Paper={Paper}
                Grid={Grid}
                Typography={Typography}
              />
            );
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
        Me={myInfo.username}
        msgs={messages}
        peers={peersRef}
        onSend={chatHandler}
        hideText={hideText}
        TextField={TextField}
        Grid={Grid}
        Typography={Typography}
        Button={Button}
      />
    </Grid>
  );
};

export default Room;
