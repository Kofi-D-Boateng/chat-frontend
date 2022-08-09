import Peer from "simple-peer";

export type User = {
  token: string | null;
  isAdmin: boolean;
  roomID: string | null;
  isLoggedIn: boolean;
  username: string | null;
  socketID: string;
  position: number;
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

export type Participants = {
  alias: string;
  roomID: string;
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
