/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";

import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Stack,
  Divider,
  Button,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import CampaignIcon from "@mui/icons-material/Campaign";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";

import { useNavigate } from "react-router-dom";

import {
  PageShell,
  panelSx,
  PrioridadeTag,
  PresencaTag,
  TEXT,
  TEXT_DIM,
  PANEL_BORDER,
} from "./_shared";

/**
 * MOCK TEMPORÁRIO
 * depois você remove e conecta no backend
 */

type Prioridade = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";

type Presenca = "aguardando_checkin" | "presente" | "ausente";

type RecepcaoChamado = {
  id: string;
  senha: string;

  prioridade: Prioridade;

  presenca: Presenca;

  criadoEm: string;

  unidadeHospitalar: string;

  queixaPrincipal: string;

  paciente: {
    nome: string;
    cpf: string;
    idade: number;
    sexo: string;
    convenio?: string;
    telefone?: string;
  };
};

const mockItens: RecepcaoChamado[] = [
  {
    id: "1",
    senha: "A001",

    prioridade: "CRITICA",

    presenca: "presente",

    criadoEm: "2026-05-12T08:00:00",

    unidadeHospitalar: "Hospital Central",

    queixaPrincipal: "Dor no peito",

    paciente: {
      nome: "João Pedro",
      cpf: "123.456.789-00",
      idade: 56,
      sexo: "M",
      convenio: "Unimed",
      telefone: "(85) 99999-9999",
    },
  },

  {
    id: "2",
    senha: "A002",

    prioridade: "ALTA",

    presenca: "aguardando_checkin",

    criadoEm: "2026-05-12T08:20:00",

    unidadeHospitalar: "Hospital Norte",

    queixaPrincipal: "Febre alta",

    paciente: {
      nome: "Maria Clara",
      cpf: "987.654.321-00",
      idade: 31,
      sexo: "F",
      convenio: "Particular",
      telefone: "(85) 98888-8888",
    },
  },

  {
    id: "3",
    senha: "A003",

    prioridade: "MEDIA",

    presenca: "presente",

    criadoEm: "2026-05-12T09:00:00",

    unidadeHospitalar: "UPA Sul",

    queixaPrincipal: "Dor de cabeça",

    paciente: {
      nome: "Carlos Henrique",
      cpf: "741.852.963-00",
      idade: 42,
      sexo: "M",
      telefone: "(85) 97777-7777",
    },
  },

  {
    id: "4",
    senha: "A004",

    prioridade: "BAIXA",

    presenca: "ausente",

    criadoEm: "2026-05-12T09:30:00",

    unidadeHospitalar: "Hospital Central",

    queixaPrincipal: "Tosse leve",

    paciente: {
      nome: "Fernanda Lima",
      cpf: "111.222.333-44",
      idade: 24,
      sexo: "F",
      convenio: "Hapvida",
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

export const BuscaPaciente = () => {
  const navigate = useNavigate();

  const [itens, setItens] = useState<RecepcaoChamado[]>(mockItens);

  const [q, setQ] = useState("");

  const [sel, setSel] = useState<RecepcaoChamado | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  const buscarPorTexto = (busca: string) => {
    const termo = busca.toLowerCase();

    return itens.filter(
      (c) =>
        c.paciente.nome.toLowerCase().includes(termo) ||
        c.paciente.cpf.includes(termo) ||
        c.senha.toLowerCase().includes(termo) ||
        c.paciente.telefone?.includes(termo),
    );
  };

  const resultados = useMemo(() => {
    return q.trim() ? buscarPorTexto(q) : [];
  }, [q, itens]);

  const refresh = (id: string) => {
    setSel(itens.find((c) => c.id === id) ?? null);
  };

  const fazerCheckin = (id: string) => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              presenca: "presente",
            }
          : item,
      ),
    );
  };

  const chamarPaciente = (id: string) => {
  setItens((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            presenca: "presente",
          }
        : item
    )
  );

  setToast("Paciente chamado.");
};

  const marcarAusente = (id: string) => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              presenca: "ausente",
            }
          : item,
      ),
    );
  };

  const posicaoNaFila = (id: string) => {
    const presentes = itens.filter((i) => i.presenca === "presente");

    return presentes.findIndex((i) => i.id === id) + 1;
  };

  return (
    <PageShell
      title="Busca de paciente"
      subtitle="Localize rapidamente por nome, CPF, senha ou telefone"
    >
      <Box
        sx={{
          ...panelSx,
          p: 2.5,
          mb: 3,
        }}
      >
        <TextField
          autoFocus
          fullWidth
          placeholder="Digite nome, CPF ou senha..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
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
              fontSize: 18,
              bgcolor: "rgba(0,0,0,0.2)",

              "& fieldset": {
                borderColor: PANEL_BORDER,
              },

              "&:hover fieldset": {
                borderColor: "#60a5fa55",
              },
            },
          }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
            md: sel ? 6 : 12,
          }}
        >
          <Box sx={panelSx}>
            <Box sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: TEXT_DIM,
                  textTransform: "uppercase",

                  letterSpacing: "0.05em",

                  fontSize: 11,
                }}
              >
                {q.trim()
                  ? `${resultados.length} resultado(s)`
                  : "Resultados aparecerão aqui"}
              </Typography>
            </Box>

            <Divider
              sx={{
                borderColor: PANEL_BORDER,
              }}
            />

            {q.trim() === "" ? (
              <Box
                sx={{
                  p: 6,
                  textAlign: "center",
                }}
              >
                <PersonIcon
                  sx={{
                    fontSize: 48,
                    color: PANEL_BORDER,
                    mb: 1,
                  }}
                />

                <Typography
                  sx={{
                    color: TEXT_DIM,
                  }}
                >
                  Digite acima para buscar pacientes.
                </Typography>
              </Box>
            ) : resultados.length === 0 ? (
              <Box
                sx={{
                  p: 6,
                  textAlign: "center",
                  color: TEXT_DIM,
                }}
              >
                Nenhum paciente encontrado para "{q}".
              </Box>
            ) : (
              resultados.map((c) => (
                <Box
                  key={c.id}
                  onClick={() => setSel(c)}
                  sx={{
                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    px: 2.5,
                    py: 2,

                    cursor: "pointer",

                    borderBottom: `1px solid ${PANEL_BORDER}`,

                    "&:last-child": {
                      borderBottom: 0,
                    },

                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.03)",
                    },

                    bgcolor:
                      sel?.id === c.id
                        ? "rgba(96,165,250,0.08)"
                        : "transparent",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Chip
                      label={c.senha}
                      size="small"
                      sx={{
                        fontFamily: "monospace",

                        bgcolor: "rgba(96,165,250,0.15)",

                        color: "#60a5fa",

                        fontWeight: 700,
                      }}
                    />

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
                        CPF {c.paciente.cpf} · {c.paciente.idade}a
                      </Typography>
                    </Box>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <PrioridadeTag p={c.prioridade} />

                    <PresencaTag s={c.presenca} />
                  </Stack>
                </Box>
              ))
            )}
          </Box>
        </Grid>

        {sel && (
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box
              sx={{
                ...panelSx,
                p: 3,
              }}
            >
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
                    Detalhes do paciente
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      color: TEXT,
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {sel.paciente.nome}
                  </Typography>
                </Box>

                <Chip
                  label={sel.senha}
                  sx={{
                    fontFamily: "monospace",

                    bgcolor: "rgba(96,165,250,0.15)",

                    color: "#60a5fa",

                    fontWeight: 700,
                  }}
                />
              </Box>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={6}>
                  <Field label="CPF" value={sel.paciente.cpf} />
                </Grid>

                <Grid size={3}>
                  <Field label="Idade" value={`${sel.paciente.idade}a`} />
                </Grid>

                <Grid size={3}>
                  <Field label="Sexo" value={sel.paciente.sexo} />
                </Grid>

                <Grid size={6}>
                  <Field
                    label="Convênio"
                    value={sel.paciente.convenio ?? "Particular"}
                  />
                </Grid>

                <Grid size={6}>
                  <Field label="Unidade" value={sel.unidadeHospitalar} />
                </Grid>
              </Grid>

              <Divider
                sx={{
                  borderColor: PANEL_BORDER,
                  my: 2,
                }}
              />

              <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
                <PrioridadeTag p={sel.prioridade} />

                <PresencaTag s={sel.presenca} />
              </Stack>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <Field
                    label="Tempo desde abertura"
                    value={formatTempo(calcMinutos(sel.criadoEm))}
                  />
                </Grid>

                <Grid size={6}>
                  <Field
                    label="Posição na fila"
                    value={
                      sel.presenca === "presente" && posicaoNaFila(sel.id) > 0
                        ? `${posicaoNaFila(sel.id)}º`
                        : "—"
                    }
                  />
                </Grid>

                <Grid size={12}>
                  <Field label="Queixa principal" value={sel.queixaPrincipal} />
                </Grid>
              </Grid>

              <Divider
                sx={{
                  borderColor: PANEL_BORDER,
                  my: 3,
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{
                  flexWrap: "wrap",
                }}
              >
                {sel.presenca === "aguardando_checkin" && (
                  <Button
                    variant="contained"
                    startIcon={<HowToRegIcon />}
                    onClick={() => {
                      fazerCheckin(sel.id);

                      setToast("Check-in realizado.");

                      refresh(sel.id);
                    }}
                  >
                    Fazer check-in
                  </Button>
                )}

                {sel.presenca === "presente" && (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CampaignIcon />}
                    onClick={() => {
                      chamarPaciente(sel.id);

                      setToast("Paciente chamado.");

                      refresh(sel.id);
                    }}
                  >
                    Chamar paciente
                  </Button>
                )}

                <Button
                  variant="outlined"
                  startIcon={<CallSplitIcon />}
                  sx={{
                    color: "#60a5fa",
                    borderColor: "#60a5fa66",
                  }}
                  onClick={() => navigate(`/recepcao/encaminhamento/${sel.id}`)}
                >
                  Encaminhar
                </Button>

                {sel.presenca !== "ausente" && (
                  <Button
                    variant="outlined"
                    startIcon={<PersonOffIcon />}
                    sx={{
                      color: "#f87171",
                      borderColor: "#f8717166",
                    }}
                    onClick={() => {
                      marcarAusente(sel.id);

                      setToast("Marcado como ausente.");

                      refresh(sel.id);
                    }}
                  >
                    Marcar ausente
                  </Button>
                )}
              </Stack>
            </Box>
          </Grid>
        )}
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

      <Typography
        sx={{
          color: TEXT,
          fontWeight: 500,
          fontSize: 14,
          mt: 0.25,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
