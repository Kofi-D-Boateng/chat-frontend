import { addPeerData, createPeerData, leaveData } from "../../../types/types";
import Peer from "simple-peer";
import { RETURNINGSIGNAL, SENDINGSIGNAL, SIGNAL } from "../../UI/Constatns";

export const _LEAVE = (data: leaveData) => {
  const updatedRef = data.peersRef.current.filter((p) => {
    return p.peerID !== data.leaver;
  });
  return updatedRef;
};

export const createPeer = (data: createPeerData) => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream: data.stream,
  });

  peer.on(SIGNAL, (signal) => {
    data.socket.current?.emit(SENDINGSIGNAL, {
      userToSignal: data.userToSignal,
      callerID: data.myID,
      roomID: data.roomId,
      signal,
    });
  });

  return peer;
};

export const addPeer = (data: addPeerData) => {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream: data.stream,
  });

  peer.on(SIGNAL, (signal) => {
    data.socket.current?.emit(RETURNINGSIGNAL, {
      signal: signal,
      callerID: data.callerID,
    });
  });
  peer.signal(data.signal);

  return peer;
};
