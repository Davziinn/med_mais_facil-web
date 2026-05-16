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
import CallSplitIcon from "@mui/icons-material/CallSplit";
// import CampaignIcon from "@mui/icons-material/Campaign";
import PersonIcon from "@mui/icons-material/Person";

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

import { useFilaEspera } from "../../hooks/useFilaEspera";
import type {
  FilaEsperaResponseDTO,
  StatusChamadoResponseAPI,
  PrioridadeChamadoResponseAPI,
} from "../../service/api/filaEsperaService";

type Prioridade = PrioridadeChamadoResponseAPI;
type Presenca = "aguardando_checkin" | "presente" | "ausente";

type RecepcaoChamado = {
  id: string;
  senha: string;
  prioridade: Prioridade;
  presenca: Presenca;
  tempoEspera: number;
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

function mapStatus(status: StatusChamadoResponseAPI): Presenca {
  switch (status) {
    case "AGUARDANDO_CHECKIN":
      return "aguardando_checkin";
    case "EM_ESPERA":
    case "EM_ATENDIMENTO":
      return "presente";
    case "AUSENTE":
    case "FINALIZADO":
    case "CANCELADO":
      return "ausente";
  }
}

function mapFilaToItem(f: FilaEsperaResponseDTO): RecepcaoChamado {
  return {
    id: String(f.id),
    senha: f.senha,
    prioridade: f.prioridadeChamado,
    presenca: mapStatus(f.statusChamado),
    tempoEspera: f.tempoEspera,
    queixaPrincipal: f.queixa,
    paciente: {
      nome: f.paciente.nome,
      cpf: f.paciente.cpf,
      idade: f.paciente.idade,
      sexo: f.paciente.sexo,
    },
  };
}

function formatTempo(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}min`;
}

export const BuscaPaciente = () => {
  const navigate = useNavigate();

  const { filaEspera } = useFilaEspera();

  const [q, setQ] = useState("");
  const [sel, setSel] = useState<RecepcaoChamado | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const todos: RecepcaoChamado[] = useMemo(
    () => filaEspera.map(mapFilaToItem),
    [filaEspera],
  );

  const resultados: RecepcaoChamado[] = useMemo(() => {
    const termo = q.trim().toLowerCase();
    if (!termo) return [];
    return todos.filter(
      (c) =>
        c.paciente.nome.toLowerCase().includes(termo) ||
        c.paciente.cpf.includes(termo) ||
        c.senha.toLowerCase().includes(termo),
    );
  }, [todos, q]);

  const selAtualizado = useMemo(
    () => (sel ? (todos.find((c) => c.id === sel.id) ?? sel) : null),
    [todos, sel],
  );

  const posicaoNaFila = (id: string) => {
    const presentes = todos.filter((i) => i.presenca === "presente");
    return presentes.findIndex((i) => i.id === id) + 1;
  };

  // const chamarPaciente = (_id: string) => setToast("Paciente chamado.");

  return (
    <PageShell
      title="Busca de paciente"
      subtitle="Localize rapidamente por nome, CPF ou senha"
    >
      <Box sx={{ ...panelSx, p: 2.5, mb: 3 }}>
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
                  <SearchIcon sx={{ color: TEXT_DIM }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: TEXT,
              fontSize: 18,
              "& fieldset": { borderColor: PANEL_BORDER },
              "&:hover fieldset": { borderColor: "#60a5fa55" },
            },
          }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: selAtualizado ? 6 : 12 }}>
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

            <Divider sx={{ borderColor: PANEL_BORDER }} />

            {q.trim() === "" ? (
              <Box sx={{ p: 6, textAlign: "center" }}>
                <PersonIcon sx={{ fontSize: 48, color: PANEL_BORDER, mb: 1 }} />
                <Typography sx={{ color: TEXT_DIM }}>
                  Digite acima para buscar pacientes.
                </Typography>
              </Box>
            ) : resultados.length === 0 ? (
              <Box sx={{ p: 6, textAlign: "center", color: TEXT_DIM }}>
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
                    "&:last-child": { borderBottom: 0 },
                    "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
                    bgcolor:
                      selAtualizado?.id === c.id
                        ? "rgba(96,165,250,0.08)"
                        : "transparent",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                        sx={{ color: TEXT, fontWeight: 600, fontSize: 14 }}
                      >
                        {c.paciente.nome}
                      </Typography>
                      <Typography sx={{ color: TEXT_DIM, fontSize: 12 }}>
                        CPF {c.paciente.cpf} · {c.paciente.idade}a
                      </Typography>
                    </Box>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <PrioridadeTag p={c.prioridade} />
                    <PresencaTag s={c.presenca} />
                  </Stack>
                </Box>
              ))
            )}
          </Box>
        </Grid>

        {selAtualizado && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ ...panelSx, p: 3 }}>
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
                    sx={{ color: TEXT, fontWeight: 700, mt: 0.5 }}
                  >
                    {selAtualizado.paciente.nome}
                  </Typography>
                </Box>

                <Chip
                  label={selAtualizado.senha}
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
                  <Field label="CPF" value={selAtualizado.paciente.cpf} />
                </Grid>
                <Grid size={3}>
                  <Field
                    label="Idade"
                    value={`${selAtualizado.paciente.idade}a`}
                  />
                </Grid>
                <Grid size={3}>
                  <Field label="Sexo" value={selAtualizado.paciente.sexo} />
                </Grid>
                <Grid size={6}>
                  <Field
                    label="Convênio"
                    value={selAtualizado.paciente.convenio ?? "Particular"}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ borderColor: PANEL_BORDER, my: 2 }} />

              <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
                <PrioridadeTag p={selAtualizado.prioridade} />
                <PresencaTag s={selAtualizado.presenca} />
              </Stack>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <Field
                    label="Tempo de espera"
                    value={formatTempo(selAtualizado.tempoEspera)}
                  />
                </Grid>
                <Grid size={6}>
                  <Field
                    label="Posição na fila"
                    value={
                      selAtualizado.presenca === "presente" &&
                      posicaoNaFila(selAtualizado.id) > 0
                        ? `${posicaoNaFila(selAtualizado.id)}º`
                        : "—"
                    }
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    label="Queixa principal"
                    value={selAtualizado.queixaPrincipal}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ borderColor: PANEL_BORDER, my: 3 }} />

              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ flexWrap: "wrap" }}
              >
                {/* {selAtualizado.presenca === "presente" && (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CampaignIcon />}
                    onClick={() => chamarPaciente(selAtualizado.id)}
                  >
                    Chamar paciente
                  </Button>
                )} */}

                <Button
                  variant="outlined"
                  startIcon={<CallSplitIcon />}
                  sx={{ color: "#60a5fa", borderColor: "#60a5fa66" }}
                  onClick={() =>
                    navigate(`/recepcao/encaminhamento/${selAtualizado.id}`)
                  }
                >
                  Encaminhar
                </Button>
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
