import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

function initialState(): User {
  const roomId: string | null = sessionStorage.getItem("roomId");
  const username: string | null = sessionStorage.getItem("usernamne");
  return {
    roomId: roomId,
    username: username,
  };
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
    setRoom(
      state,
      action: PayloadAction<{
        roomId: string | undefined;
      }>
    ) {
      state.roomId = action.payload.roomId as string;
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
        roomId: string | null;
      }>
    ) {
      state.username = state.username?.trim()
        ? state.username
        : action.payload.username;
      state.roomId = state.roomId?.trim()
        ? state.roomId
        : action.payload.roomId;
      sessionStorage.setItem("roomId", state.roomId as string);
      sessionStorage.setItem("username", state.username as string);
    },
    clearUser(state) {
      state.username = null;
      sessionStorage.clear();
    },
  },
});

const userActions = userSlice.actions;

export { userActions, userSlice };
