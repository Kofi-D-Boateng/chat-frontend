import { Dispatch, FC, Suspense, lazy } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { HOMEPAGE, LOGIN, SIGNUP } from "./component/UI/Constatns";
import Layout from "./component/UI/Layout/Layout";
import { User } from "./types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Theme, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
const Homepage = lazy(() => import("./pages/Homepage"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

const App: FC = () => {
  const USER: User = useSelector((state: RootState) => state.user);
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down("md"));
  const [params] = useSearchParams();
  const dispatch: Dispatch<any> = useDispatch();

  return (
    <Suspense fallback={<div>.....</div>}>
      <Layout>
        <Routes>
          <Route
            path={HOMEPAGE}
            element={
              <Homepage
                user={USER}
                isMobile={isMobile}
                params={params}
                axios={axios}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path={LOGIN}
            element={
              <Login
                user={USER}
                isMobile={isMobile}
                params={params}
                axios={axios}
                dispatch={dispatch}
              />
            }
          />
          <Route path={SIGNUP} element={<Signup />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
