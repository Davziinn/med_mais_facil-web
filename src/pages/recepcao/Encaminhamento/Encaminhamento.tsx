import { useMemo, useState } from "react";

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
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessibleIcon from "@mui/icons-material/Accessible";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate, useParams } from "react-router-dom";
import { PageShell, panelSx, TEXT_DIM, TEXT, PANEL_BORDER, PrioridadeTag, PresencaTag, PRIORIDADE_COR } from "../_shared";



/**
 * MOCK TEMPORÁRIO
 */

type Prioridade = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";

type Presenca = "aguardando_checkin" | "presente" | "ausente";

type Setor =
  | "clinico_geral"
  | "ortopedia"
  | "pediatria"
  | "triagem"
  | "observacao";

type Sintoma = {
  nome: string;
};

type RecepcaoChamado = {
  id: string;

  senha: string;

  prioridade: Prioridade;

  presenca: Presenca;

  criadoEm: string;

  chegouEm?: string;

  setor?: Setor;

  unidadeHospitalar: string;

  queixaPrincipal: string;

  sintomas: Sintoma[];

  paciente: {
    nome: string;
    cpf: string;
    idade: number;
    sexo: "M" | "F";
  };
};

const SETOR_LABEL: Record<Setor, string> = {
  clinico_geral: "Clínico Geral",

  ortopedia: "Ortopedia",

  pediatria: "Pediatria",

  triagem: "Triagem",

  observacao: "Observação",
};

const mockItens: RecepcaoChamado[] = [
  {
    id: "1",

    senha: "A001",

    prioridade: "CRITICA",

    presenca: "presente",

    criadoEm: "2026-05-12T08:00:00",

    chegouEm: "2026-05-12T08:05:00",

    setor: "triagem",

    unidadeHospitalar: "Hospital Central",

    queixaPrincipal: "Dor intensa no peito",

    sintomas: [{ nome: "Falta de ar" }, { nome: "Tontura" }],

    paciente: {
      nome: "João Pedro",
      cpf: "123.456.789-00",
      idade: 56,
      sexo: "M",
    },
  },

  {
    id: "2",

    senha: "A002",

    prioridade: "ALTA",

    presenca: "aguardando_checkin",

    criadoEm: "2026-05-12T08:30:00",

    unidadeHospitalar: "Hospital Norte",

    queixaPrincipal: "Febre alta",

    sintomas: [{ nome: "Calafrios" }, { nome: "Dor no corpo" }],

    paciente: {
      nome: "Maria Clara",
      cpf: "987.654.321-00",
      idade: 31,
      sexo: "F",
    },
  },

  {
    id: "3",

    senha: "A003",

    prioridade: "MEDIA",

    presenca: "presente",

    criadoEm: "2026-05-12T09:00:00",

    chegouEm: "2026-05-12T09:10:00",

    unidadeHospitalar: "UPA Sul",

    queixaPrincipal: "Dor de cabeça",

    sintomas: [{ nome: "Enjoo" }],

    paciente: {
      nome: "Carlos Henrique",
      cpf: "741.852.963-00",
      idade: 42,
      sexo: "M",
    },
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

const SETORES: {
  v: Setor;
  icon: React.ReactNode;
  descr: string;
}[] = [
  {
    v: "clinico_geral",

    icon: <LocalHospitalIcon />,

    descr: "Atendimento médico geral",
  },

  {
    v: "ortopedia",

    icon: <AccessibleIcon />,

    descr: "Lesões, fraturas e traumas",
  },

  {
    v: "pediatria",

    icon: <ChildCareIcon />,

    descr: "Atendimento infantil",
  },

  {
    v: "triagem",

    icon: <MedicalServicesIcon />,

    descr: "Avaliação inicial",
  },

  {
    v: "observacao",

    icon: <VisibilityIcon />,

    descr: "Sala de observação",
  },
];

export const Encaminhamento = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [itens, setItens] = useState(mockItens);

  const fila = itens.filter((i) => i.presenca === "presente");

  const paciente = itens.find((c) => c.id === id);

  const [setor, setSetor] = useState<Setor | null>(paciente?.setor ?? null);

  const [busca, setBusca] = useState("");

  const [toast, setToast] = useState<string | null>(null);

  const candidatos = useMemo(() => {
    if (!busca.trim()) {
      return fila;
    }

    const q = busca.toLowerCase();

    return fila.filter(
      (c) =>
        c.paciente.nome.toLowerCase().includes(q) ||
        c.senha.toLowerCase().includes(q),
    );
  }, [fila, busca]);

  const encaminhar = (pacienteId: string, novoSetor: Setor) => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === pacienteId
          ? {
              ...item,
              setor: novoSetor,
            }
          : item,
      ),
    );
  };

  if (!paciente) {
    return (
      <PageShell
        title="Encaminhamento"
        subtitle="Selecione um paciente da fila para encaminhar a um setor"
      >
        <Grid container spacing={3}>
          <Grid size={12}>
            <Box
              sx={{
                ...panelSx,
                p: 2.5,
              }}
            >
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
                  "& .MuiOutlinedInput-root": {
                    color: TEXT,

                    "& fieldset": {
                      borderColor: PANEL_BORDER,
                    },
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid size={12}>
            <Box sx={panelSx}>
              {candidatos.length === 0 ? (
                <Box
                  sx={{
                    p: 6,
                    textAlign: "center",

                    color: TEXT_DIM,
                  }}
                >
                  Nenhum paciente disponível.
                </Box>
              ) : (
                candidatos.map((c) => (
                  <Box
                    key={c.id}
                    onClick={() => navigate(`/recepcao/encaminhamento/${c.id}`)}
                    sx={{
                      px: 2.5,
                      py: 2,

                      cursor: "pointer",

                      borderBottom: `1px solid ${PANEL_BORDER}`,

                      borderLeft: `3px solid ${PRIORIDADE_COR[c.prioridade].dot}`,

                      display: "flex",

                      justifyContent: "space-between",

                      alignItems: "center",

                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.03)",
                      },

                      "&:last-child": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: TEXT,

                          fontWeight: 600,
                        }}
                      >
                        {c.senha} · {c.paciente.nome}
                      </Typography>

                      <Typography
                        sx={{
                          color: TEXT_DIM,

                          fontSize: 12,
                        }}
                      >
                        {c.queixaPrincipal}
                      </Typography>
                    </Box>

                    <PrioridadeTag p={c.prioridade} />
                  </Box>
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </PageShell>
    );
  }

  const confirmar = () => {
    if (!setor) {
      return;
    }

    encaminhar(paciente.id, setor);

    setToast(`Paciente encaminhado para ${SETOR_LABEL[setor]}.`);

    setTimeout(() => {
      navigate("/recepcao/fila");
    }, 800);
  };

  return (
    <PageShell
      title="Encaminhamento de paciente"
      subtitle="Direcione o paciente para o setor adequado"
      actions={
        <Button
          variant="text"
          sx={{
            color: TEXT_DIM,
          }}
          onClick={() => navigate("/recepcao/fila")}
        >
          ← Voltar para a fila
        </Button>
      }
    >
      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <Box
            sx={{
              ...panelSx,
              p: 3,
            }}
          >
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
              sx={{
                color: TEXT,
                fontWeight: 700,
                mt: 0.5,
              }}
            >
              {paciente.paciente.nome}
            </Typography>

            <Typography
              sx={{
                color: TEXT_DIM,
                fontSize: 13,
                mb: 2,
              }}
            >
              {paciente.paciente.idade} anos ·{" "}
              {paciente.paciente.sexo === "M" ? "Masculino" : "Feminino"} · CPF{" "}
              {paciente.paciente.cpf}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 2,
              }}
            >
              <PrioridadeTag p={paciente.prioridade} />

              <PresencaTag s={paciente.presenca} />
            </Stack>

            <Divider
              sx={{
                borderColor: PANEL_BORDER,

                my: 2,
              }}
            />

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

                <Typography
                  sx={{
                    color: TEXT,
                    fontSize: 14,
                    mt: 0.5,
                  }}
                >
                  {paciente.queixaPrincipal}
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
                  sx={{
                    mt: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {paciente.sintomas.map((s, i) => (
                    <Box
                      key={i}
                      sx={{
                        px: 1.25,
                        py: 0.5,

                        borderRadius: 1,

                        bgcolor: "rgba(96,165,250,0.1)",

                        border: "1px solid rgba(96,165,250,0.25)",

                        color: "#bfdbfe",

                        fontSize: 12,

                        fontWeight: 500,
                      }}
                    >
                      {s.nome}
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
                  sx={{
                    color: TEXT,
                    fontWeight: 600,
                    fontSize: 18,
                    mt: 0.5,
                  }}
                >
                  {formatTempo(
                    calcMinutos(paciente.chegouEm ?? paciente.criadoEm),
                  )}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 7,
          }}
        >
          <Box
            sx={{
              ...panelSx,
              p: 3,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: TEXT,
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              Selecionar setor de destino
            </Typography>

            <Typography
              sx={{
                color: TEXT_DIM,
                fontSize: 13,
                mb: 3,
              }}
            >
              Escolha um setor para encaminhar o paciente
            </Typography>

            <Grid container spacing={2}>
              {SETORES.map((s) => {
                const ativo = setor === s.v;

                return (
                  <Grid
                    key={s.v}
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <Box
                      onClick={() => setSetor(s.v)}
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

                          bgcolor: ativo ? "#60a5fa" : "rgba(96,165,250,0.15)",

                          color: ativo ? "#0b1220" : "#60a5fa",

                          display: "flex",

                          alignItems: "center",

                          justifyContent: "center",
                        }}
                      >
                        {s.icon}
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            color: TEXT,

                            fontWeight: 600,

                            fontSize: 14,
                          }}
                        >
                          {SETOR_LABEL[s.v]}
                        </Typography>

                        <Typography
                          sx={{
                            color: TEXT_DIM,

                            fontSize: 12,
                          }}
                        >
                          {s.descr}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>

            <Divider
              sx={{
                borderColor: PANEL_BORDER,

                my: 3,
              }}
            />

            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="text"
                sx={{
                  color: TEXT_DIM,
                }}
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>

              <Button
                variant="contained"
                size="large"
                startIcon={<CallSplitIcon />}
                disabled={!setor}
                onClick={confirmar}
              >
                Confirmar encaminhamento
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
          severity="success"
          variant="filled"
          onClose={() => setToast(null)}
        >
          {toast}
        </Alert>
      </Snackbar>
    </PageShell>
  );
}
