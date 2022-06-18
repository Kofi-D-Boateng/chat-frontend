import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user-slice";
import { videoSlice } from "./video/video-slice";

const STORE = configureStore({
  reducer: {
    user: userSlice.reducer,
    video: videoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof STORE.getState>;

export { STORE };
