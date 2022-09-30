import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

function initialState(): User {
  const roomID: string | null = sessionStorage.getItem("roomID");
  const username: string | null = sessionStorage.getItem("usernamne");
  return {
    roomID: roomID,
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
        roomID: string | null;
        socketID: string | null;
      }>
    ) {
      state.username = state.username?.trim()
        ? state.username
        : action.payload.username;
      state.roomID = state.roomID?.trim()
        ? state.roomID
        : action.payload.roomID;
      state.socketID = state.socketID?.trim()
        ? state.socketID
        : action.payload.socketID;
      sessionStorage.setItem("roomID", state.roomID as string);
      sessionStorage.setItem("username", state.username as string);
    },
    clearUser(state) {
      state.socketID = null;
      state.username = null;
      sessionStorage.clear();
    },
  },
});

const userActions = userSlice.actions;

export { userActions, userSlice };
