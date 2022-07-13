import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

const LoadingSpinner: FC = () => {
  return (
    <Box sx={{ position: "relative", textAlign: "center", padding: "60px 0" }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
