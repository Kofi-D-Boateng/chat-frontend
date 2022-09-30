import { FC, Suspense, lazy } from "react";
import {
  Navigate,
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
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import LoadingSpinner from "./component/UI/LoadingSpinner";
const Homepage = lazy(() => import("./pages/Homepage"));
const Room = lazy(() => import("./pages/Room"));
const Search = lazy(() => import("./pages/Search"));
const CreateRoom = lazy(() => import("./pages/CreateRoom"));

const App: FC = () => {
  const USER: User = useSelector((state: RootState) => state.user);
  const isMobile: boolean = useMediaQuery(useTheme().breakpoints.down("md"));
  const [params] = useSearchParams();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout>
        <Routes>
          <Route
            path={HOMEPAGE}
            element={
              <Homepage
                isMobile={isMobile}
                axios={axios}
                dispatch={useDispatch()}
              />
            }
          />
          <Route
            path={SEARCH}
            element={
              <Search
                axios={axios}
                dispatch={useDispatch()}
                nav={useNavigate()}
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
                nav={useNavigate()}
                dispatch={useDispatch()}
                param={params}
                myInfo={USER}
              />
            }
          />
          <Route
            path={SETUPROOM}
            element={
              <CreateRoom
                axios={axios}
                nav={useNavigate()}
                dispatch={useDispatch()}
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
