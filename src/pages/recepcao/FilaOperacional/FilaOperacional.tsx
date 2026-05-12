import { useMemo, useState } from "react";

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
import CampaignIcon from "@mui/icons-material/Campaign";
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

type Prioridade = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";

type StatusFila = "EM_ESPERA" | "FINALIZADO" | "EM_ATENDIMENTO" | "CANCELADO";

type PacienteFila = {
  id: string;
  senha: string;
  prioridade: Prioridade;
  status: StatusFila;
  criadoEm: string;
  chegouEm?: string;
  queixaPrincipal: string;

  paciente: {
    nome: string;
    idade: number;
  };
};

const mockFila: PacienteFila[] = [
  {
    id: "1",
    senha: "A001",
    prioridade: "CRITICA",
    status: "EM_ESPERA",
    criadoEm: "2026-05-12T08:00:00",
    chegouEm: "2026-05-12T08:10:00",
    queixaPrincipal: "Dor no peito",

    paciente: {
      nome: "João Pedro",
      idade: 56,
    },
  },

  {
    id: "2",
    senha: "A002",
    prioridade: "ALTA",
    status: "FINALIZADO",
    criadoEm: "2026-05-12T08:20:00",
    chegouEm: "2026-05-12T08:25:00",
    queixaPrincipal: "Febre alta",

    paciente: {
      nome: "Maria Clara",
      idade: 29,
    },
  },

  {
    id: "3",
    senha: "A003",
    prioridade: "MEDIA",
    status: "EM_ESPERA",
    criadoEm: "2026-05-12T09:00:00",
    chegouEm: "2026-05-12T09:02:00",
    queixaPrincipal: "Dor de cabeça",

    paciente: {
      nome: "Carlos Henrique",
      idade: 38,
    },
  },

  {
    id: "4",
    senha: "A004",
    prioridade: "BAIXA",
    status: "EM_ATENDIMENTO",
    criadoEm: "2026-05-12T09:15:00",
    chegouEm: "2026-05-12T09:20:00",
    queixaPrincipal: "Tosse leve",

    paciente: {
      nome: "Fernanda Lima",
      idade: 21,
    },
  },
];

const PRIORIDADE_COR = {
  CRITICA: {
    dot: "#ef4444",
    label: "Emergência",
  },

  ALTA: {
    dot: "#f97316",
    label: "Urgente",
  },

  MEDIA: {
    dot: "#facc15",
    label: "Moderado",
  },

  BAIXA: {
    dot: "#22c55e",
    label: "Baixa",
  },
};

const FILTROS: {
  v: "todos" | Prioridade;
  label: string;
}[] = [
  {
    v: "todos",
    label: "Todos",
  },

  {
    v: "CRITICA",
    label: "Emergência",
  },

  {
    v: "ALTA",
    label: "Urgente",
  },

  {
    v: "MEDIA",
    label: "Moderado",
  },

  {
    v: "BAIXA",
    label: "Baixa",
  },
];

function calcMinutos(data: string) {
  const agora = new Date().getTime();

  const criado = new Date(data).getTime();

  return Math.floor((agora - criado) / 1000 / 60);
}

function formatTempo(min: number) {
  if (min < 60) {
    return `${min} min`;
  }

  const h = Math.floor(min / 60);

  const m = min % 60;

  return `${h}h ${m}min`;
}

export const RecepcaoFila = () => {
  const navigate = useNavigate();

  const [fila, setFila] = useState<PacienteFila[]>(mockFila);

  const [busca, setBusca] = useState("");

  const [filtro, setFiltro] = useState<"todos" | Prioridade>("todos");

  const [toast, setToast] = useState<string | null>(null);

  const [prioMenu, setPrioMenu] = useState<{
    el: HTMLElement;
    id: string;
  } | null>(null);

  const lista = useMemo(() => {
    let r = fila;

    if (filtro !== "todos") {
      r = r.filter((c) => c.prioridade === filtro);
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
  }, [fila, busca, filtro]);

  const chamarPaciente = (id: string) => {
    setFila((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "EM_ATENDIMENTO",
            }
          : item,
      ),
    );
  };

  const marcarAusente = (id: string) => {
    setFila((prev) => prev.filter((item) => item.id !== id));
  };

  const cancelar = (id: string) => {
    setFila((prev) => prev.filter((item) => item.id !== id));
  };

  const alterarPrioridade = (id: string, prioridade: Prioridade) => {
    setFila((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              prioridade,
            }
          : item,
      ),
    );
  };

  const act = (label: string, fn: () => void) => {
    fn();

    setToast(label);
  };

  return (
    <PageShell
      title="Fila operacional"
      subtitle={`${fila.length} pacientes na fila · atualizado em tempo real`}
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
                  <SearchIcon
                    sx={{
                      color: TEXT_DIM,
                    }}
                  />
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

          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            Senha
          </Box>

          <Box>Paciente</Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            Prioridade
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            Status
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            Espera
          </Box>

          <Box sx={{ textAlign: "right" }}>Ações</Box>
        </Box>

        {lista.length === 0 ? (
          <Box
            sx={{
              p: 6,
              textAlign: "center",
              color: TEXT_DIM,
            }}
          >
            Nenhum paciente na fila com os filtros atuais.
          </Box>
        ) : (
          lista.map((c, idx) => {
            const mins = calcMinutos(c.chegouEm ?? c.criadoEm);

            const longa = mins > 45;

            const cor = PRIORIDADE_COR[c.prioridade];

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
                    display: {
                      xs: "none",
                      md: "block",
                    },

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
                    {c.paciente.idade}a · {c.queixaPrincipal}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  <PrioridadeTag p={c.prioridade} />
                </Box>

                <Box
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color:
                        c.status === "EM_ATENDIMENTO" ? "#34d399" : "#fcd34d",

                      fontSize: 13,

                      fontWeight: 500,
                    }}
                  >
                    {c.status === "EM_ATENDIMENTO"
                      ? "Em atendimento"
                      : c.status === "EM_ESPERA"
                        ? "Em espera"
                        : "Aguardando"}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: {
                      xs: "none",
                      md: "flex",
                    },

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
                  sx={{
                    justifyContent: "flex-end",
                  }}
                >
                  <Tooltip title="Chamar">
                    <IconButton
                      size="small"
                      sx={{
                        color: "#34d399",
                      }}
                      onClick={() =>
                        act("Paciente chamado.", () => chamarPaciente(c.id))
                      }
                    >
                      <CampaignIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Alterar prioridade">
                    <IconButton
                      size="small"
                      sx={{
                        color: "#fcd34d",
                      }}
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
                      sx={{
                        color: "#f87171",
                      }}
                      onClick={() =>
                        act("Paciente marcado como ausente.", () =>
                          marcarAusente(c.id),
                        )
                      }
                    >
                      <PersonOffIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Encaminhar">
                    <IconButton
                      size="small"
                      sx={{
                        color: "#60a5fa",
                      }}
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
                      sx={{
                        color: TEXT_DIM,
                      }}
                      onClick={() =>
                        act("Atendimento cancelado.", () => cancelar(c.id))
                      }
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
            onClick={() => {
              if (prioMenu) {
                act(
                  `Prioridade alterada para ${PRIORIDADE_COR[p].label}.`,
                  () => alterarPrioridade(prioMenu.id, p),
                );
              }

              setPrioMenu(null);
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

      <Snackbar
        open={!!toast}
        autoHideDuration={2500}
        onClose={() => setToast(null)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setToast(null)}
        >
          {toast}
        </Alert>
      </Snackbar>
    </PageShell>
  );
};
