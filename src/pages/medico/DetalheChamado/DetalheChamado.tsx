import { Box, Grid, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { HeaderDetalhe } from "./components/HeaderDetalhe";
import { PacienteInfo } from "./components/PacienteInfo";
import { AlertasEventos } from "./components/AlertasEventos";
import { SintomaPaciente } from "./components/SintomaPaciente";
import { useDetalheChamado } from "../../../hooks/useDetalheChamado";

export const DetalheChamado = () => {
  const { id } = useParams();
  const idNumber = Number(id);
  const { detalheChamado } = useDetalheChamado(idNumber);

  if (!id) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h6">Chamado não encontrado.</Typography>
        <Button component={Link} to="/chamados" sx={{ mt: 2 }}>
          Voltar para chamados
        </Button>
      </Box>
    );
  }

  if (isNaN(idNumber)) {
    return <Typography>ID inválido</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <HeaderDetalhe id={idNumber} chamado={detalheChamado} />

      <Grid container spacing={3}>
        <PacienteInfo id={idNumber} />
        <SintomaPaciente id={idNumber} />
        <AlertasEventos id={idNumber} />
      </Grid>
    </Box>
  );
};
