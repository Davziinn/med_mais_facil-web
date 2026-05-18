import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import SaveIcon from "@mui/icons-material/Save";

import { AdminPageHeader } from "../../../components/AdminPageHeader";
import { ConfirmActionModal } from "../../../components/modais/ModalConfirmAction";
import { useToast } from "../../../contexts/ToastContext";

type StatusHosp =
  | "Operando normalmente"
  | "Capacidade reduzida"
  | "Sobrecarregado"
  | "Fechado";

export const Configuracoes = () => {
  const { showToast } = useToast();

  const [tempoLimite, setTempoLimite] = useState(45);
  const [maxFila, setMaxFila] = useState(80);

  const [status, setStatus] = useState<StatusHosp>("Operando normalmente");

  const [mensagem, setMensagem] = useState(
    "Bem-vindo ao Med+Fácil. Acompanhe sua senha em tempo real.",
  );

  const [notifPush, setNotifPush] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);
  const [chamadaAuto, setChamadaAuto] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const doSave = () => {
    setConfirmOpen(false);
    showToast("Configurações atualizadas com sucesso");
  };

  return (
    <Box>
      <AdminPageHeader
        title="Configurações"
        subtitle="Parâmetros operacionais do sistema"
        actions={
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => setConfirmOpen(true)}
          >
            Salvar alterações
          </Button>
        }
      />

      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Fila e atendimento
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    Tempo limite de chamado (minutos)
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Tempo máximo para o paciente comparecer após a chamada
                  </Typography>

                  <Slider
                    value={tempoLimite}
                    onChange={(_, v) => setTempoLimite(v as number)}
                    min={5}
                    max={120}
                    step={5}
                    valueLabelDisplay="auto"
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    Quantidade máxima da fila
                  </Typography>

                  <Slider
                    value={maxFila}
                    onChange={(_, v) => setMaxFila(v as number)}
                    min={10}
                    max={200}
                    step={5}
                    valueLabelDisplay="auto"
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Chamada automática
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Chama próximo paciente automaticamente
                    </Typography>
                  </Box>

                  <Switch
                    checked={chamadaAuto}
                    onChange={(e) => setChamadaAuto(e.target.checked)}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Status do hospital
              </Typography>

              <Stack spacing={3}>
                <FormControl fullWidth>
                  <InputLabel>Status geral</InputLabel>

                  <Select
                    label="Status geral"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as StatusHosp)}
                  >
                    <MenuItem value="Operando normalmente">
                      Operando normalmente
                    </MenuItem>

                    <MenuItem value="Capacidade reduzida">
                      Capacidade reduzida
                    </MenuItem>

                    <MenuItem value="Sobrecarregado">Sobrecarregado</MenuItem>

                    <MenuItem value="Fechado">Fechado</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Mensagem exibida ao paciente"
                  multiline
                  rows={3}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
        >
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Notificações
              </Typography>

              <Stack spacing={2}>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Notificações push
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Avisa pacientes no aplicativo móvel
                    </Typography>
                  </Box>

                  <Switch
                    checked={notifPush}
                    onChange={(e) => setNotifPush(e.target.checked)}
                  />
                </Stack>

                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Notificações por e-mail
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Enviar relatórios e alertas por e-mail
                    </Typography>
                  </Box>

                  <Switch
                    checked={notifEmail}
                    onChange={(e) => setNotifEmail(e.target.checked)}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ConfirmActionModal
        open={confirmOpen}
        title="Salvar configurações"
        message="Deseja salvar as alterações nas configurações operacionais?"
        variant="info"
        icon="save"
        confirmLabel="Salvar"
        onClose={() => setConfirmOpen(false)}
        onConfirm={doSave}
      />
    </Box>
  );
};
