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
import { Messages, Participants, Peers } from "../types/types";
import classes from "../styles/RoomStyles.module.css";
import Options from "../component/room/options/Options";
import { videoActions } from "../store/video/video-slice";
import { SOCKETURI } from "../component/UI/Constatns";
import ChatBox from "../component/room/chatbox/ChatBox";
const Video = lazy(() => import("../component/room/screen/Video"));

const Room: FC<{
  isMobile: boolean;
  nav: NavigateFunction;
  dispatch: Dispatch<any>;
}> = ({ isMobile, nav, dispatch }) => {
  const user = useSelector((state: RootState) => state.user);
  const [hideText, setHideText] = useState(false);
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [users, setUsers] = useState<Participants[]>([]);
  const socket = useRef<Socket<any, any>>();
  const userVideo: ForwardedRef<any> = useRef<HTMLVideoElement | MediaStream>();
  const peersRef = useRef<Peers[]>([]);

  useEffect(() => {
    socket.current = connect(SOCKETURI);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        userVideo.current.srcObject = stream;
        socket.current?.emit("join-room", {
          room: user.roomID,
          username: user.username,
        });
        socket.current?.on("room-status", (data: { msg: string }) => {
          if (data.msg.includes("full")) {
            nav("", { replace: true });
            return;
          }
        });
        socket.current?.on("myID", (data: { ID: string }) => {
          dispatch(
            userActions.setUser({
              isAdmin: user.isAdmin,
              roomID: user.roomID as string,
              socketID: data.ID,
              token: user.token as string,
              username: user.username as string,
            })
          );
          setUsers((prevState) => [
            ...prevState,
            { alias: user.username as string, roomID: user.roomID as string },
          ]);
        });
        socket.current?.on("all-users", (data: { users: {}[] }) => {
          // CREATE CLASS BASED OFF OF HOW WE STORE DATA IN THE BACKEND;
          const { users } = data;
          const peers: Peer.Instance[] = [];
          users.forEach((userID) => {
            const peer = createPeer({
              user: "",
              myID: user.socketID as string,
              stream: stream,
            });
            peersRef.current.push({ peerID: "", instance: peer });
            peers.push(peer);
            return true;
          });
          setPeers(peers);
        });
        socket.current?.on(
          "user-joined",
          (data: { signal: string | Peer.SignalData; ID: string }) => {
            const peer = addPeer({
              signal: data.signal,
              ID: data.ID,
              stream: stream,
            });
            peersRef.current.push({
              peerID: data.ID,
              instance: peer,
            });
            setPeers((prevState) => [...prevState, peer]);
          }
        );
        socket.current?.on(
          "receiving-signal",
          (data: { id: string; signal: string | Peer.SignalData }) => {
            const item = peersRef.current.filter((p) => {
              return p.peerID === data.id;
            });
            const peer = item[0];
            peer.instance.signal(data.signal);
          }
        );
      });
    socket.current.on("chat", async (data: { message: string; id: string }) => {
      const { message, id } = data;
      const timestamp = new Date().toLocaleTimeString();
      setMessages((prev) => [
        ...prev,
        {
          id: id,
          message: message,
          timestamp: timestamp,
          sender: user.username as string,
        },
      ]);
    });
    socket.current.on("users-left", async (data: { leaver: string }) => {
      const { leaver } = data;
      const REMAINERS = _LEAVE(leaver);
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

  const createPeer: (data: {
    stream: MediaStream;
    user: string;
    myID: string;
  }) => Peer.Instance = (data: {
    stream: MediaStream;
    user: string;
    myID: string;
  }) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: data.stream,
    });

    peer.on("signal", (signal) => {
      socket.current?.emit("sending-signal", {
        userToSignal: data.user,
        callerID: data.myID,
        signal,
      });
    });

    return peer;
  };

  const addPeer: (data: {
    stream: MediaStream;
    signal: string | Peer.SignalData;
    ID: string;
  }) => Peer.Instance = (data) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: data.stream,
    });

    peer.on("signal", (signal) => {
      socket.current?.emit("returning-signal", {
        signal: signal,
        callerID: data.ID,
      });
    });
    peer.signal(data.signal);

    return peer;
  };

  const chatHandler: (data: { msg: string }) => void = async (data: {
    msg: string;
  }) => {
    const { msg } = data;
    if (msg !== null) {
      socket.current?.emit("message", { message: msg });
    }
  };

  const _LEAVE: (leaver: string) => Peers[] = (leaver: string) => {
    console.log(leaver);
    let remainers = peersRef.current.filter((p) => {
      return p.peerID !== leaver;
    });
    console.log(remainers);
    return remainers;
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
      socket.current?.emit("disconnect", { room: user.socketID });
      nav("/", { replace: true });
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
                {user.username}
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
                myUsername={user.username as string}
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
      <ChatBox
        isMobile={isMobile}
        Me={user.username}
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
