import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { HeaderDetalhe } from "./components/HeaderDetalhe";
import { PacienteInfo } from "./components/PacienteInfo";
import { AlertasEventos } from "./components/AlertasEventos";
import { SintomaPaciente } from "./components/SintomaPaciente";
import { useDetalheChamado } from "../../../hooks/useDetalheChamado";

export const DetalheChamado = () => {
  const { id } = useParams();
  const idNumber = Number(id);
  const { detalheChamado, setDetalheChamado, loading } = useDetalheChamado(idNumber);

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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!detalheChamado) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h6">Chamado não encontrado.</Typography>
        <Button component={Link} to="/chamados" sx={{ mt: 2 }}>
          Voltar para chamados
        </Button>
      </Box>
    );
  }

  const atendimentoIniciado =
    detalheChamado.statusChamado === "EM_ATENDIMENTO" ||
    detalheChamado.statusChamado === "FINALIZADO";

  const atendimentoEncerrado = detalheChamado.statusChamado === "FINALIZADO";

  const atendimentoId = detalheChamado.atendimentoId ?? null;

  const handleAtendimentoIniciado = (novoAtendimentoId: number) => {
    setDetalheChamado({
      ...detalheChamado,
      statusChamado: "EM_ATENDIMENTO",
      atendimentoId: novoAtendimentoId,
    });
  };

  const handleAtendimentoEncerrado = () => {
    setDetalheChamado({
      ...detalheChamado,
      statusChamado: "FINALIZADO",
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <HeaderDetalhe
        id={idNumber}
        chamado={detalheChamado}
        atendimentoIniciado={atendimentoIniciado}
        atendimentoId={atendimentoId}
        atendimentoEncerrado={atendimentoEncerrado}
        onAtendimentoIniciado={handleAtendimentoIniciado}
        onAtendimentoEncerrado={handleAtendimentoEncerrado}
      />

      <Grid container spacing={3}>
        <PacienteInfo chamado={detalheChamado} />
        <SintomaPaciente chamado={detalheChamado} />
        <AlertasEventos
          chamado={detalheChamado}
          atendimentoIniciado={atendimentoIniciado}
          atendimentoId={atendimentoId}
          atendimentoEncerrado={atendimentoEncerrado}
        />
      </Grid>
    </Box>
  );
};