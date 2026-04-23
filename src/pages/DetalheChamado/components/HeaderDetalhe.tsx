import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrioridadeBadge from "../../../components/PrioridadeBadge";
import StatusBadge from "../../../components/StatusBadge";
import AtendimentoModal from "../../../components/AtendimentoModal";
import { useState } from "react";
import PrescricaoModal from "../../../components/PrescricaoModal";
import type { Chamado } from "../../../mock/chamadoMock";

interface HeaderDetalheProps {
  id: number;
  chamado: Chamado | null;
}

export const HeaderDetalhe = ({ id, chamado }: HeaderDetalheProps) => {
  const [atendimentoOpen, setAtendimentoOpen] = useState(false);
  const [prescricaoOpen, setPrescricaoOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton component={Link} to="/fila">
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ flex: 1 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Chamado A00{id}
          </Typography>

          <PrioridadeBadge prioridade="verde" />
          <StatusBadge status="em_triagem" />
        </Stack>

        <Typography>
          Aberto em {new Date().toLocaleString("pt-BR")} · Hospital Kra Lho
        </Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={() => setAtendimentoOpen(true)}>
          Iniciar Atendimento
        </Button>
        <Button variant="outlined" onClick={() => setPrescricaoOpen(true)}>
          Prescrever
        </Button>
      </Stack>

      <AtendimentoModal
        open={atendimentoOpen}
        onClose={() => setAtendimentoOpen(false)}
        chamado={chamado}
        onConfirm={() => setFeedback("Atendimento registrado com sucesso!")}
      />
      <PrescricaoModal
        open={prescricaoOpen}
        onClose={() => setPrescricaoOpen(false)}
        chamado={chamado}
        onConfirm={() => setFeedback("Prescrição salva com sucesso!")}
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
