import {
  ExtendButtonBase,
  ButtonTypeMap,
  TypographyTypeMap,
  TextFieldProps,
  GridTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dispatch, FC } from "react";
import { NavigateFunction } from "react-router-dom";

const LoggedInFindRoom: FC<{
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  TextField: (props: TextFieldProps) => JSX.Element;
  setRoom: Dispatch<
    React.SetStateAction<{
      id: string;
    }>
  >;
  nav: NavigateFunction;
}> = () => {
  return <></>;
};

export default LoggedInFindRoom;
