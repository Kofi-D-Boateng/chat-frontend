import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

function initialState(): User {
  const token: string | null = sessionStorage.getItem("chat-token");
  const username: string | null = sessionStorage.getItem("username");
  const roomID: string | null = sessionStorage.getItem("room-id");
  const status: string | null = sessionStorage.getItem("status");
  return {
    token: token,
    isAdmin: false,
    roomID: roomID,
    isLoggedIn: status ? true : false,
    username: username,
  };
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
    getAccess(
      state,
      action: PayloadAction<{ token: string; isAdmin: boolean; roomID: string }>
    ) {},
  },
});

const userActions = userSlice.actions;

export { userActions, userSlice };
