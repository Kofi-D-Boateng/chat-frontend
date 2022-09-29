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
  roomID: "",
  socketID: "",
  username: "",
};

const SUCCESFULPARAM: string[] = ["?roomID=testing%room"];
const FAILUREPARAM: string[] = ["?roomID=failed%room"];

describe("Search Page test suite", () => {
  beforeAll(() => {});
  test("Successful Room Search", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={SUCCESFULPARAM}>
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
  test("Failure to find Room", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={FAILUREPARAM}>
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
      /Room was not found/i,
      {
        exact: false,
      },
      { interval: 1500 }
    );
    await waitFor(() => expect(TextMatch).toBeInTheDocument);
  });
});
