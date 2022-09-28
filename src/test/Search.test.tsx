import { createTheme, ThemeProvider } from "@mui/material";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import axios from "axios";
import { MemoryRouter, useNavigate } from "react-router-dom";
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

const URLPARAMS: string[] = ["?roomID=testing%room"];

describe("Search Page test suite", () => {
  beforeAll(() => {});
  test("Successful Room Search", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={URLPARAMS}>
          <Provider store={STORE}>
            <ThemeProvider theme={theme}>
              <Search
                isMobile={false}
                axios={axios}
                dispatch={useDispatch}
                nav={useNavigate}
                user={USER}
              />
            </ThemeProvider>
          </Provider>
        </MemoryRouter>
      );
    });
    const TextMatch = await screen.findByText(
      /Please enter a username/i,
      {
        exact: false,
      },
      { interval: 1500 }
    );
    await waitFor(() => expect(TextMatch).toBeInTheDocument);
  });
});
