// INTERNAL ROUTES
const HOMEPAGE: string = "/";
const ROOM: string = "/hangout/*";
const REDIRECT: string = "*";
const SIGNUP: string = "/signup";
const LOGIN: string = "/login";
const SEARCH: string = "/search";

// EXTERNAL ROUTES
const SOCKETURI: string =
  process.env.REACT_APP_SOCKET_URI || "http://localhost:7000";
const PORT: string = process.env.REACT_APP_SERVER_PORT || "7000";
const API_VERSION: string = process.env.REACT_APP_API_VERSION || "api/v1";
const FETCHLOGIN: string = `http://localhost:${PORT}/${API_VERSION}/login/authenticate-user`;
const FINDROOM: string = `http://localhost:${PORT}/${API_VERSION}/rooms/find-room`;
const CREATEROOM: string = `http://localhost:${PORT}/${API_VERSION}/rooms/create-room`;

export {
  HOMEPAGE,
  REDIRECT,
  ROOM,
  LOGIN,
  FETCHLOGIN,
  SIGNUP,
  FINDROOM,
  SEARCH,
  CREATEROOM,
  SOCKETURI,
};
