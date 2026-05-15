/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import CancelIcon from "@mui/icons-material/Cancel";
import FlagIcon from "@mui/icons-material/Flag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";

import {
  PageShell,
  panelSx,
  TEXT,
  PANEL_BORDER,
  TEXT_DIM,
  PrioridadeTag,
} from "../_shared";

import { useFilaEspera } from "../../../hooks/useFilaEspera";
import { useRecepcaoDashboard } from "../../../hooks/useRecepcaoDashboard";

import type { PrioridadeChamadoResponseAPI } from "../../../service/api/filaEsperaService";

import { ModalConfirmarAusente } from "../../../components/modais/ModalConfirmarAusente";
import { ModalCancelarChamado } from "../../../components/modais/ModalCancelarChamado";
import StatusBadge from "../../../components/StatusBadge";

type Prioridade = PrioridadeChamadoResponseAPI;

const PRIORIDADE_COR = {
  CRITICA: { dot: "#ef4444", label: "Emergência" },
  ALTA: { dot: "#f97316", label: "Urgente" },
  MEDIA: { dot: "#facc15", label: "Moderado" },
  BAIXA: { dot: "#22c55e", label: "Baixa" },
};

const FILTROS: { v: "todos" | Prioridade; label: string }[] = [
  { v: "todos", label: "Todos" },
  { v: "CRITICA", label: "Emergência" },
  { v: "ALTA", label: "Urgente" },
  { v: "MEDIA", label: "Moderado" },
  { v: "BAIXA", label: "Baixa" },
];

function formatTempo(min: number) {
  if (!min && min !== 0) return "0 min";

  if (min < 60) {
    return `${min} min`;
  }

  const h = Math.floor(min / 60);
  const m = min % 60;

  return `${h}h ${m}min`;
}

type PacienteModal = {
  id: number;
  nome: string;
  nomePaciente: string;
  senha: string;
  prioridadeChamado: PrioridadeChamadoResponseAPI;
  statusChamado: string;
};

export const RecepcaoFila = () => {
  const navigate = useNavigate();

  const { filaEspera } = useFilaEspera();

  const { marcarPacienteComoAusente, cancelarChamado } = useRecepcaoDashboard();

  const [filaLocal, setFilaLocal] = useState(filaEspera);

  const [busca, setBusca] = useState("");

  const [filtro, setFiltro] = useState<"todos" | Prioridade>("todos");

  const [toast, setToast] = useState<{
    msg: string;
    severity: "success" | "error";
  } | null>(null);

  const [prioMenu, setPrioMenu] = useState<{
    el: HTMLElement;
    id: number;
  } | null>(null);

  // Modal Ausente
  const [modalAusente, setModalAusente] = useState(false);

  const [loadingAusente, setLoadingAusente] = useState(false);

  const [pacienteAusente, setPacienteAusente] = useState<PacienteModal | null>(
    null,
  );

  // Modal Cancelar
  const [modalCancelar, setModalCancelar] = useState(false);

  const [loadingCancelar, setLoadingCancelar] = useState(false);

  const [pacienteCancelar, setPacienteCancelar] =
    useState<PacienteModal | null>(null);

  // Loading prioridade
  const [loadingPrio, setLoadingPrio] = useState(false);

  useEffect(() => {
    setFilaLocal(filaEspera);
  }, [filaEspera]);

  const lista = useMemo(() => {
    let r = filaLocal;

    if (filtro !== "todos") {
      r = r.filter((c) => c.prioridadeChamado === filtro);
    }

    if (busca.trim()) {
      const q = busca.toLowerCase();

      r = r.filter(
        (c) =>
          c.paciente.nome.toLowerCase().includes(q) ||
          c.senha.toLowerCase().includes(q),
      );
    }

    return r;
  }, [filaLocal, busca, filtro]);

  const buildPacienteModal = (
    c: (typeof filaLocal)[number],
  ): PacienteModal => ({
    id: c.id,
    nome: c.paciente.nome,
    nomePaciente: c.paciente.nome,
    senha: c.senha,
    prioridadeChamado: c.prioridadeChamado as PrioridadeChamadoResponseAPI,
    statusChamado: c.statusChamado,
  });

  const handleAbrirAusente = (c: (typeof filaLocal)[number]) => {
    setPacienteAusente(buildPacienteModal(c));
    setModalAusente(true);
  };

  const handleConfirmarAusente = async () => {
    if (!pacienteAusente) return;

    setLoadingAusente(true);

    try {
      await marcarPacienteComoAusente(pacienteAusente.id);

      setFilaLocal((prev) =>
        prev.filter((item) => item.id !== pacienteAusente.id),
      );

      setModalAusente(false);

      setToast({
        msg: "Paciente marcado como ausente.",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao marcar paciente como ausente", error);

      setToast({
        msg: "Erro ao marcar ausência.",
        severity: "error",
      });
    } finally {
      setLoadingAusente(false);
    }
  };

  const handleAbrirCancelar = (c: (typeof filaLocal)[number]) => {
    setPacienteCancelar(buildPacienteModal(c));
    setModalCancelar(true);
  };

  const handleConfirmarCancelar = async () => {
    if (!pacienteCancelar) return;

    setLoadingCancelar(true);

    try {
      await cancelarChamado(pacienteCancelar.id);

      setFilaLocal((prev) =>
        prev.filter((item) => item.id !== pacienteCancelar.id),
      );

      setModalCancelar(false);

      setToast({
        msg: "Atendimento cancelado.",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao cancelar chamado", error);

      setToast({
        msg: "Erro ao cancelar atendimento.",
        severity: "error",
      });
    } finally {
      setLoadingCancelar(false);
    }
  };

  const handleAlterarPrioridade = async (
    id: number,
    prioridade: Prioridade,
  ) => {
    setLoadingPrio(true);

    try {
      // await alterarPrioridade(id, prioridade);

      setToast({
        msg: `Prioridade alterada para ${PRIORIDADE_COR[prioridade].label}.`,
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao alterar prioridade", error);

      setToast({
        msg: "Erro ao alterar prioridade.",
        severity: "error",
      });
    } finally {
      setLoadingPrio(false);
      setPrioMenu(null);
    }
  };

  return (
    <PageShell
      title="Fila operacional"
      subtitle={`${filaLocal.length} pacientes na fila · atualizado em tempo real`}
    >
      <Box
        sx={{
          ...panelSx,
          mb: 3,
          p: 2,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          placeholder="Buscar por nome ou senha..."
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
            flex: 1,
            minWidth: 240,
            "& .MuiOutlinedInput-root": {
              color: TEXT,
              bgcolor: "rgba(0,0,0,0.2)",

              "& fieldset": {
                borderColor: PANEL_BORDER,
              },
            },
          }}
        />

        <ToggleButtonGroup
          value={filtro}
          exclusive
          size="small"
          onChange={(_, v) => v && setFiltro(v)}
          sx={{
            "& .MuiToggleButton-root": {
              color: TEXT_DIM,
              borderColor: PANEL_BORDER,
              textTransform: "none",
              px: 2,

              "&.Mui-selected": {
                bgcolor: "rgba(96,165,250,0.15)",
                color: "#60a5fa",
                borderColor: "#60a5fa66",
              },
            },
          }}
        >
          {FILTROS.map((f) => (
            <ToggleButton key={f.v} value={f.v}>
              {f.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box sx={panelSx}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "60px 1fr auto",
              md: "70px 110px 1fr 160px 140px 130px 200px",
            },
            gap: 2,
            px: 2.5,
            py: 1.5,
            borderBottom: `1px solid ${PANEL_BORDER}`,
            color: TEXT_DIM,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <Box>Pos.</Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>Senha</Box>

          <Box>Paciente</Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>Prioridade</Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>Status</Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>Espera</Box>

          <Box sx={{ textAlign: "right" }}>Ações</Box>
        </Box>

        {lista.length === 0 ? (
          <Box sx={{ p: 6, textAlign: "center", color: TEXT_DIM }}>
            Nenhum paciente na fila com os filtros atuais.
          </Box>
        ) : (
          lista.map((c, idx) => {
            const mins = c.tempoEspera;

            const longa = mins > 45;

            const cor = PRIORIDADE_COR[c.prioridadeChamado];

            return (
              <Box
                key={c.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "60px 1fr auto",
                    md: "70px 110px 1fr 160px 140px 130px 200px",
                  },
                  gap: 2,
                  px: 2.5,
                  py: 2,
                  alignItems: "center",
                  borderBottom: `1px solid ${PANEL_BORDER}`,
                  borderLeft: `3px solid ${cor.dot}`,

                  "&:last-child": {
                    borderBottom: 0,
                  },

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.02)",
                  },
                }}
              >
                <Box
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: TEXT,
                  }}
                >
                  #{idx + 1}
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#60a5fa",
                  }}
                >
                  {c.senha}
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: TEXT,
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {c.paciente.nome}
                  </Typography>

                  <Typography
                    sx={{
                      color: TEXT_DIM,
                      fontSize: 12,
                    }}
                  >
                    {c.paciente.idade}a · {c.queixa}
                  </Typography>
                </Box>

                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <PrioridadeTag p={c.prioridadeChamado} />
                </Box>

                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <StatusBadge status={c.statusChamado} />
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <AccessTimeIcon
                    sx={{
                      fontSize: 14,
                      color: longa ? "#fb7185" : TEXT_DIM,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: longa ? "#fb7185" : TEXT,
                      fontWeight: longa ? 700 : 500,
                    }}
                  >
                    {formatTempo(mins)}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={0.25}
                  sx={{ justifyContent: "flex-end" }}
                >
                  <Tooltip title="Alterar prioridade">
                    <IconButton
                      size="small"
                      sx={{ color: "#fcd34d" }}
                      onClick={(e) =>
                        setPrioMenu({
                          el: e.currentTarget,
                          id: c.id,
                        })
                      }
                    >
                      <FlagIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Marcar ausência">
                    <IconButton
                      size="small"
                      sx={{ color: "#f87171" }}
                      onClick={() => handleAbrirAusente(c)}
                    >
                      <PersonOffIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Encaminhar">
                    <IconButton
                      size="small"
                      sx={{ color: "#60a5fa" }}
                      onClick={() =>
                        navigate(`/recepcao/encaminhamento/${c.id}`)
                      }
                    >
                      <CallSplitIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Cancelar atendimento">
                    <IconButton
                      size="small"
                      sx={{ color: TEXT_DIM }}
                      onClick={() => handleAbrirCancelar(c)}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            );
          })
        )}
      </Box>

      <Menu
        anchorEl={prioMenu?.el}
        open={!!prioMenu}
        onClose={() => setPrioMenu(null)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#1a2540",
              color: TEXT,
              border: `1px solid ${PANEL_BORDER}`,
            },
          },
        }}
      >
        {(["CRITICA", "ALTA", "MEDIA", "BAIXA"] as Prioridade[]).map((p) => (
          <MenuItem
            key={p}
            disabled={loadingPrio}
            onClick={() => {
              if (prioMenu) {
                handleAlterarPrioridade(prioMenu.id, p);
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: PRIORIDADE_COR[p].dot,
                }}
              />

              {PRIORIDADE_COR[p].label}
            </Box>
          </MenuItem>
        ))}
      </Menu>

      <ModalConfirmarAusente
        open={modalAusente}
        onClose={() => !loadingAusente && setModalAusente(false)}
        onConfirmar={handleConfirmarAusente}
        paciente={pacienteAusente}
        loading={loadingAusente}
      />

      <ModalCancelarChamado
        open={modalCancelar}
        onClose={() => !loadingCancelar && setModalCancelar(false)}
        onConfirmar={handleConfirmarCancelar}
        paciente={pacienteCancelar}
        loading={loadingCancelar}
      />

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
