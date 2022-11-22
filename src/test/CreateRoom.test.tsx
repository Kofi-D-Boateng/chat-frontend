import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { STORE } from "../store/store";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CreateRoom from "../pages/CreateRoom";

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

const createRoomInfo = {
  name: "Kofi Boateng",
  roomName: "Team Meeting",
  capacity: "failed",
};

describe("Create Room Suite", () => {
  test("Room does not leave without filled out form", async () => {
    render(
      <Provider store={STORE}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CreateRoom isMobile={false} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const submitBtn = await screen.findByRole(
      "button",
      { name: "Submit" },
      { interval: 2000 }
    );
    userEvent.click(submitBtn);
    const TextMatch = await screen.findByText(
      /Please fill out the form below/i,
      { exact: false },
      { interval: 3000 }
    );
    expect(TextMatch).toBeInTheDocument;
  });
  test("Room does not leave without proper capacity input", async () => {
    render(
      <Provider store={STORE}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CreateRoom isMobile={false} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const [name, room] = await screen.findAllByRole("textbox");
    const capacity = await screen.findByPlaceholderText(/enter capacity/i, {
      exact: false,
    });
    userEvent.click(name);
    userEvent.type(name, createRoomInfo.name);
    userEvent.click(room);
    userEvent.type(room, createRoomInfo.roomName);
    userEvent.click(capacity);
    userEvent.type(capacity, createRoomInfo.capacity);
    const submitBtn = await screen.findByRole(
      "button",
      { name: "Submit" },
      { interval: 2000 }
    );
    userEvent.click(submitBtn);
    expect(capacity).toBeInTheDocument;
  });
  //   test("Successful data entry", async () => {
  //     render(
  //       <Provider store={STORE}>
  //         <ThemeProvider theme={theme}>
  //           <BrowserRouter>
  //             <CreateRoom
  //               isMobile={false}
  //               axios={axios}
  //               dispatch={useDispatch}
  //               nav={useNavigate}
  //               user={USER}
  //             />
  //           </BrowserRouter>
  //         </ThemeProvider>
  //       </Provider>
  //     );
  //     const [name, room] = await screen.findAllByRole(
  //       "textbox",
  //       {},
  //       { interval: 2000 }
  //     );
  //     const capacity = await screen.findByPlaceholderText(/enter capacity/i, {
  //       exact: false,
  //     });
  //     userEvent.click(name);
  //     userEvent.type(name, createRoomInfo.name);
  //     userEvent.click(room);
  //     userEvent.type(room, createRoomInfo.roomName);
  //     userEvent.click(capacity);
  //     userEvent.type(capacity, "5");
  //     const submitBtn = await screen.findByRole(
  //       "button",
  //       { name: "Submit" },
  //       { interval: 2000 }
  //     );
  //     userEvent.click(submitBtn);
  //     const LeaveButton = await screen.findByRole(
  //       "button",
  //       { name: "leave" },
  //       { interval: 4000 }
  //     );
  //     expect(LeaveButton).toBeInTheDocument;
  //   });
});
