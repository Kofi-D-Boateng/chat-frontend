import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "../../types/types";
const roomName = localStorage.getItem("roomName");
const roomId: string | null = sessionStorage.getItem("roomId");
function initialState(): Room {
  return {
    name: roomName ? roomName : "",
    creator: "",
    capacity: 0,
    roomId: roomId as string,
  };
}

const roomSlice = createSlice({
  name: "room",
  initialState: initialState(),
  reducers: {
    setRoom(state, action: PayloadAction<Room>) {
      state.name = action.payload.name;
      state.creator = action.payload.creator;
      state.capacity = action.payload.capacity;
      localStorage.setItem("roomName", action.payload.name);
      sessionStorage.setItem("roomId", action.payload.roomId);
    },
    setRoomName(state, action: PayloadAction<string>) {
      state.name = action.payload;
      localStorage.setItem("roomName", action.payload);
    },
    setRoomId(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },
  },
});

const roomActions = roomSlice.actions;

export { roomSlice, roomActions };
