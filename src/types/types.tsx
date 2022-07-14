import Peer from "simple-peer";

export type User = {
  token: string | null;
  isAdmin: boolean;
  roomID: string | null;
  isLoggedIn: boolean;
  username: string | null;
  socketID: string;
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

export type userDatagram = {
  username: string;
  socketID: string;
};

export type Messages = {
  id: string;
  message: string;
  timestamp: string;
  sender: string;
};
