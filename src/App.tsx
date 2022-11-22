import { FC, Suspense, lazy } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import {
  HOMEPAGE,
  REDIRECT,
  ROOM,
  SEARCH,
  SETUPROOM,
} from "./component/UI/Constatns";
import Layout from "./component/UI/Layout/Layout";
import { User } from "./types/types";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useMediaQuery, useTheme } from "@mui/material";
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
          <Route path={HOMEPAGE} element={<Homepage isMobile={isMobile} />} />
          <Route
            path={SEARCH}
            element={<Search isMobile={isMobile} user={USER} />}
          />
          <Route
            path={ROOM}
            element={<Room isMobile={isMobile} param={params} />}
          />
          <Route
            path={SETUPROOM}
            element={<CreateRoom isMobile={isMobile} />}
          />
          <Route path={REDIRECT} element={<Navigate replace to={HOMEPAGE} />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
