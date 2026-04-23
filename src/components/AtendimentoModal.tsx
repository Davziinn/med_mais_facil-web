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
  InputAdornment,
  Divider,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { Chamado } from "../mock/chamadoMock";

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

interface Props {
  open: boolean;
  onClose: () => void;
  chamado: Chamado | null;
  onConfirm?: (dados: AtendimentoDados) => void;
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
}: Props) {
  const [dados, setDados] = useState<AtendimentoDados>(initial);

  if (!chamado) return null;

  const update =
    (k: keyof AtendimentoDados) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDados((d) => ({ ...d, [k]: e.target.value }));

  const handleConfirm = () => {
    onConfirm?.(dados);
    setDados(initial);
    onClose();
  };

  const handleClose = () => {
    setDados(initial);
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
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Iniciar Atendimento · {chamado.senha}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Paciente: {chamado.paciente.nome} · {chamado.queixaPrincipal}
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          aria-label="Fechar"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Alert severity="info" sx={{ mb: 2 }}>
          Registre os sinais vitais e a evolução clínica. Os campos serão salvos
          no prontuário ao confirmar.
        </Alert>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
          <MonitorHeartIcon color="error" fontSize="small" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Sinais Vitais
          </Typography>
        </Stack>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Pressão Arterial"
              placeholder="120/80"
              value={dados.pressao}
              onChange={update("pressao")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">°C</InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Freq. Cardíaca"
              placeholder="80"
              value={dados.frequenciaCardiaca}
              onChange={update("frequenciaCardiaca")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">°C</InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Temperatura"
              placeholder="36.5"
              value={dados.temperatura}
              onChange={update("temperatura")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">°C</InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Saturação O₂"
              placeholder="98"
              value={dados.saturacao}
              onChange={update("saturacao")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Glicemia"
              placeholder="100"
              value={dados.glicemia}
              onChange={update("glicemia")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">°C</InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
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
            <Grid size={{ xs: 12, md: 8 }}>
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
            sx={{ flexWrap: "wrap", gap: 1, mt: 0.5 }}
          >
            {chamado.sintomas.map((s) => (
              <Chip
                key={s.nome}
                label={`${s.nome} · ${s.intensidade}/10`}
                size="small"
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
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