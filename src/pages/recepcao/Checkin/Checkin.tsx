import { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Stack,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SearchIcon from "@mui/icons-material/Search";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import CloseIcon from "@mui/icons-material/Close";
import CallSplitIcon from "@mui/icons-material/CallSplit";

import { useNavigate, useParams } from "react-router-dom";

import {
  PageShell,
  PANEL_BORDER,
  panelSx,
  PrioridadeTag,
  TEXT,
  TEXT_DIM,
} from "../_shared";

import { QRScanner } from "../../../components/QRScanner";
import { useDetalheChamado } from "../../../hooks/useDetalheChamado";
import type { PrioridadeChamadoResponseAPI } from "../../../service/api/filaEsperaService";
import { useRecepcaoDashboard } from "../../../hooks/useRecepcaoDashboard";
import { ModalConfirmarCheckIn } from "../../../components/modais/ModalConfirmarCheckIn";
import { ModalConfirmarAusente } from "../../../components/modais/ModalConfirmarAusente";
import { ModalCancelarChamado } from "../../../components/modais/ModalCancelarChamado";
import StatusBadge from "../../../components/StatusBadge";

function calcMinutos(data?: string | Date) {
  if (!data) return 0;
  const agora = new Date().getTime();
  const criado = new Date(data).getTime();
  return Math.floor((agora - criado) / 1000 / 60);
}

function formatTempo(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}min`;
}

export const Checkin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const idNumero = id ? Number(id) : 0;
  const { detalheChamado } = useDetalheChamado(idNumero);
  const { confirmarCheckIn, marcarPacienteComoAusente, cancelarChamado } = useRecepcaoDashboard();

  const [tab, setTab] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [modalCheckIn, setModalCheckIn] = useState(false);
  const [loadingCheckIn, setLoadingCheckIn] = useState(false);

  const [modalAusente, setModalAusente] = useState(false);
  const [loadingAusente, setLoadingAusente] = useState(false);

  const [modalCancelar, setModalCancelar] = useState(false);
  const [loadingCancelar, setLoadingCancelar] = useState(false);

  const pacienteModal = detalheChamado
    ? {
        id: detalheChamado.id,
        nome: detalheChamado.paciente.nome,
        nomePaciente: detalheChamado.paciente.nome,
        senha: detalheChamado.senha,
        prioridadeChamado: detalheChamado.prioridadeChamado as PrioridadeChamadoResponseAPI,
        statusChamado: detalheChamado.statusChamado
      }
    : null;

    console.log("AAAAAAAAAAA: ",pacienteModal)

  const handleConfirmarCheckIn = async () => {
    if (!detalheChamado) return;
    setLoadingCheckIn(true);
    try {
      await confirmarCheckIn(detalheChamado.id);
      setModalCheckIn(false);
      navigate("/recepcao");
    } catch (error) {
      console.error("Erro ao confirmar o Check-In do paciente", error);
      setToast("Erro ao confirmar check-in");
    } finally {
      setLoadingCheckIn(false);
    }
  };

  const handleConfirmarAusente = async () => {
    if (!detalheChamado) return;
    setLoadingAusente(true);
    try {
      await marcarPacienteComoAusente(detalheChamado.id);
      setModalAusente(false);
      navigate("/recepcao");
    } catch (error) {
      console.error("Erro ao marcar paciente como ausente", error);
      setToast("Erro ao marcar ausência");
    } finally {
      setLoadingAusente(false);
    }
  };

  const handleConfirmarCancelar = async () => {
    if (!detalheChamado) return;
    setLoadingCancelar(true);
    try {
      await cancelarChamado(detalheChamado.id);
      setModalCancelar(false);
      navigate("/recepcao");
    } catch (error) {
      console.error("Erro ao cancelar chamado", error);
      setToast("Erro ao cancelar chamado");
    } finally {
      setLoadingCancelar(false);
    }
  };

  const buscar = (raw: string) => {
    const c = raw.trim();
    if (!c) {
      setErro("Informe a senha ou código.");
      return;
    }
    navigate(`/recepcao/checkin/${c}`);
  };

  return (
    <PageShell
      title="Check-in de paciente"
      subtitle="Confirme a chegada física por leitura de QR Code ou senha digitada"
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ ...panelSx, p: 3 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              sx={{
                mb: 2,
                "& .MuiTab-root": { color: TEXT_DIM, minHeight: 44 },
                "& .Mui-selected": { color: "#60a5fa !important" },
                "& .MuiTabs-indicator": { backgroundColor: "#60a5fa" },
              }}
            >
              <Tab
                icon={<QrCodeScannerIcon />}
                iconPosition="start"
                label="QR Code"
              />
              <Tab
                icon={<KeyboardIcon />}
                iconPosition="start"
                label="Manual"
              />
            </Tabs>

            {tab === 0 && (
              <Box
                sx={{
                  border: `1.5px solid ${PANEL_BORDER}`,
                  borderRadius: 2,
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.04)",
                  minHeight: 280,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <QRScanner
                  onScan={(d: string) => {
                    setCodigo(d);
                    buscar(d);
                  }}
                />
              </Box>
            )}

            {tab === 1 && (
              <Stack spacing={2}>
                <TextField
                  label="Senha do chamado"
                  placeholder="Ex.: 10"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && buscar(codigo)}
                  fullWidth
                  autoFocus
                  slotProps={{ inputLabel: { sx: { color: TEXT_DIM } } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: TEXT,
                      "& fieldset": { borderColor: PANEL_BORDER },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  onClick={() => buscar(codigo)}
                >
                  Localizar paciente
                </Button>
              </Stack>
            )}

            {erro && (
              <Alert
                severity="warning"
                sx={{ mt: 2, bgcolor: "#3a2a0a", color: "#fcd34d" }}
              >
                {erro}
              </Alert>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ ...panelSx, p: 3, minHeight: 400 }}>
            {!detalheChamado ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  py: 6,
                  textAlign: "center",
                }}
              >
                <QrCodeScannerIcon
                  sx={{ fontSize: 64, color: PANEL_BORDER, mb: 2 }}
                />
                <Typography sx={{ color: TEXT, fontWeight: 600 }}>
                  Aguardando paciente
                </Typography>
                <Typography sx={{ color: TEXT_DIM, fontSize: 14, mt: 1 }}>
                  Escaneie o QR Code ou digite a senha para iniciar o check-in
                </Typography>
              </Box>
            ) : (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: TEXT_DIM,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Senha
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "monospace",
                        fontSize: 32,
                        fontWeight: 700,
                        color: "#60a5fa",
                      }}
                    >
                      {detalheChamado.senha}
                    </Typography>
                  </Box>

                  <Stack spacing={1} sx={{ alignItems: "flex-end" }}>
                    {detalheChamado?.prioridadeChamado && (
                      <PrioridadeTag
                        p={
                          detalheChamado.prioridadeChamado as PrioridadeChamadoResponseAPI
                        }
                      />
                    )}
                    <StatusBadge status={detalheChamado.statusChamado} />
                  </Stack>
                </Box>

                <Divider sx={{ borderColor: PANEL_BORDER, my: 2 }} />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field label="Nome" value={detalheChamado.paciente.nome} />
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Field
                      label="Idade"
                      value={`${detalheChamado.paciente.idade} anos`}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Field label="Sexo" value={detalheChamado.paciente.sexo} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field label="CPF" value={detalheChamado.paciente.cpf} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field
                      label="Tempo desde abertura"
                      value={formatTempo(
                        calcMinutos(detalheChamado.dataAbertura),
                      )}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Field
                      label="Queixa principal"
                      value={detalheChamado.queixa}
                    />
                  </Grid>

                  <Grid size={12}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: TEXT_DIM,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Sintomas relatados
                    </Typography>
                    <Box
                      sx={{
                        mt: 0.75,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.75,
                      }}
                    >
                      {detalheChamado.sintomas.map((sintoma, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "6px",
                            bgcolor: "#e0e7ff",
                            border: "1px solid #a5b4fc",
                            color: "#3730a3",
                            fontSize: 12,
                            fontWeight: 600,
                            lineHeight: 1.4,
                          }}
                        >
                          {sintoma.descricao}
                          <Box
                            component="span"
                            sx={{
                              ml: 0.75,
                              px: 0.75,
                              py: 0.1,
                              borderRadius: "4px",
                              bgcolor: "#c7d2fe",
                              color: "#312e81",
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            int. {sintoma.intensidade}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ borderColor: PANEL_BORDER, my: 3 }} />

                <Stack spacing={1.5}>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="success"
                    startIcon={<HowToRegIcon />}
                    onClick={() => setModalCheckIn(true)}
                    sx={{ fontWeight: 600, py: 1.4 }}
                  >
                    Confirmar check-in
                  </Button>

                  <Stack direction="row" spacing={1}>
                    <Button
                      fullWidth
                      size="medium"
                      variant="outlined"
                      startIcon={<CallSplitIcon />}
                      onClick={() =>
                        navigate(
                          `/recepcao/encaminhamento/${detalheChamado.id}`,
                        )
                      }
                      sx={{
                        color: "#2563eb",
                        borderColor: "#93c5fd",
                        bgcolor: "#eff6ff",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#2563eb",
                          bgcolor: "#dbeafe",
                        },
                      }}
                    >
                      Encaminhar
                    </Button>

                    <Button
                      fullWidth
                      size="medium"
                      variant="outlined"
                      startIcon={<PersonOffIcon />}
                      onClick={() => setModalAusente(true)}
                      sx={{
                        color: "#dc2626",
                        borderColor: "#fca5a5",
                        bgcolor: "#fff1f2",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#dc2626",
                          bgcolor: "#fee2e2",
                        },
                      }}
                    >
                      Ausente
                    </Button>

                    <Button
                      size="medium"
                      variant="outlined"
                      startIcon={<CloseIcon />}
                      onClick={() => setModalCancelar(true)}
                      sx={{
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        color: "#6b7280",
                        borderColor: "#d1d5db",
                        bgcolor: "transparent",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#9ca3af",
                          bgcolor: "#f3f4f6",
                        },
                      }}
                    >
                      Cancelar
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      <ModalConfirmarCheckIn
        open={modalCheckIn}
        onClose={() => !loadingCheckIn && setModalCheckIn(false)}
        onConfirmar={handleConfirmarCheckIn}
        paciente={pacienteModal}
        loading={loadingCheckIn}
      />

      <ModalConfirmarAusente
        open={modalAusente}
        onClose={() => !loadingAusente && setModalAusente(false)}
        onConfirmar={handleConfirmarAusente}
        paciente={pacienteModal}
        loading={loadingAusente}
      />

      <ModalCancelarChamado
        open={modalCancelar}
        onClose={() => !loadingCancelar && setModalCancelar(false)}
        onConfirmar={handleConfirmarCancelar}
        paciente={pacienteModal}
        loading={loadingCancelar}
      />

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
      >
        <Alert severity="error" variant="filled" onClose={() => setToast(null)}>
          {toast}
        </Alert>
      </Snackbar>
    </PageShell>
  );
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          color: TEXT_DIM,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontSize: 11,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ color: TEXT, fontWeight: 500, fontSize: 14, mt: 0.25 }}>
        {value}
      </Typography>
    </Box>
  );
}
