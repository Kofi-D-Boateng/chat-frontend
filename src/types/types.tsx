export type User = {
  token: string | null;
  isAdmin: boolean;
  roomID: string | null;
  isLoggedIn: boolean;
  username: string | null;
};

export type Video = {
  name: string;
  isPlaying: boolean;
  canHear: boolean;
};
