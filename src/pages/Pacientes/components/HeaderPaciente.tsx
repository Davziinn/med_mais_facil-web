import { Box, Typography } from "@mui/material";
import { usePaciente } from "../../../hooks/usePaciente";

export const HeaderPaciente = () => {
  const { pacientes } = usePaciente();
  
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Pacientes
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {pacientes.length} pacientes cadastrados
      </Typography>
    </Box>
  );
};
