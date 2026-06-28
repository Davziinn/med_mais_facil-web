import { useState } from "react";
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

  // Estado compartilhado entre HeaderDetalhe e AlertasEventos.
  // Vive aqui porque o useDetalheChamado não tem cache compartilhado entre instâncias.
  const [atendimentoIniciado, setAtendimentoIniciado] = useState(false);
  const [atendimentoId, setAtendimentoId] = useState<number | null>(null);
  const [atendimentoEncerrado, setAtendimentoEncerrado] = useState(false);

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
      <HeaderDetalhe
        id={idNumber}
        chamado={detalheChamado}
        atendimentoIniciado={atendimentoIniciado}
        atendimentoId={atendimentoId}
        atendimentoEncerrado={atendimentoEncerrado}
        onAtendimentoIniciado={(novoAtendimentoId) => {
          setAtendimentoIniciado(true);
          setAtendimentoId(novoAtendimentoId);
        }}
        onAtendimentoEncerrado={() => setAtendimentoEncerrado(true)}
      />

      <Grid container spacing={3}>
        <PacienteInfo id={idNumber} />
        <SintomaPaciente id={idNumber} />
        <AlertasEventos
          id={idNumber}
          atendimentoIniciado={atendimentoIniciado}
          atendimentoId={atendimentoId}
          atendimentoEncerrado={atendimentoEncerrado}
        />
      </Grid>
    </Box>
  );
};