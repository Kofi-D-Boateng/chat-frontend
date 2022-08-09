import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "../../types/types";

function initialState(): Room {
  return {
    name: "",
    creator: "",
    capacity: 0,
  };
}

const roomSlice = createSlice({
  name: "room",
  initialState: initialState(),
  reducers: {
    createRoom(state, action: PayloadAction<Room>) {
      state.name = action.payload.name;
      state.creator = action.payload.creator;
      state.capacity = action.payload.capacity;
    },
  },
});

const roomActions = roomSlice.actions;

export { roomSlice, roomActions };
