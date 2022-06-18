import {
  ButtonTypeMap,
  CardContentTypeMap,
  CardTypeMap,
  ExtendButtonBase,
  GridTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, FormEvent, useState } from "react";
import { User } from "../../types/types";
import LoginForm from "../forms/LoginForm";
import LoggedInFindRoom from "./LoggedInFindRooom";
import RegularFindRoom from "./RegularFindRoom";

const UserLogin: FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  submit: (e: FormEvent<HTMLInputElement>) => void;
  Card: OverridableComponent<CardTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  CardContent: OverridableComponent<CardContentTypeMap<{}, "div">>;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  classes: {
    readonly [key: string]: string;
  };
  user: User;
}> = ({
  Card,
  CardContent,
  Typography,
  classes,
  user,
  Grid,
  submit,
  Button,
}) => {
  const [wantToLogin, setWantToLogin] = useState<boolean>(false);
  return (
    <Card className={classes.card}>
      <div className={classes.cardHeader}>
        <p>
          {!user.isLoggedIn
            ? "Welcome to Hangout!"
            : `Welcome back ${user.username}`}
        </p>
      </div>
      {!user.isLoggedIn ? (
        <CardContent>
          {!wantToLogin ? (
            <RegularFindRoom
              setStatus={setWantToLogin}
              Grid={Grid}
              Button={Button}
            />
          ) : (
            <LoginForm Submit={submit} Button={Button} />
          )}
        </CardContent>
      ) : (
        <CardContent>
          <LoggedInFindRoom Button={Button} />
        </CardContent>
      )}
    </Card>
  );
};

export default UserLogin;
