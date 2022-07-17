import { Theme, useMediaQuery, useTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { Dispatch } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, useSearchParams } from "react-router-dom";
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
    const [param] = useSearchParams();
    render(
      <Provider store={STORE}>
        <BrowserRouter>
          <Homepage
            user={USER}
            isMobile={isMobile}
            axios={axios}
            dispatch={dispatch}
            param={param}
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
