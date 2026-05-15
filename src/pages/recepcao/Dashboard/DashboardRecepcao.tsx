/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import CampaignIcon from "@mui/icons-material/Campaign";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useNavigate } from "react-router-dom";
import {
  panelSx,
  TEXT_DIM,
  TEXT,
  PageShell,
  PANEL_BORDER,
  PrioridadeTag,
} from "../_shared";

import { useFilaEspera } from "../../../hooks/useFilaEspera";
import { useRecepcaoDashboard } from "../../../hooks/useRecepcaoDashboard";
import { extrairApenasHoras } from "../../../utils/FormataTempo";
import { ModalConfirmarAusente } from "../../../components/modais/ModalConfirmarAusente";
import type { PrioridadeChamadoResponseAPI } from "../../../service/api/filaEsperaService";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <Box
      sx={{ ...panelSx, p: 2.5, display: "flex", alignItems: "center", gap: 2 }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: `${color}22`,
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: TEXT_DIM,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            fontSize: 11,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: TEXT, fontWeight: 700, lineHeight: 1.1, mt: 0.5 }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

function formatTempo(min: number) {
  if (!min && min !== 0) return "0 min";
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}min`;
}

interface ModalAusenteState {
  open: boolean;
  paciente: {
    id: number;
    nomePaciente: string;
    senha: string;
    prioridadeChamado: PrioridadeChamadoResponseAPI;
  } | null;
}

export const DashboardRecepcao = () => {
  const navigate = useNavigate();

  const { filaEspera, carregarFilaEspera } = useFilaEspera();
  const {
    metricas,
    carregarMetricas,
    filaCheckIn,
    carregarFilaAguardandoCheckIn,
    marcarPacienteComoAusente,
  } = useRecepcaoDashboard();

  const [modalAusente, setModalAusente] = useState<ModalAusenteState>({
    open: false,
    paciente: null,
  });
  const [loadingAusente, setLoadingAusente] = useState(false);

  const handleAbrirModalAusente = (paciente: ModalAusenteState["paciente"]) => {
    setModalAusente({ open: true, paciente });
  };

  const handleFecharModalAusente = () => {
    if (loadingAusente) return;
    setModalAusente({ open: false, paciente: null });
  };

  const handleConfirmarAusente = async () => {
    if (!modalAusente.paciente) return;

    setLoadingAusente(true);

    await marcarPacienteComoAusente(modalAusente.paciente.id);

    await Promise.all([
      carregarFilaEspera(),
      carregarFilaAguardandoCheckIn(),
      carregarMetricas(),
    ]);

    setLoadingAusente(false);

    setModalAusente({
      open: false,
      paciente: null,
    });
  };

  useEffect(() => {
    carregarMetricas();
    carregarFilaAguardandoCheckIn();
  }, []);

  const fila = filaEspera.filter(
    (c) =>
      c.statusChamado === "EM_ESPERA" || c.statusChamado === "EM_ATENDIMENTO",
  );

  return (
    <PageShell
      title="Painel da Recepção"
      subtitle="Visão geral do fluxo operacional do pronto atendimento"
      actions={
        <Tooltip title="Atualizar">
          <IconButton
            sx={{ color: TEXT_DIM, border: `1px solid ${PANEL_BORDER}` }}
            onClick={carregarFilaEspera}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      }
    >
      {/* STATS */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<HowToRegIcon />}
            label="Aguardando check-in"
            value={metricas?.aguardandoCheckin || 0}
            color="#60a5fa"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<HourglassTopIcon />}
            label="Aguardando atendimento"
            value={metricas?.aguardando || 0}
            color="#fcd34d"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<PersonOffIcon />}
            label="Pacientes ausentes"
            value={metricas?.ausentes || 0}
            color="#f87171"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<AccessTimeIcon />}
            label="Tempo médio de espera"
            value={
              metricas?.tempoMedioEspera
                ? `${extrairApenasHoras(metricas.tempoMedioEspera)}m`
                : "0m"
            }
            color="#34d399"
          />
        </Grid>
      </Grid>

      {/* FILA ATUAL */}
      <Box sx={{ ...panelSx }}>
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: TEXT }}
            >
              Fila atual
            </Typography>
            <Typography variant="caption" sx={{ color: TEXT_DIM }}>
              Ordenada por prioridade clínica e tempo de espera
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              sx={{ color: TEXT, borderColor: PANEL_BORDER }}
              onClick={() => navigate("/recepcao/checkin")}
            >
              Novo check-in
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => navigate("/recepcao/fila")}
            >
              Ver fila completa
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: PANEL_BORDER }} />

        {fila.length === 0 ? (
          <Box sx={{ p: 5, textAlign: "center" }}>
            <Typography sx={{ color: TEXT_DIM }}>
              Nenhum paciente na fila no momento.
            </Typography>
          </Box>
        ) : (
          <Box>
            {fila.slice(0, 8).map((c, idx) => {
              const longa = c.tempoEspera > 45;
              return (
                <Box
                  key={c.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "auto 1fr auto",
                      md: "60px 1fr 160px 140px 120px auto",
                    },
                    alignItems: "center",
                    gap: 2,
                    px: 2.5,
                    py: 2,
                    borderBottom: `1px solid ${PANEL_BORDER}`,
                    "&:last-child": { borderBottom: 0 },
                    "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
                  }}
                >
                  {/* POSIÇÃO FILA */}
                  <Box
                    sx={{
                      fontWeight: 700,
                      color: TEXT,
                      fontSize: 14,
                      fontFamily: "monospace",
                    }}
                  >
                    #{idx + 1}
                  </Box>

                  {/* PACIENTE */}
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
                      Senha {c.senha} · {c.queixa}
                    </Typography>
                  </Box>

                  {/* PRIORIDADE */}
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <PrioridadeTag p={c.prioridadeChamado} />
                  </Box>

                  {/* STATUS / PRESENÇA */}
                  {/* <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <PresencaTag s={c.presenca ?? "PRESENTE"} />
                  </Box> */}

                  {/* TEMPO */}
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
                        color: longa ? "#fb7185" : TEXT_DIM,
                        fontWeight: longa ? 700 : 400,
                      }}
                    >
                      {formatTempo(c.tempoEspera)}
                    </Typography>
                  </Box>

                  {/* AÇÕES */}
                  <Stack direction="row" spacing={0.5}>
                    {/* <Tooltip title="Chamar paciente">
                      <IconButton
                        size="small"
                        sx={{ color: "#34d399" }}
                        // onClick={() => chamarPaciente(c.id)}
                      >
                        <CampaignIcon fontSize="small" />
                      </IconButton>
                    </Tooltip> */}

                    <Tooltip title="Marcar ausência">
                      <IconButton
                        size="small"
                        sx={{ color: "#f87171" }}
                        onClick={() =>
                          handleAbrirModalAusente({
                            id: c.id,
                            nomePaciente: c.paciente.nome,
                            senha: c.senha,
                            prioridadeChamado: c.prioridadeChamado,
                          })
                        }
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
                  </Stack>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      {/* AGUARDANDO CHECK-IN */}
      <Box sx={{ ...panelSx, mt: 3 }}>
        <Box sx={{ p: 2.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: TEXT }}>
            Pacientes aguardando check-in
          </Typography>
          <Typography variant="caption" sx={{ color: TEXT_DIM }}>
            Confirmar presença física na unidade
          </Typography>
        </Box>

        <Divider sx={{ borderColor: PANEL_BORDER }} />

        {filaCheckIn.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center", color: TEXT_DIM }}>
            Todos os pacientes confirmados.
          </Box>
        ) : (
          filaCheckIn.map((c) => (
            <Box
              key={c.senha}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2.5,
                py: 1.5,
                borderBottom: `1px solid ${PANEL_BORDER}`,
                "&:last-child": { borderBottom: 0 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: TEXT,
                    minWidth: 50,
                  }}
                >
                  {c.senha}
                </Box>
                <Box>
                  <Typography
                    sx={{ color: TEXT, fontWeight: 600, fontSize: 14 }}
                  >
                    {c.nomePaciente}
                  </Typography>
                  <Typography sx={{ color: TEXT_DIM, fontSize: 12 }}>
                    {c.queixa}
                  </Typography>
                </Box>
                <PrioridadeTag p={c.prioridadeChamado} />
              </Box>

              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<HowToRegIcon />}
                   onClick={() => navigate(`/recepcao/checkin/${c.id}`)}
                >
                  Check-in
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ color: "#f87171", borderColor: "#f8717155" }}
                  onClick={() =>
                    handleAbrirModalAusente({
                      id: c.id,
                      nomePaciente: c.nomePaciente,
                      senha: c.senha,
                      prioridadeChamado: c.prioridadeChamado,
                    })
                  }
                >
                  Ausente
                </Button>
              </Stack>
            </Box>
          ))
        )}
      </Box>

      {/* MODAL CONFIRMAR AUSÊNCIA */}
      <ModalConfirmarAusente
        open={modalAusente.open}
        onClose={handleFecharModalAusente}
        onConfirmar={handleConfirmarAusente}
        paciente={modalAusente.paciente}
        loading={loadingAusente}
      />
    </PageShell>
  );
};
