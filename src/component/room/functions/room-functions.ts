import {
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
  SetStateAction,
} from "react";
import {
  addPeerData,
  createPeerData,
  leaveData,
  MessageData,
} from "../../../types/types";
import Peer from "simple-peer";
import { characterLimit } from "../../UI/Constatns";
import { videoActions } from "../../../store/video/video-slice";
import { regex, spaceRegEx } from "../../UI/RegExp";
import { SocketNamespace } from "../../../enums/namespaces";

export const _LEAVE = (data: leaveData) => {
  const updatedRef = data.peersRef.current.filter((p) => {
    return p.peerID !== data.leaver;
  });
  return updatedRef;
};

// ======================================== PEER FUNCTIONS =================================================

export const createPeer = (data: createPeerData) => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream: data.stream,
  });

  peer.on(SocketNamespace.SIGNAL, (signal) => {
    data.socket.current?.emit(SocketNamespace.SENDINGSIGNAL, {
      userToSignal: data.userToSignal,
      callerId: data.myID,
      roomId: data.roomId,
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

  peer.on(SocketNamespace.SIGNAL, (signal) => {
    data.socket.current?.emit(SocketNamespace.RETURNINGSIGNAL, {
      signal: signal,
      callerId: data.callerId,
    });
  });
  peer.signal(data.signal);

  return peer;
};

export const videoHandler: (
  src: MediaStream,
  dispatch: Dispatch<any>
) => void = (src, dispatch) => {
  const video = src.getTracks().find((track) => track.kind === "video");
  if (video?.enabled) {
    video.enabled = false;
    dispatch(videoActions.setVideo({ isPlaying: true }));
  } else {
    video!.enabled = true;
    dispatch(videoActions.setVideo({ isPlaying: true }));
  }
};

//===================================== CHATBOX FUNCTIONS =========================================//

export const inputView: (
  event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  setShowLabel: (value: SetStateAction<boolean>) => void
) => void = (event, setShowLabel) => {
  const { type } = event;
  if (type === "focus") {
    setShowLabel(true);
  } else if (type === "blur") {
    setShowLabel(false);
  }
};

export const limitHandler: (
  event: KeyboardEvent<HTMLDivElement>,
  setShowLabel: (value: SetStateAction<boolean>) => void,
  setLimit: (value: SetStateAction<number>) => void
) => void = (event, setShowLabel, setLimit) => {
  const { key } = event;
  const { code } = event;
  const char = regex.test(key);
  const spacebar = spaceRegEx.test(code);
  setShowLabel(true);
  if (key === "Backspace") {
    setLimit((prev) => (prev < characterLimit ? prev + 1 : prev));
  } else if (char || spacebar) {
    setLimit((prev) => (key !== "Backspace" && prev !== 0 ? prev - 1 : prev));
  }
};

export const sendHandler: (
  chatRef: MutableRefObject<HTMLInputElement | undefined>,
  id: string,
  limit: number,
  onSend: (data: MessageData) => void,
  setShowLabel: (value: SetStateAction<boolean>) => void,
  setLimit: (value: SetStateAction<number>) => void
) => void = (chatRef, id, limit, onSend, setShowLabel, setLimit) => {
  const text = chatRef.current?.value as string;
  if (limit <= 0 || limit === characterLimit || text.trim().length === 0) {
    return;
  }

  onSend({
    id: id,
    message: text,
  });
  setShowLabel(false);
  setLimit(characterLimit);
  chatRef.current!.value = "";
};
