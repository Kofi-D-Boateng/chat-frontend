import { createTheme, ThemeProvider } from "@mui/material";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
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
  id: "",
  messages: [],
  username: "",
};

const SUCCESFULPARAM: string[] = ["?roomId=testing%room"];
const FAILUREPARAM: string[] = ["?roomId=failed%room"];

describe("Search Page test suite", () => {
  test("Successful Room Search", async () => {
    // render(
    //   <MemoryRouter initialEntries={SUCCESFULPARAM}>
    //     <Provider store={STORE}>
    //       <ThemeProvider theme={theme}>
    //         <Search isMobile={false} user={USER} />
    //       </ThemeProvider>
    //     </Provider>
    //   </MemoryRouter>
    // );
    // const TextMatch = await waitFor(() =>
    //   screen.findByText(
    //     /Please enter a username/i,
    //     {
    //       exact: false,
    //     },
    //     { interval: 5000 }
    //   )
    // );
    // expect(TextMatch).toBeInTheDocument();
  });
  test("Failure to find Room", async () => {
    // render(
    //   <MemoryRouter initialEntries={FAILUREPARAM}>
    //     <Provider store={STORE}>
    //       <ThemeProvider theme={theme}>
    //         <Search isMobile={false} user={USER} />
    //       </ThemeProvider>
    //     </Provider>
    //   </MemoryRouter>
    // );
    // const TextMatch = await waitFor(() =>
    //   screen.findByText(
    //     /Room was not found/i,
    //     {
    //       exact: false,
    //     },
    //     { interval: 5000 }
    //   )
    // );
    // expect(TextMatch).not.toBeInTheDocument();
  });
});
