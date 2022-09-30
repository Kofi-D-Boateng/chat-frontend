import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { Provider, useDispatch } from "react-redux";
import { STORE } from "../store/store";
import Homepage from "../pages/Homepage";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { randomBytes } from "crypto";

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

describe("Homepage test suite", () => {
  test("Create room button", async () => {
    render(
      <Provider store={STORE}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Homepage isMobile={false} axios={axios} dispatch={useDispatch} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const createRoomBtn = await screen.findByText(/Create Room/i, {
      exact: false,
    });
    userEvent.click(createRoomBtn);
    expect(createRoomBtn).not.toBeInTheDocument;
  });

  test("Join room does not change homepage", async () => {
    render(
      <Provider store={STORE}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Homepage isMobile={false} axios={axios} dispatch={useDispatch} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const joinRoomBtn = await screen.findByText(/Join Room/i, {
      exact: false,
    });
    userEvent.click(joinRoomBtn);
    expect(joinRoomBtn).toBeInTheDocument;
  });

  test("Failure to find room", async () => {
    render(
      <Provider store={STORE}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Homepage isMobile={false} axios={axios} dispatch={useDispatch} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const joinRoomBtn = await screen.findByText(/Join Room/i, {
      exact: false,
    });
    const TextArea = await screen.findByRole("textbox");
    userEvent.click(TextArea);
    userEvent.type(TextArea, randomBytes(12).toString("hex"));
    userEvent.click(joinRoomBtn);
    expect(joinRoomBtn).not.toBeInTheDocument;
    const TextMatch = screen.findByText(
      /Welcome to Hangout/i,
      {
        exact: false,
      },
      { interval: 3500 }
    );
    await waitFor(() => expect(TextMatch).toBeInTheDocument);
  });
});
