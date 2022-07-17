import { Dispatch, FC, Suspense, lazy } from "react";
import {
  Navigate,
  NavigateFunction,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  HOMEPAGE,
  LOGIN,
  REDIRECT,
  ROOM,
  SEARCH,
  SETUPROOM,
  SIGNUP,
} from "./component/UI/Constatns";
import Layout from "./component/UI/Layout/Layout";
import { User } from "./types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Theme, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import LoadingSpinner from "./component/UI/LoadingSpinner";
import Search from "./pages/subpages/Search";
import Room from "./pages/Room";
import CreateRoom from "./pages/subpages/CreateRoom";
const Homepage = lazy(() => import("./pages/Homepage"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

const App: FC = () => {
  const USER: User = useSelector((state: RootState) => state.user);
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down("md"));
  const [params] = useSearchParams();
  const dispatch: Dispatch<any> = useDispatch();
  const navigation: NavigateFunction = useNavigate();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout>
        <Routes>
          <Route
            path={HOMEPAGE}
            element={
              <Homepage
                user={USER}
                isMobile={isMobile}
                axios={axios}
                dispatch={dispatch}
                param={params}
              />
            }
          />
          <Route
            path={SEARCH}
            element={
              <Search
                axios={axios}
                dispatch={dispatch}
                params={params}
                nav={navigation}
                isMobile={isMobile}
              />
            }
          />
          <Route
            path={ROOM}
            element={
              <Room
                isMobile={isMobile}
                nav={navigation}
                dispatch={dispatch}
                param={params}
              />
            }
          />
          <Route path={SETUPROOM} element={<CreateRoom />} />
          <Route
            path={LOGIN}
            element={
              <Login
                nav={navigation}
                isMobile={isMobile}
                params={params}
                axios={axios}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path={SIGNUP}
            element={
              <Signup nav={navigation} isMobile={isMobile} axios={axios} />
            }
          />
          <Route path={REDIRECT} element={<Navigate replace to={HOMEPAGE} />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
