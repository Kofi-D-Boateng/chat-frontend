import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import axios from "axios";
import { BrowserRouter, useNavigate, useSearchParams } from "react-router-dom";
import Search from "../pages/Search";
import { STORE } from "../store/store";
import { User } from "../types/types";

const theme = createTheme({
  typography: {
    fontFamily: "Noto JP Sans",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const USER: User = {
  isAdmin: false,
  isLoggedIn: false,
  roomID: "",
  socketID: "",
  token: "",
  username: "",
};

describe("Search Page test suite", () => {
  test("Successful Room Search", () => {
    // render(
    //   <Provider store={STORE}>
    //     <ThemeProvider theme={theme}>
    //       <BrowserRouter>
    //         <Search
    //           isMobile={false}
    //           axios={axios}
    //           dispatch={useDispatch}
    //           nav={useNavigate}
    //           user={USER}
    //           params={useSearchParams()}
    //         />
    //       </BrowserRouter>
    //     </ThemeProvider>
    //   </Provider>
    // );
  });
});
