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
  };
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
    getAccess(
      state,
      action: PayloadAction<{
        token: string;
        isAdmin: boolean;
        roomID: string | undefined;
      }>
    ) {
      state.isAdmin = action.payload.isAdmin;
      state.token = action.payload.token ? action.payload.token : state.token;
      state.roomID = action.payload.roomID as string;
    },
  },
});

const userActions = userSlice.actions;

export { userActions, userSlice };
