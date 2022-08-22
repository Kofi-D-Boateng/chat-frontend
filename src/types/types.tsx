import { MutableRefObject } from "react";
import Peer from "simple-peer";
import { Socket } from "socket.io-client";

export type User = {
  token: string | null;
  isAdmin: boolean;
  roomID: string | null;
  isLoggedIn: boolean;
  username: string | null;
  socketID: string | null;
  position: number | null;
};

export type Video = {
  name: string;
  isPlaying: boolean;
  canHear: boolean;
};

export type Peers = {
  peerID: string;
  instance: Peer.Instance;
};

export type Participant = {
  alias: string;
  id: string;
  instance: Peer.Instance;
};

export type UserDatagram = {
  username: string;
  socketID: string;
};

export type Messages = {
  id: string;
  message: string;
  timestamp: string;
  sender: string;
};

export type Room = {
  name: string;
  creator: string;
  capacity: number;
};

export type MessageDatagram = {
  room: string;
  user: {
    position: number;
    msg: string;
    username: string;
  };
};

export type addPeerData = {
  signal: Peer.SignalData;
  stream: MediaStream;
  callerID: string;
  socket: MutableRefObject<Socket | undefined>;
};

export type createPeerData = {
  myID: string;
  userToSignal: string;
  roomID: string;
  stream: MediaStream;
  socket: MutableRefObject<Socket | undefined>;
};

export type leaveData = {
  leaver: string;
  peers: Participant[];
  peersRef: MutableRefObject<
    {
      peerID: string;
      instance: Peer.Instance;
    }[]
  >;
};
