import { FC, ReactNode } from "react";
import classes from "../../../styles/Layout.module.css";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={classes.layout}>{children}</div>;
};

export default Layout;
