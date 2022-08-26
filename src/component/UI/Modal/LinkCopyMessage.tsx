import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { createPortal } from "react-dom";
import { modalDiv } from "../Constatns";

const Modal: FC<{
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
}> = ({ classes, isMobile }) => {
  return (
    <Card className={!isMobile ? classes.card : classes.mobCard}>
      <CardContent>
        <Typography variant="h5">Copied link to room!</Typography>
      </CardContent>
    </Card>
  );
};

const LinkCopyMessage: FC<{
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
}> = ({ isMobile, classes }) => {
  return createPortal(
    <Modal classes={classes} isMobile={isMobile} />,
    modalDiv as Element
  );
};

export default LinkCopyMessage;
