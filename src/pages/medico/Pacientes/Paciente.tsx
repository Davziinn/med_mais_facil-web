import { Box, Grid } from "@mui/material";
import { HeaderPaciente } from "./components/HeaderPaciente";
import { CardPaciente } from "./components/CardPaciente";
import { usePaciente } from "../../../hooks/usePaciente";

export const Paciente = () => {
  const { pacientes } = usePaciente();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <HeaderPaciente />
      <Grid container spacing={2}>
        {pacientes.map((paciente, index) => {
          return (
            <CardPaciente
              key={index}
              id={paciente.id}
              nome={paciente.nome}
              cpf={paciente.cpf}
              idade={paciente.idade}
              sexo={paciente.sexo}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
