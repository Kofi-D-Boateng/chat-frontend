// modals
const modalDiv: Element | null = document.getElementById("modal-root");

// INTERNAL ROUTES
const HOMEPAGE: string = "/";
const ROOM: string = "/hangout/*";
const REDIRECT: string = "*";
const SIGNUP: string = "/signup";
const LOGIN: string = "/login";
const LOGGEDIN: string = HOMEPAGE + "?loggedIn=true";
const SEARCH: string = "/search";
const SETUPROOM: string = "/create-room/";

// EXTERNAL ROUTES
const DOMAIN: string = "http://localhost:7210";
const PATH: string = "/chat-socket";
const API_VERSION: string = process.env.REACT_APP_API_VERSION || "api/v1";
const FETCHLOGIN: string = `/${API_VERSION}/login/authenticate-user`;
const FINDROOM: string = `/${API_VERSION}/rooms/find-room`;
const CREATEROOM: string = `/${API_VERSION}/rooms/create-room`;

// MESSAGE LENGTHS
const characterLimit: number = 250;

export {
  modalDiv,
  characterLimit,
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
  DOMAIN,
  LOGGEDIN,
  PATH,
};
