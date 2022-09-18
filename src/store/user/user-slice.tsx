import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

function initialState(): User {
  const token: string | null = sessionStorage.getItem("chat-token");
  const roomID: string | null = sessionStorage.getItem("roomID");
  const username: string | null = sessionStorage.getItem("usernamne");
  return {
    token: token,
    isAdmin: false,
    roomID: roomID,
    isLoggedIn: token ? true : false,
    username: username,
    socketID: null,
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
        username: string | null;
        token: string;
        isAdmin: boolean;
        roomID: string | null;
        socketID: string | null;
      }>
    ) {
      state.token = state.token?.trim() ? state.token : action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      state.username = state.username?.trim()
        ? state.username
        : action.payload.username;
      state.roomID = state.roomID?.trim()
        ? state.roomID
        : action.payload.roomID;
      state.socketID = state.socketID?.trim()
        ? state.socketID
        : action.payload.socketID;
      sessionStorage.setItem("token", state.token);
      sessionStorage.setItem("roomID", state.roomID as string);
      sessionStorage.setItem("username", state.username as string);
    },
    clearUser(state) {
      state.isAdmin = false;
      state.token = null;
      state.socketID = null;
      state.username = null;
      sessionStorage.clear();
    },
  },
});

const userActions = userSlice.actions;

export { userActions, userSlice };
