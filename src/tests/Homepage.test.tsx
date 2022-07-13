import { Theme, useMediaQuery, useTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { Dispatch } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import { RootState, STORE } from "../store/store";
import { User } from "../types/types";
import axios from "axios";

const USER: User = useSelector((state: RootState) => state.user);
const theme: Theme = useTheme();
const isMobile: boolean = useMediaQuery(theme.breakpoints.down("md"));
const dispatch: Dispatch<any> = useDispatch();

describe("Homepage", () => {
  test("Homepage renders", async () => {
    render(
      <Provider store={STORE}>
        <BrowserRouter>
          <Homepage
            user={USER}
            isMobile={isMobile}
            axios={axios}
            dispatch={dispatch}
          />
        </BrowserRouter>
      </Provider>
    );

    const home = await screen.findByText("Welcome To Hangout", {
      exact: false,
    });
    expect(home).toBeInTheDocument();
  });
});
