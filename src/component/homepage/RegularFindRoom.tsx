import { ButtonTypeMap, ExtendButtonBase, GridTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dispatch, FC, SetStateAction } from "react";

const RegularFindRoom: FC<{
  setStatus: Dispatch<SetStateAction<boolean>>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
}> = ({ Grid }) => {
  return <Grid></Grid>;
};

export default RegularFindRoom;
