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
  REDIRECT,
  ROOM,
  SEARCH,
  SETUPROOM,
} from "./component/UI/Constatns";
import Layout from "./component/UI/Layout/Layout";
import { User } from "./types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Theme, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import LoadingSpinner from "./component/UI/LoadingSpinner";
const Homepage = lazy(() => import("./pages/Homepage"));
const Room = lazy(() => import("./pages/Room"));
const Search = lazy(() => import("./pages/Search"));
const CreateRoom = lazy(() => import("./pages/CreateRoom"));

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
              <Homepage isMobile={isMobile} axios={axios} dispatch={dispatch} />
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
                user={USER}
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
                myInfo={USER}
              />
            }
          />
          <Route
            path={SETUPROOM}
            element={
              <CreateRoom
                params={params}
                dispatch={dispatch}
                axios={axios}
                nav={navigation}
                isMobile={isMobile}
                user={USER}
              />
            }
          />
          <Route path={REDIRECT} element={<Navigate replace to={HOMEPAGE} />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
