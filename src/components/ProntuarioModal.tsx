/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MedicationIcon from "@mui/icons-material/Medication";
import ScienceIcon from "@mui/icons-material/Science";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useProntuario } from "../hooks/useConsultarProntuarioPaciente";
import { useEffect } from "react";

interface ProntuarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  paciente: number | null;
  nomePaciente: string;
}

export const ProntuarioModal = ({
  isOpen,
  onClose,
  paciente,
  nomePaciente,
}: ProntuarioModalProps) => {
  if (!paciente) return null;

  const { prontuario, carregarProntuario } = useProntuario();

  useEffect(() => {
    carregarProntuario(paciente);
  }, [carregarProntuario, paciente]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle sx={{ pr: 6 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {nomePaciente ?? "Paciente Desconhecido"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {prontuario?.idade} anos · {prontuario?.sexo} · CPF{" "}
              {prontuario?.cpf ?? "—"}
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          aria-label="Fechar"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Condições preexistentes
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: "wrap", gap: 1, mt: 0.5 }}
          >
            {prontuario?.condicoesPreexistentes?.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhuma condição registrada.
              </Typography>
            ) : (
              prontuario?.condicoesPreexistentes?.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  size="small"
                  color="warning"
                  variant="outlined"
                />
              ))
            )}
          </Stack>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Histórico de Atendimentos ({prontuario?.historico?.length ?? 0})
        </Typography>

        <Stack spacing={2}>
          {prontuario?.historico?.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <EventNoteIcon
                sx={{ fontSize: 40, color: "text.disabled", mb: 1 }}
              />
              <Typography color="text.secondary">
                Sem histórico de prontuários.
              </Typography>
            </Box>
          ) : (
            prontuario?.historico?.map((item) => (
              <Box
                key={item.atendimentoId}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: { sm: "flex-start" },
                    mb: 1,
                  }}
                >
                  <Box>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", mb: 0.5 }}
                    >
                      <LocalHospitalIcon fontSize="small" color="primary" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {item.diagnostico ??
                          item.hipoteseDiagnostica ??
                          "Diagnóstico não informado"}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ alignItems: "center" }}
                    >
                      <AccessTimeIcon
                        sx={{ fontSize: 14, color: "text.secondary" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(item.dataFim).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · {item.nomeMedico}
                      </Typography>
                    </Stack>
                  </Box>

                  <Chip
                    size="small"
                    icon={item.dataFim ? <CheckCircleIcon /> : <CancelIcon />}
                    label={item.dataFim ? "Finalizado" : "Em andamento"}
                    color={item.dataFim ? "success" : "warning"}
                    variant="outlined"
                  />
                </Stack>

                {item.anamnese && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Queixa Principal
                    </Typography>
                    <Typography variant="body2">{item.anamnese}</Typography>
                  </Box>
                )}

                {item.conduta && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Conduta
                    </Typography>
                    <Typography variant="body2">{item.conduta}</Typography>
                  </Box>
                )}

                {item.medicamentos.length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ alignItems: "center", mb: 0.5 }}
                    >
                      <MedicationIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Prescrições
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: "wrap", gap: 0.5 }}
                    >
                      {item.medicamentos.map((m) => (
                        <Chip
                          key={m}
                          label={m}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                {item.exames.length > 0 && (
                  <Box>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ alignItems: "center", mb: 0.5 }}
                    >
                      <ScienceIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Exames solicitados
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: "wrap", gap: 0.5 }}
                    >
                      {item.exames.map((e) => (
                        <Chip
                          key={e}
                          label={e}
                          size="small"
                          variant="outlined"
                          color="info"
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            ))
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};
