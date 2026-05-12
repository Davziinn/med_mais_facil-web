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
import { useNavigate } from "react-router-dom";

import {
  PageShell,
  PANEL_BORDER,
  panelSx,
  PresencaTag,
  PrioridadeTag,
  TEXT,
  TEXT_DIM,
} from "../_shared";

import { QRScanner } from "../../../components/QRScanner";


type RecepcaoChamado = {
  id: string;
  senha: string;
  prioridade: "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";
  presenca: "aguardando" | "presente" | "ausente";
  criadoEm: string;
  queixaPrincipal: string;
  sintomas: {
    nome: string;
    intensidade: number;
  }[];
  paciente: {
    nome: string;
    idade: number;
    sexo: "M" | "F";
    cpf: string;
  };
};

const mockItens: RecepcaoChamado[] = [
  {
    id: "ID-001",
    senha: "A001",
    prioridade: "ALTA",
    presenca: "aguardando",
    criadoEm: "2026-05-12T08:00:00",
    queixaPrincipal: "Dor no peito",
    sintomas: [
      { nome: "Dor", intensidade: 9 },
      { nome: "Falta de ar", intensidade: 7 },
    ],
    paciente: {
      nome: "João Pedro",
      idade: 42,
      sexo: "M",
      cpf: "123.456.789-00",
    },
  },
  {
    id: "ID-002",
    senha: "B145",
    prioridade: "MEDIA",
    presenca: "aguardando",
    criadoEm: "2026-05-12T09:10:00",
    queixaPrincipal: "Febre e dor de cabeça",
    sintomas: [
      { nome: "Febre", intensidade: 6 },
      { nome: "Dor de cabeça", intensidade: 5 },
    ],
    paciente: {
      nome: "Maria Clara",
      idade: 28,
      sexo: "F",
      cpf: "987.654.321-00",
    },
  },
];

function calcMinutos(data: string) {
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

  const [itens, setItens] = useState(mockItens);

  const [tab, setTab] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [encontrado, setEncontrado] = useState<RecepcaoChamado | null>(null);

  const [erro, setErro] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const buscar = (raw: string) => {
    setErro(null);

    const c = raw.trim().toUpperCase();

    if (!c) {
      setErro("Informe a senha ou código.");
      return;
    }

    const f = itens.find(
      (x) => x.senha.toUpperCase() === c || x.id.toUpperCase() === c,
    );

    if (!f) {
      setEncontrado(null);
      setErro(`Senha "${c}" não localizada no sistema.`);
      return;
    }

    setEncontrado(f);
  };

  const confirmar = () => {
    if (!encontrado) return;

    setItens((prev) =>
      prev.map((item) =>
        item.id === encontrado.id ? { ...item, presenca: "presente" } : item,
      ),
    );

    setEncontrado({
      ...encontrado,
      presenca: "presente",
    });

    setToast(`Check-in confirmado: ${encontrado.paciente.nome}`);

    setCodigo("");
  };

  const ausente = () => {
    if (!encontrado) return;

    setItens((prev) =>
      prev.map((item) =>
        item.id === encontrado.id ? { ...item, presenca: "ausente" } : item,
      ),
    );

    setEncontrado({
      ...encontrado,
      presenca: "ausente",
    });

    setToast(`Paciente marcado como ausente.`);
    setCodigo("");
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
                "& .MuiTab-root": {
                  color: TEXT_DIM,
                  minHeight: 44,
                },
                "& .Mui-selected": {
                  color: "#60a5fa !important",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#60a5fa",
                },
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
                  border: `2px dashed ${PANEL_BORDER}`,
                  borderRadius: 2,
                  p: 2,
                  bgcolor: "rgba(0,0,0,0.2)",
                  minHeight: 280,
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
                  placeholder="Ex.: A001"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && buscar(codigo)}
                  fullWidth
                  autoFocus
                  slotProps={{
                    inputLabel: {
                      sx: { color: TEXT_DIM },
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
                sx={{
                  mt: 2,
                  bgcolor: "#3a2a0a",
                  color: "#fcd34d",
                }}
              >
                {erro}
              </Alert>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              ...panelSx,
              p: 3,
              minHeight: 400,
            }}
          >
            {!encontrado ? (
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
                  sx={{
                    fontSize: 64,
                    color: PANEL_BORDER,
                    mb: 2,
                  }}
                />

                <Typography
                  sx={{
                    color: TEXT,
                    fontWeight: 600,
                  }}
                >
                  Aguardando paciente
                </Typography>

                <Typography
                  sx={{
                    color: TEXT_DIM,
                    fontSize: 14,
                    mt: 1,
                  }}
                >
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
                      {encontrado.senha}
                    </Typography>
                  </Box>

                  <Stack
                    spacing={1}
                    sx={{
                      alignItems: "flex-end",
                    }}
                  >
                    <PrioridadeTag p={encontrado.prioridade} />

                    <PresencaTag s={encontrado.presenca} />
                  </Stack>
                </Box>

                <Divider
                  sx={{
                    borderColor: PANEL_BORDER,
                    my: 2,
                  }}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field label="Nome" value={encontrado.paciente.nome} />
                  </Grid>

                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Field
                      label="Idade"
                      value={`${encontrado.paciente.idade} anos`}
                    />
                  </Grid>

                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Field
                      label="Sexo"
                      value={
                        encontrado.paciente.sexo === "M"
                          ? "Masculino"
                          : "Feminino"
                      }
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field label="CPF" value={encontrado.paciente.cpf} />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field
                      label="Tempo desde abertura"
                      value={formatTempo(calcMinutos(encontrado.criadoEm))}
                    />
                  </Grid>

                  <Grid size={12}>
                    <Field
                      label="Queixa principal"
                      value={encontrado.queixaPrincipal}
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

                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      sx={{
                        mt: 0.5,
                        flexWrap: "wrap",
                      }}
                    >
                      {encontrado.sintomas.map((s, i) => (
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
                          {s.nome} · int. {s.intensidade}
                        </Box>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>

                <Divider
                  sx={{
                    borderColor: PANEL_BORDER,
                    my: 3,
                  }}
                />

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={1.5}
                >
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="success"
                    startIcon={<HowToRegIcon />}
                    onClick={confirmar}
                    disabled={encontrado.presenca === "presente"}
                  >
                    Confirmar check-in
                  </Button>

                  <Button
                    size="large"
                    variant="outlined"
                    startIcon={<CallSplitIcon />}
                    sx={{
                      color: "#60a5fa",
                      borderColor: "#60a5fa66",
                    }}
                    onClick={() =>
                      navigate(`/recepcao/encaminhamento/${encontrado.id}`)
                    }
                  >
                    Encaminhar
                  </Button>

                  <Button
                    size="large"
                    variant="outlined"
                    startIcon={<PersonOffIcon />}
                    sx={{
                      color: "#f87171",
                      borderColor: "#f8717166",
                    }}
                    onClick={ausente}
                  >
                    Ausente
                  </Button>

                  <Button
                    size="large"
                    variant="text"
                    startIcon={<CloseIcon />}
                    sx={{ color: TEXT_DIM }}
                    onClick={() => setEncontrado(null)}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
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
