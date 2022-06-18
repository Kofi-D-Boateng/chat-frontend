import { FC, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { HOMEPAGE } from "./component/UI/Constatns";
import Layout from "./component/UI/Layout/Layout";
import { User } from "./types/types";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const App: FC = () => {
  const USER: User = useSelector((state: RootState) => state.user);

  return (
    <Suspense fallback={<div>.....</div>}>
      <Layout>
        <Routes>
          <Route path={HOMEPAGE} element={<Homepage user={USER} />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
