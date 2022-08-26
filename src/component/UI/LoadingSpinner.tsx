import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

const LoadingSpinner: FC = () => {
  return (
    <Box>
      <CircularProgress
        sx={{
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "50%",
        }}
      />
    </Box>
  );
};

export default LoadingSpinner;
