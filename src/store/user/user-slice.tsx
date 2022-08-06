import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

function initialState(): User {
  const token: string | null = sessionStorage.getItem("chat-token");
  const username: string | null = sessionStorage.getItem("username");
  const roomID: string | null = sessionStorage.getItem("room-id");
  return {
    token: token,
    isAdmin: false,
    roomID: roomID,
    isLoggedIn: token ? true : false,
    username: username,
    socketID: "",
    position: 0,
  };
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
    setRoom(
      state,
      action: PayloadAction<{
        roomID: string | undefined;
      }>
    ) {
      state.roomID = action.payload.roomID as string;
    },
    login(
      state,
      action: PayloadAction<{
        username: string;
      }>
    ) {
      state.username = action.payload.username;
    },
    setUser(
      state,
      action: PayloadAction<{
        username: string;
        token: string;
        isAdmin: boolean;
        roomID: string;
        socketID: string;
      }>
    ) {
      state.token =
        state.token && state.token.trim().length > 0
          ? state.token
          : action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      state.username =
        state.username && state.username?.trim().length > 0
          ? state.username
          : action.payload.username;
      state.roomID =
        state.roomID && state.roomID?.trim().length > 0
          ? state.roomID
          : action.payload.roomID;
      state.socketID =
        state.socketID.trim().length > 0
          ? state.socketID
          : action.payload.socketID;
    },
    setPosition(state, action: PayloadAction<{ position: number }>) {
      state.position = action.payload.position;
    },
  },
});

const userActions = userSlice.actions;

export { userActions, userSlice };
