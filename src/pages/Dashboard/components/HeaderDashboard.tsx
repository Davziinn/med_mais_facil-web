import { Box, Typography } from "@mui/material";

export const HeaderDashboard = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
        }}
      >
        Hoje em um Olhar
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Hospital São Lucas · 14 de março de 2026
      </Typography>
    </Box>
  );
};
