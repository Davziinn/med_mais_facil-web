import { Box, Grid } from "@mui/material";
// import { Link, useParams } from "react-router-dom";
import { HeaderDetalhe } from "./components/HeaderDetalhe";
import { PacienteInfo } from "./components/PacienteInfo";
import { SintomaPaciente } from "./components/SintomaPaciente";
import { AlertasEventos } from "./components/AlertasEventos";

export const DetalheChamado = () => {
  // const { id } = useParams();

  // if (!id) {
  //   return (
  //     <Box sx={{ textAlign: "center", py: 10 }}>
  //       <Typography variant="h6">Chamado não encontrado.</Typography>
  //       <Button component={Link} to="/chamados" sx={{ mt: 2 }}>
  //         Voltar ao chamados
  //       </Button>
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <HeaderDetalhe />
       <Grid container spacing={3}>
        <PacienteInfo />
        <SintomaPaciente />
        <AlertasEventos />
       </Grid>
    </Box>
  );
};
