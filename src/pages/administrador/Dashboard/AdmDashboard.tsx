import {
  Box,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import EventNoteIcon from "@mui/icons-material/EventNote";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AdminPageHeader } from "../../../components/AdminPageHeader";
import { StatCardAdmin } from "../../../components/StatCardAdmin";
import { useLogs } from "../../../hooks/useLogs";
import { useAdmDashboard } from "../../../hooks/useAdmDashboard";

const CORES_PRIORIDADE: Record<string, string> = {
  CRITICA: "#ef4444",
  ALTA: "#f97316",
  MEDIA: "#eab308",
  BAIXA: "#22c55e",
};

export default function AdmDashboard() {
  const { logs } = useLogs();
  const { metricas, loading, error } = useAdmDashboard();

  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const cards = metricas
    ? [
        {
          label: "Pacientes",
          value: metricas.quantidadePacientes.toLocaleString("pt-BR"),
          icon: <PeopleIcon />,
          color: "primary" as const,
        },
        {
          label: "Médicos",
          value: metricas.quantidadeMedicos,
          icon: <MedicalServicesIcon />,
          color: "info" as const,
        },
        {
          label: "Recepcionistas",
          value: metricas.quantidadeRecepcionistas,
          icon: <SupportAgentIcon />,
          color: "secondary" as const,
        },
        {
          label: "Administradores",
          value: metricas.quantidadeAdms,
          icon: <AdminPanelSettingsIcon />,
          color: "warning" as const,
        },
        {
          label: "Hospitais",
          value: metricas.quantidadeHospitais,
          icon: <LocalHospitalIcon />,
          color: "primary" as const,
        },
        {
          label: "Chamados ativos",
          value: metricas.chamadosAtivosHoje,
          icon: <PendingActionsIcon />,
          color: "warning" as const,
          trend: "Tempo real",
        },
        {
          label: "Finalizados hoje",
          value: metricas.chamadosFinalizadosHoje,
          icon: <DoneAllIcon />,
          color: "success" as const,
        },
        {
          label: "Cancelados",
          value: metricas.chamadosCanceladosHoje,
          icon: <CancelIcon />,
          color: "error" as const,
        },
        {
          label: "Pacientes ausentes",
          value: metricas.quantidadePacientesAusentesHoje,
          icon: <PersonOffIcon />,
          color: "error" as const,
        },
        {
          label: "Em atendimento",
          value: metricas.chamadosEmAtendimento,
          icon: <HealthAndSafetyIcon />,
          color: "info" as const,
        },
        {
          label: "Em espera",
          value: metricas.chamadosEmEspera,
          icon: <HourglassTopIcon />,
          color: "warning" as const,
        },
      ]
    : [];

  const chamadosPrioridade = metricas
    ? [
        {
          prioridade: "Crítica",
          total: metricas.graficoMetricas.quantidadeChamadosCritica,
          cor: CORES_PRIORIDADE.CRITICA,
        },
        {
          prioridade: "Alta",
          total: metricas.graficoMetricas.quantidadeChamadosAlta,
          cor: CORES_PRIORIDADE.ALTA,
        },
        {
          prioridade: "Média",
          total: metricas.graficoMetricas.quantidadeChamadosMedia,
          cor: CORES_PRIORIDADE.MEDIA,
        },
        {
          prioridade: "Baixa",
          total: metricas.graficoMetricas.quantidadeChamadosBaixa,
          cor: CORES_PRIORIDADE.BAIXA,
        },
      ]
    : [];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <AdminPageHeader
        title="Painel Administrativo"
        subtitle="Visão geral da operação do Med+Fácil"
        actions={
          <Chip
            icon={<EventNoteIcon />}
            label={`Hoje, ${hoje}`}
            color="primary"
            variant="outlined"
          />
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {cards.map((c) => (
          <Grid key={c.label} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <StatCardAdmin {...c} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Atendimentos na semana
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Últimos 7 dias
                </Typography>
              </Box>

              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metricas?.atendimentosPorDia ?? []}>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="dia"
                      stroke="#64748b"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                    <RTooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="atendimentos"
                      stroke="#0284c7"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Chamados por prioridade
              </Typography>

              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chamadosPrioridade}>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="prioridade"
                      stroke="#64748b"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                    <RTooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                      {chamadosPrioridade.map((d) => (
                        <Cell key={d.prioridade} fill={d.cor} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Atividade recente
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Usuário</TableCell>
                <TableCell>Ação</TableCell>
                <TableCell>Módulo</TableCell>
                <TableCell align="right">Data</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {logs.slice(0, 6).map((l) => {
                const d = new Date(l.criadoEm);
                return (
                  <TableRow key={l.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {l.nomeUsuario}
                    </TableCell>
                    <TableCell>{l.acao}</TableCell>
                    <TableCell>
                      <Chip label={l.modulo} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "text.secondary", fontSize: 13 }}
                    >
                      {d.toLocaleString("pt-BR")}
                    </TableCell>
                  </TableRow>
                );
              })}

              {logs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Nenhuma atividade recente
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
