import { Box, Typography } from "@mui/material";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

export const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 3,
        py: 2,
        minHeight: 64,
      }}
    >
      <MonitorHeartIcon
        sx={{
          color: "primary.main",
          fontSize: 28,
        }}
      />

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#eef2f7",
        }}
      >
        Med+Fácil
      </Typography>
    </Box>
  );
};