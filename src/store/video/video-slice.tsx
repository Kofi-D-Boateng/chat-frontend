import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../../types/types";

function initialState(): Video {
  return {
    name: "",
    isPlaying: true,
    canHear: true,
  };
}

const videoSlice = createSlice({
  name: "video",
  initialState: initialState(),
  reducers: {
    setVideo(state, action: PayloadAction<{ isPlaying: boolean }>) {
      state.isPlaying = action.payload.isPlaying;
    },
    setAudio(state, action: PayloadAction<{ canHear: boolean }>) {
      state.canHear = action.payload.canHear;
    },
  },
});

const videoActions = videoSlice.actions;

export { videoActions, videoSlice };
