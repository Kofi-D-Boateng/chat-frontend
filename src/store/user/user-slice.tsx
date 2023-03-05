import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

function initialState(): User {
  const username: string | null = sessionStorage.getItem("usernamne");
  return {
    id: "",
    username: username,
    messages: [],
  };
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
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
      }>
    ) {
      state.username = state.username?.trim()
        ? state.username
        : action.payload.username;
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
