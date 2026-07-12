import { useState } from "react";

import {
  Box,
  Grid,
  Typography,
  Stack,
  Divider,
  Button,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import CallSplitIcon from "@mui/icons-material/CallSplit";
import SearchIcon from "@mui/icons-material/Search";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { useNavigate, useParams } from "react-router-dom";
import {
  PageShell,
  panelSx,
  TEXT_DIM,
  TEXT,
  PANEL_BORDER,
  PrioridadeTag,
  PresencaTag,
} from "../_shared";
import { useFilaEspera } from "../../../hooks/useFilaEspera";
import { useDetalheChamado } from "../../../hooks/useDetalheChamado";
import { useEncaminharChamado } from "../../../hooks/useEncaminharChamado";
import { useEspecialidade } from "../../../hooks/useEspecialidade";
import type {
  PrioridadeChamadoResponseAPI,
  StatusChamadoResponseAPI,
} from "../../../service/api/filaEsperaService";
import type { EspecialidadeMedicoResponseDTO } from "../../../service/api/especialidadeService";

function calcMinutos(data: string | Date) {
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

export const Encaminhamento = () => {
  const { id } = useParams();
  const idNumber = Number(id);

  const navigate = useNavigate();

  const { filaEsperaRecepcao } = useFilaEspera();
  const { detalheChamado } = useDetalheChamado(idNumber);
  const { encaminharChamado } = useEncaminharChamado();
  const { especialidades } = useEspecialidade();

  const [especialidadeSelecionada, setEspecialidadeSelecionada] =
    useState<EspecialidadeMedicoResponseDTO | null>(null);
  const [busca, setBusca] = useState("");
  const [confirmando, setConfirmando] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    severity: "success" | "error";
  } | null>(null);


  // Sem ID na rota: exibe lista de pacientes da fila
  if (!id) {
    const filaFiltrada = filaEsperaRecepcao.filter((fila) =>
      fila.paciente.nome.toLowerCase().includes(busca.toLowerCase()),
    );

    return (
      <PageShell
        title="Encaminhamento"
        subtitle="Selecione um paciente da fila para encaminhar a um setor"
      >
        <Grid container spacing={3}>
          <Grid size={12}>
            <Box sx={{ ...panelSx, p: 2.5 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar paciente da fila..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: TEXT_DIM }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: TEXT,
                    "& fieldset": { borderColor: PANEL_BORDER },
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid size={12}>
            <Box sx={panelSx}>
              {filaFiltrada.length === 0 ? (
                <Box sx={{ p: 6, textAlign: "center", color: TEXT_DIM }}>
                  Nenhum paciente disponível.
                </Box>
              ) : (
                filaFiltrada.map((fila) => (
                  <Box
                    key={fila.id}
                    onClick={() =>
                      navigate(`/recepcao/encaminhamento/${fila.id}`)
                    }
                    sx={{
                      px: 2.5,
                      py: 2,
                      cursor: "pointer",
                      borderBottom: `1px solid ${PANEL_BORDER}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
                      "&:last-child": { borderBottom: 0 },
                    }}
                  >
                    <Box>
                      <Typography sx={{ color: TEXT, fontWeight: 600 }}>
                        {fila.senha} · {fila.paciente.nome}
                      </Typography>
                      <Typography sx={{ color: TEXT_DIM, fontSize: 12 }}>
                        {fila.queixa}
                      </Typography>
                    </Box>
                    <PrioridadeTag p={fila.prioridadeChamado} />
                  </Box>
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </PageShell>
    );
  }

  // Com ID mas detalhe ainda carregando
  if (!detalheChamado) {
    return (
      <PageShell
        title="Encaminhamento de paciente"
        subtitle="Direcione o paciente para o setor adequado"
        actions={
          <Button
            variant="text"
            sx={{ color: TEXT_DIM }}
            onClick={() => navigate("/recepcao/fila")}
          >
            ← Voltar para a fila
          </Button>
        }
      >
        <Box sx={{ p: 6, textAlign: "center", color: TEXT_DIM }}>
          Carregando dados do paciente...
        </Box>
      </PageShell>
    );
  }

  const confirmar = async () => {
    if (!especialidadeSelecionada) return;

    setConfirmando(true);
    try {
      await encaminharChamado(detalheChamado.id, {
        especialidadeId: especialidadeSelecionada.id,
      });

      setToast({
        msg: `Paciente encaminhado para ${especialidadeSelecionada.nome}.`,
        severity: "success",
      });

      setTimeout(() => navigate("/recepcao/fila"), 800);
    } catch {
      setToast({
        msg: "Erro ao encaminhar paciente. Tente novamente.",
        severity: "error",
      });
    } finally {
      setConfirmando(false);
    }
  };

  return (
    <PageShell
      title="Encaminhamento de paciente"
      subtitle="Direcione o paciente para o setor adequado"
      actions={
        <Button
          variant="text"
          sx={{ color: TEXT_DIM }}
          onClick={() => navigate("/recepcao/fila")}
        >
          ← Voltar para a fila
        </Button>
      }
    >
      <Grid container spacing={3}>
        {/* Painel do paciente */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ ...panelSx, p: 3 }}>
            <Typography
              variant="caption"
              sx={{
                color: TEXT_DIM,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Paciente
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: TEXT, fontWeight: 700, mt: 0.5 }}
            >
              {detalheChamado.paciente.nome}
            </Typography>

            <Typography sx={{ color: TEXT_DIM, fontSize: 13, mb: 2 }}>
              {detalheChamado.paciente.idade} anos ·{" "}
              {detalheChamado.paciente.sexo} · CPF {detalheChamado.paciente.cpf}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <PrioridadeTag
                p={
                  detalheChamado.prioridadeChamado as PrioridadeChamadoResponseAPI
                }
              />
              <PresencaTag
                s={detalheChamado.statusChamado as StatusChamadoResponseAPI}
              />
            </Stack>

            <Divider sx={{ borderColor: PANEL_BORDER, my: 2 }} />

            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: TEXT_DIM,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Queixa principal
                </Typography>
                <Typography sx={{ color: TEXT, fontSize: 14, mt: 0.5 }}>
                  {detalheChamado.queixa}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: TEXT_DIM,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Sintomas
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ mt: 1, flexWrap: "wrap" }}
                >
                  {detalheChamado.sintomas.map((sintoma, i) => (
                    <Box
                      key={i}
                      sx={{
                        px: 1.25,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: "rgba(214, 46, 46, 0.1)",
                        border: "1px solid rgba(177, 13, 13, 0.25)",
                        color: "#9e1a1a",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {sintoma.descricao}
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: TEXT_DIM,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Tempo de espera
                </Typography>
                <Typography
                  sx={{ color: TEXT, fontWeight: 600, fontSize: 18, mt: 0.5 }}
                >
                  {formatTempo(calcMinutos(detalheChamado.dataAbertura))}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Painel de especialidades */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ ...panelSx, p: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: TEXT, fontWeight: 600, mb: 0.5 }}
            >
              Selecionar especialidade de destino
            </Typography>

            <Typography sx={{ color: TEXT_DIM, fontSize: 13, mb: 3 }}>
              Escolha a especialidade para encaminhar o paciente
            </Typography>

            {especialidades.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress size={32} sx={{ color: "#60a5fa" }} />
              </Box>
            ) : (
              <Grid container spacing={2}>
                {especialidades.map((esp) => {
                  const ativo = especialidadeSelecionada?.id === esp.id;

                  return (
                    <Grid key={esp.id} size={{ xs: 12, sm: 6 }}>
                      <Box
                        onClick={() => setEspecialidadeSelecionada(esp)}
                        sx={{
                          p: 2.25,
                          borderRadius: 2,
                          cursor: "pointer",
                          bgcolor: ativo
                            ? "rgba(96,165,250,0.12)"
                            : "rgba(255,255,255,0.02)",
                          border: `1px solid ${ativo ? "#60a5fa" : PANEL_BORDER}`,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          transition: "all 0.15s",
                          "&:hover": {
                            borderColor: "#60a5fa66",
                            bgcolor: "rgba(96,165,250,0.06)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 1.5,
                            bgcolor: ativo
                              ? "#60a5fa"
                              : "rgba(96,165,250,0.15)",
                            color: ativo ? "#0b1220" : "#60a5fa",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <LocalHospitalIcon />
                        </Box>
                        <Typography
                          sx={{ color: TEXT, fontWeight: 600, fontSize: 14 }}
                        >
                          {esp.nome}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            )}

            <Divider sx={{ borderColor: PANEL_BORDER, my: 3 }} />

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ justifyContent: "flex-end" }}
            >
              <Button
                variant="text"
                sx={{ color: TEXT_DIM }}
                onClick={() => navigate(-1)}
                disabled={confirmando}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={
                  confirmando ? (
                    <CircularProgress size={16} sx={{ color: "inherit" }} />
                  ) : (
                    <CallSplitIcon />
                  )
                }
                disabled={!especialidadeSelecionada || confirmando}
                onClick={confirmar}
              >
                {confirmando ? "Encaminhando..." : "Confirmar encaminhamento"}
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={!!toast}
        autoHideDuration={2500}
        onClose={() => setToast(null)}
      >
        <Alert
          severity={toast?.severity ?? "success"}
          variant="filled"
          onClose={() => setToast(null)}
        >
          {toast?.msg}
        </Alert>
      </Snackbar>
    </PageShell>
  );
};
