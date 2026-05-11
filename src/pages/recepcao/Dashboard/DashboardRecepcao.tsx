import { useMemo } from "react";
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
import CampaignIcon from "@mui/icons-material/Campaign";
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
  PresencaTag 
} from "../_shared";
import { 
  useRecepcao, 
  calcMinutos, 
  formatTempo, 
  type RecepcaoChamado 
} from "../../../contexts/RecepcaoContext";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <Box sx={{ ...panelSx, p: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
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

export const DashboardRecepcao = () => {
  const navigate = useNavigate();
  const { itens, fila, fazerCheckin, marcarAusente, chamarPaciente } = useRecepcao();

  const stats = useMemo(() => {
    const aguardCheckin = itens.filter(
      (c) => c.presenca === "aguardando_checkin"
    ).length;

    const aguardAtend = fila.filter(
      (c) => c.status !== "em_atendimento"
    ).length;

    const ausentes = itens.filter((c) => c.presenca === "ausente").length;

    const tempos = fila.map((c) =>
      calcMinutos(c.chegouEm ?? c.criadoEm)
    );

    const media = tempos.length
      ? Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length)
      : 0;

    return { aguardCheckin, aguardAtend, ausentes, media };
  }, [itens, fila]);

  return (
    <PageShell
      title="Painel da Recepção"
      subtitle="Visão geral do fluxo operacional do pronto atendimento"
      actions={
        <Tooltip title="Atualizar">
          <IconButton
            sx={{ color: TEXT_DIM, border: `1px solid ${PANEL_BORDER}` }}
            onClick={() => window.location.reload()}
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
            value={stats.aguardCheckin}
            color="#60a5fa"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <StatCard
            icon={<HourglassTopIcon />}
            label="Aguardando atendimento"
            value={stats.aguardAtend}
            color="#fcd34d"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <StatCard
            icon={<PersonOffIcon />}
            label="Pacientes ausentes"
            value={stats.ausentes}
            color="#f87171"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <StatCard
            icon={<AccessTimeIcon />}
            label="Tempo médio de espera"
            value={`${stats.media}m`}
            color="#34d399"
          />
        </Grid>
      </Grid>

      {/* FILA ATUAL */}
      <Box sx={{ ...panelSx }}>
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: TEXT }}>
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
            {fila.slice(0, 8).map((c: RecepcaoChamado, idx: number) => {
              const mins = calcMinutos(c.chegouEm ?? c.criadoEm);
              const longaEspera = mins > 45;

              return (
                <Box
                  key={c.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "40px 1fr auto",
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
                  <Box sx={{ fontWeight: 700, color: TEXT, fontSize: 14, fontFamily: "monospace" }}>
                    #{idx + 1}
                  </Box>

                  <Box>
                    <Typography sx={{ color: TEXT, fontWeight: 600, fontSize: 14 }}>
                      {c.paciente.nome}
                    </Typography>
                    <Typography sx={{ color: TEXT_DIM, fontSize: 12 }}>
                      Senha {c.senha}
                    </Typography>
                  </Box>

                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <PrioridadeTag p={c.prioridade} />
                  </Box>

                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <PresencaTag s={c.presenca} />
                  </Box>

                  <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 14, color: longaEspera ? "#fb7185" : TEXT_DIM }} />
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: longaEspera ? "#fb7185" : TEXT_DIM,
                        fontWeight: longaEspera ? 700 : 400,
                      }}
                    >
                      {formatTempo(mins)}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={0.5} sx={{ justifyContent: "flex-end" }}>
                    <Tooltip title="Chamar paciente">
                      <IconButton
                        size="small"
                        sx={{ color: "#34d399" }}
                        onClick={() => chamarPaciente(c.id)}
                      >
                        <CampaignIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Marcar ausência">
                      <IconButton
                        size="small"
                        sx={{ color: "#f87171" }}
                        onClick={() => marcarAusente(c.id)}
                      >
                        <PersonOffIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Encaminhar">
                      <IconButton
                        size="small"
                        sx={{ color: "#60a5fa" }}
                        onClick={() => navigate(`/recepcao/encaminhamento/${c.id}`)}
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

        {itens.filter((c) => c.presenca === "aguardando_checkin").length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center", color: TEXT_DIM }}>
            Todos os pacientes confirmados.
          </Box>
        ) : (
          itens
            .filter((c) => c.presenca === "aguardando_checkin")
            .map((c) => (
              <Box
                key={c.id}
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
                  <Box sx={{ fontFamily: "monospace", fontWeight: 700, color: TEXT, minWidth: 60 }}>
                    {c.senha}
                  </Box>
                  <Box>
                    <Typography sx={{ color: TEXT, fontWeight: 600, fontSize: 14 }}>
                      {c.paciente.nome}
                    </Typography>
                    <PrioridadeTag p={c.prioridade} />
                  </Box>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<HowToRegIcon />}
                    onClick={() => fazerCheckin(c.id)}
                  >
                    Check-in
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#f87171", borderColor: "#f8717155" }}
                    onClick={() => marcarAusente(c.id)}
                  >
                    Ausente
                  </Button>
                </Stack>
              </Box>
            ))
        )}
      </Box>
    </PageShell>
  );
};