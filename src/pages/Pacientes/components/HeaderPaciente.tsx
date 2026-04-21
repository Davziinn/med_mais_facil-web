import { Box, Typography } from "@mui/material";

export const HeaderPaciente = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Pacientes
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {/* {pacientes.lenght} */} 6 pacientes cadastrados
      </Typography>
    </Box>
  );
};
