import { ExtendButtonBase, ButtonTypeMap } from "@mui/material";
import { FC, FormEvent } from "react";

const LoginForm: FC<{
  Submit: (e: FormEvent<HTMLInputElement>) => void;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
}> = () => {
  return <></>;
};

export default LoginForm;
