import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useState } from "react";
import type { Chamado } from "../../../../mock/chamadoMock";
import AtendimentoModal from "../../../../components/AtendimentoModal";
import PrescricaoModal from "../../../../components/PrescricaoModal";
import PrioridadeBadge from "../../../../components/PrioridadeBadge";
import StatusBadge from "../../../../components/StatusBadge";
import { useDetalheChamado } from "../../../../hooks/useDetalheChamado";
import { useEncerrarAtendimento } from "../../../../hooks/useEncerrarAtendimento";
import { useIniciarAtendimento } from "../../../../hooks/useIniciarAtendimento";


interface HeaderDetalheProps {
  id: number;
  chamado: Chamado | null;
}

export const HeaderDetalhe = ({ id, chamado }: HeaderDetalheProps) => {
  const [atendimentoOpen, setAtendimentoOpen] = useState(false);
  const [prescricaoOpen, setPrescricaoOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [atendimentoId, setAtedimentoId] = useState<number | null>(null);
  const [atendimentoConfirmado, setAtendimentoConfirmado] = useState(false);
  const [prescricaoFeita, setPrescricaoFeita] = useState(false);
  const [atendimentoEncerrado, setAtendimentoEncerrado] = useState(false);

  const podeEncerrar =
    atendimentoConfirmado && prescricaoFeita && !atendimentoEncerrado;

  const { detalheChamado } = useDetalheChamado(id);
  const { iniciarAtendimento } = useIniciarAtendimento();
  const { encerrarAtendimento } = useEncerrarAtendimento();

  const handleIniciarAtendimento = async () => {
    const resultado = await iniciarAtendimento(id, 1);
    if (resultado) {
      setAtedimentoId(resultado.id);
      setAtendimentoOpen(true);
    }
  };

  const handleEncerrarAtendimento = async () => {
    if (!atendimentoId) return;

    const resultado = await encerrarAtendimento(atendimentoId);

    if (resultado) {
      setAtendimentoEncerrado(true);
      setFeedback("Atendimento encerrado com sucesso!");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton component={Link} to="/fila">
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ flex: 1 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Senha {detalheChamado?.senha}
          </Typography>

          {detalheChamado && (
            <PrioridadeBadge prioridade={detalheChamado?.prioridadeChamado} />
          )}
          <StatusBadge status={detalheChamado?.statusChamado} />
        </Stack>

        <Typography>
          Aberto em {new Date().toLocaleString("pt-BR")} · Hospital Kra Lho
        </Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={handleIniciarAtendimento}
          disabled={atendimentoEncerrado}
        >
          Iniciar Atendimento
        </Button>
        <Button
          variant="outlined"
          onClick={() => setPrescricaoOpen(true)}
          disabled={atendimentoEncerrado}
        >
          Prescrever
        </Button>
        {podeEncerrar && (
          <Button
            variant="contained"
            color="error"
            startIcon={<StopCircleIcon />}
            onClick={handleEncerrarAtendimento}
          >
            Encerrar Atendimento
          </Button>
        )}
      </Stack>

      <AtendimentoModal
        open={atendimentoOpen}
        onClose={() => setAtendimentoOpen(false)}
        chamado={chamado}
        onConfirm={() => {
          setAtendimentoConfirmado(true);
          setFeedback("Atendimento registrado com sucesso!");
        }}
        atendimentoId={atendimentoId}
      />
      <PrescricaoModal
        open={prescricaoOpen}
        onClose={() => setPrescricaoOpen(false)}
        chamado={chamado}
        onConfirm={() => {
          setPrescricaoFeita(true);
          setFeedback("Prescrição salva com sucesso!");
        }}
        atendimentoId={atendimentoId}
      />
      <Snackbar
        open={!!feedback}
        autoHideDuration={3500}
        onClose={() => setFeedback(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          onClose={() => setFeedback(null)}
          variant="filled"
        >
          {feedback}
        </Alert>
      </Snackbar>
    </Box>
  );
};
