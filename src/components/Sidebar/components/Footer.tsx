import { Box, Avatar, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
      <Avatar
        sx={{
          bgcolor: "primary.main",
          width: 36,
          height: 36,
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        DR
      </Avatar>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: "#eef2f7" }}
          noWrap
        >
          Dr. Tode Paudo ro
        </Typography>
        <Typography variant="caption" sx={{ color: "rgba(238,242,247,0.5)" }}>
          Clínico Geral
        </Typography>
      </Box>
    </Box>
  );
};
