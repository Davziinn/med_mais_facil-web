import { Box, Typography } from "@mui/material";

export const HeaderDashboard = () => {
  const currentDate = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  
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
        Hospital São Lucas · {currentDate}
      </Typography>
    </Box>
  );
};
