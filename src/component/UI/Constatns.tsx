// INTERNAL ROUTES
const HOMEPAGE: string = "/";
const ROOM: string = "/hangout/*";
const REDIRECT: string = "*";
const SIGNUP: string = "/signup";
const LOGIN: string = "/login";
const LOGGEDIN: string = HOMEPAGE + "?loggedIn=true";
const SEARCH: string = "/search";
const SETUPROOM: string = "/create-room/*";

// EXTERNAL ROUTES
const SOCKETURI: string =
  process.env.REACT_APP_SOCKET_URI || "http://localhost:7000";
const PORT: string = process.env.REACT_APP_SERVER_PORT || "7000";
const API_VERSION: string = process.env.REACT_APP_API_VERSION || "api/v1";
const FETCHLOGIN: string = `http://localhost:${PORT}/${API_VERSION}/login/authenticate-user`;
const FINDROOM: string = `http://localhost:${PORT}/${API_VERSION}/rooms/find-room`;
const CREATEROOM: string = `http://localhost:${PORT}/${API_VERSION}/rooms/create-room`;

// SOCKET LITERALS
const JOINROOM: string = "join-room";
const ROOMSTATUS: string = "room-status";
const USERID: string = "myID";
const GETUSERSINROOM: string = "all-users";
const USERJOINED: string = "user-joined";
const RECEIVESIGNAL: string = "receiving-signal";
const CHAT: string = "chat";
const USERSLEFTINROOM: string = "users-left";
const SIGNAL: string = "signal";
const SENDINGSIGNAL: string = "sending-signal";
const RETURNINGSIGNAL: string = "returning-signal";
const MESSAGES: string = "message";
const LEAVE: string = "leave";

export {
  SETUPROOM,
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
  LOGGEDIN,
  JOINROOM,
  ROOMSTATUS,
  USERID,
  GETUSERSINROOM,
  USERJOINED,
  RECEIVESIGNAL,
  CHAT,
  USERSLEFTINROOM,
  LEAVE,
  MESSAGES,
  RETURNINGSIGNAL,
  SIGNAL,
  SENDINGSIGNAL,
};
