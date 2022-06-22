// INTERNAL ROUTES
const HOMEPAGE: string = "/*";
const ROOM: string = "/c/*";
const REDIRECT: string = "*";
const SIGNUP: string = "/signup";
const LOGIN: string = "/login";

// EXTERNAL ROUTES
const PORT: string = process.env.REACT_APP_SERVER_PORT || "7000";
const API_VERSION: string = process.env.REACT_APP_API_VERSION || "api/v1";
const FETCHLOGIN: string = `http://localhost:${PORT}/${API_VERSION}/login/authenticate-user`;

export { HOMEPAGE, REDIRECT, ROOM, LOGIN, FETCHLOGIN, SIGNUP };
