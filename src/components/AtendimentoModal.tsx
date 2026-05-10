import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  IconButton,
  TextField,
  Grid,
  Chip,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useAtualizarDadosAtendimento } from "../hooks/useAtualizarDadosAtendimento";
import type { DetalheChamadoUI } from "../mappers/detalheMapper";

export interface AtendimentoDados {
  pressao: string;
  frequenciaCardiaca: string;
  temperatura: string;
  saturacao: string;
  glicemia: string;
  anamnese: string;
  exameFisico: string;
  hipoteseDiagnostica: string;
  conduta: string;
  cid: string;
}

interface AtendimentoModalProps {
  open: boolean;
  onClose: () => void;
  chamado: DetalheChamadoUI | null;
  onConfirm?: (dados: AtendimentoDados) => void;
  atendimentoId: number | null;
}

const initial: AtendimentoDados = {
  pressao: "",
  frequenciaCardiaca: "",
  temperatura: "",
  saturacao: "",
  glicemia: "",
  anamnese: "",
  exameFisico: "",
  hipoteseDiagnostica: "",
  conduta: "",
  cid: "",
};

export default function AtendimentoModal({
  open,
  onClose,
  chamado,
  onConfirm,
  atendimentoId,
}: AtendimentoModalProps) {
  const [dados, setDados] = useState<AtendimentoDados>(initial);

  const { atualizarDadosAtendimento } = useAtualizarDadosAtendimento();

  if (!chamado) return null;

  const update =
    (k: keyof AtendimentoDados) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDados((d) => ({
        ...d,
        [k]: e.target.value,
      }));

  const handleConfirm = async () => {
    if (!atendimentoId) return;

    const resultado = await atualizarDadosAtendimento(atendimentoId, {
      anamnese: dados.anamnese,
      exameFisico: dados.exameFisico,
      hipoteseDiagnostica: dados.hipoteseDiagnostica,
      cidDoenca: dados.cid,
      conduta: dados.conduta,
    });

    if (resultado) {
      onConfirm?.(dados);
      setDados(initial);

      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle sx={{ pr: 6 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <AssignmentIcon color="primary" />

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Atendimento · {chamado.senha}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Paciente: {chamado.paciente.nome}
              {" · "}
              {chamado.queixa}
            </Typography>
          </Box>
        </Stack>

        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
          aria-label="Fechar"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Avaliação Clínica
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Anamnese"
            multiline
            minRows={2}
            fullWidth
            size="small"
            placeholder="História da doença atual, antecedentes relevantes..."
            value={dados.anamnese}
            onChange={update("anamnese")}
          />

          <TextField
            label="Exame Físico"
            multiline
            minRows={2}
            fullWidth
            size="small"
            placeholder="Achados de exame físico..."
            value={dados.exameFisico}
            onChange={update("exameFisico")}
          />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                label="Hipótese Diagnóstica"
                fullWidth
                size="small"
                placeholder="Ex: Cefaleia tensional"
                value={dados.hipoteseDiagnostica}
                onChange={update("hipoteseDiagnostica")}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="CID-10"
                fullWidth
                size="small"
                placeholder="R51"
                value={dados.cid}
                onChange={update("cid")}
              />
            </Grid>
          </Grid>

          <TextField
            label="Conduta"
            multiline
            minRows={2}
            fullWidth
            size="small"
            placeholder="Plano terapêutico, orientações, encaminhamentos..."
            value={dados.conduta}
            onChange={update("conduta")}
          />
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Sintomas relatados na triagem
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              gap: 1,
              mt: 0.5,
            }}
          >
            {chamado.sintomas.map((s) => (
              <Chip
                key={s.id}
                label={`${s.descricao} · ${s.intensidade}/10`}
                size="small"
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>

        <Button
          onClick={handleConfirm}
          variant="contained"
          startIcon={<CheckCircleIcon />}
          disabled={!dados.hipoteseDiagnostica.trim() || !dados.conduta.trim()}
        >
          Confirmar Atendimento
        </Button>
      </DialogActions>
    </Dialog>
  );
}
