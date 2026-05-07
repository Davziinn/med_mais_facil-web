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
import { usePaciente } from "../hooks/usePaciente";

interface ProntuarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  paciente: string | null;
}

interface ProntuarioEntry {
  id: string;
  data: string;
  diagnostico: string;
  medico: string;
  unidade: string;
  queixa: string;
  conduta: string;
  prescricoes: string[];
  exames: string[];
  status: "finalizado" | "cancelado";
}

const condicoesPreexistentesMock = [
  "Hipertensão arterial",
  "Diabetes tipo 2",
  "Asma",
];

const prontuariosMock: ProntuarioEntry[] = [
  {
    id: "pr-1-0",
    data: "2026-03-10T10:30:00.000Z",
    diagnostico: "Hipertensão arterial - acompanhamento",
    medico: "Dra. Helena Costa",
    unidade: "Hospital São Lucas",
    queixa: "Pressão elevada em medição domiciliar",
    conduta: "Ajuste de dose de anti-hipertensivo. Retorno em 30 dias.",
    prescricoes: [
      "Losartana 50mg - 1x ao dia",
      "Hidroclorotiazida 25mg - 1x ao dia",
    ],
    exames: ["Hemograma completo", "Perfil lipídico"],
    status: "finalizado",
  },
  {
    id: "pr-1-1",
    data: "2026-02-20T14:15:00.000Z",
    diagnostico: "Síndrome gripal",
    medico: "Dr. Rafael Mendes",
    unidade: "UPA Central",
    queixa: "Febre, mialgia e tosse seca há 3 dias",
    conduta: "Tratamento sintomático. Repouso e hidratação.",
    prescricoes: [
      "Paracetamol 750mg - de 6/6h se febre",
      "Dipirona 500mg - se dor",
    ],
    exames: ["Teste rápido para influenza (negativo)"],
    status: "finalizado",
  },
  {
    id: "pr-1-2",
    data: "2026-02-01T09:00:00.000Z",
    diagnostico: "Cefaleia tensional",
    medico: "Dra. Júlia Andrade",
    unidade: "Hospital São Lucas",
    queixa: "Dor de cabeça contínua há 5 horas",
    conduta: "Medicação analgésica e orientações sobre estresse.",
    prescricoes: ["Ibuprofeno 400mg - 8/8h por 3 dias"],
    exames: [],
    status: "finalizado",
  },
];

export const ProntuarioModal = ({
  isOpen,
  onClose,
  paciente,
}: ProntuarioModalProps) => {
  if (!paciente) return null;

  const { pacientes } = usePaciente();
  const pacienteData = pacientes[1];

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle sx={{ pr: 6 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {paciente}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {pacienteData?.idade} anos ·{" "}
              {pacienteData?.sexo === "M" ? "Masculino" : "Feminino"} · CPF{" "}
              {pacienteData?.cpf}
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
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1, mt: 0.5 }}>
            {condicoesPreexistentesMock.map((c) => (
              <Chip key={c} label={c} size="small" color="warning" variant="outlined" />
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Histórico de Atendimentos ({prontuariosMock.length})
        </Typography>

        <Stack spacing={2}>
          {prontuariosMock.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <EventNoteIcon sx={{ fontSize: 40, color: "text.disabled", mb: 1 }} />
              <Typography color="text.secondary">
                Sem histórico de prontuários.
              </Typography>
            </Box>
          ) : (
            prontuariosMock.map((prontuarioMock) => (
              <Box
                key={prontuarioMock.id}
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
                  sx={{ justifyContent: "space-between", alignItems: { sm: "flex-start" }, mb: 1 }}
                >
                  <Box>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 0.5 }}>
                      <LocalHospitalIcon fontSize="small" color="primary" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {prontuarioMock.diagnostico}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                      <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(prontuarioMock.data).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · {prontuarioMock.medico} · {prontuarioMock.unidade}
                      </Typography>
                    </Stack>
                  </Box>
                  <Chip
                    size="small"
                    label={prontuarioMock.status === "finalizado" ? "Finalizado" : "Cancelado"}
                    color={prontuarioMock.status === "finalizado" ? "success" : "error"}
                    variant="outlined"
                  />
                </Stack>

                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Queixa Principal
                  </Typography>
                  <Typography variant="body2">{prontuarioMock.queixa}</Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Conduta
                  </Typography>
                  <Typography variant="body2">{prontuarioMock.conduta}</Typography>
                </Box>

                {prontuarioMock.prescricoes.length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mb: 0.5 }}>
                      <MedicationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        Prescrições
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                      {prontuarioMock.prescricoes.map((m) => (
                        <Chip key={m} label={m} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Box>
                )}

                {prontuarioMock.exames.length > 0 && (
                  <Box>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mb: 0.5 }}>
                      <ScienceIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        Exames solicitados
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                      {prontuarioMock.exames.map((e) => (
                        <Chip key={e} label={e} size="small" variant="outlined" color="info" />
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