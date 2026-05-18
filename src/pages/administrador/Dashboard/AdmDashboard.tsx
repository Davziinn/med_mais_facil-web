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

import {
  DASHBOARD_STATS,
  ATENDIMENTOS_SEMANA,
  CHAMADOS_PRIORIDADE,
  LOGS_MOCK,
} from "../../../mocks/adminMock";
import { StatCardAdmin } from "../../../components/StatCardAdmin";

const stats = DASHBOARD_STATS;

const cards = [
  {
    label: "Pacientes",
    value: stats.totalPacientes.toLocaleString("pt-BR"),
    icon: <PeopleIcon />,
    color: "primary" as const,
    trend: "+8% esta semana",
  },
  {
    label: "Médicos",
    value: stats.totalMedicos,
    icon: <MedicalServicesIcon />,
    color: "info" as const,
  },
  {
    label: "Recepcionistas",
    value: stats.totalRecepcionistas,
    icon: <SupportAgentIcon />,
    color: "secondary" as const,
  },
  {
    label: "Administradores",
    value: stats.totalAdministradores,
    icon: <AdminPanelSettingsIcon />,
    color: "warning" as const,
  },
  {
    label: "Hospitais",
    value: stats.totalHospitais,
    icon: <LocalHospitalIcon />,
    color: "primary" as const,
  },
  {
    label: "Chamados ativos",
    value: stats.chamadosAtivos,
    icon: <PendingActionsIcon />,
    color: "warning" as const,
    trend: "Tempo real",
  },
  {
    label: "Finalizados hoje",
    value: stats.chamadosFinalizadosHoje,
    icon: <DoneAllIcon />,
    color: "success" as const,
    trend: "+12% vs ontem",
  },
  {
    label: "Cancelados",
    value: stats.chamadosCancelados,
    icon: <CancelIcon />,
    color: "error" as const,
  },
  {
    label: "Pacientes ausentes",
    value: stats.pacientesAusentes,
    icon: <PersonOffIcon />,
    color: "error" as const,
  },
  {
    label: "Em atendimento",
    value: stats.pacientesEmAtendimento,
    icon: <HealthAndSafetyIcon />,
    color: "info" as const,
  },
  {
    label: "Em espera",
    value: stats.pacientesEmEspera,
    icon: <HourglassTopIcon />,
    color: "warning" as const,
  },
];

export default function AdmDashboard() {
  return (
    <Box>
      <AdminPageHeader
        title="Painel Administrativo"
        subtitle="Visão geral da operação do Med+Fácil"
        actions={
          <Chip
            icon={<EventNoteIcon />}
            label="Hoje, 18/05/2026"
            color="primary"
            variant="outlined"
          />
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {cards.map((c) => (
          <Grid
            key={c.label}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <StatCardAdmin {...c} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid
          size={{
            xs: 12,
            md: 7,
          }}
        >
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
                  <LineChart data={ATENDIMENTOS_SEMANA}>
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

        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Chamados por prioridade
              </Typography>

              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHAMADOS_PRIORIDADE}>
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
                      {CHAMADOS_PRIORIDADE.map((d) => (
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
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
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
              {LOGS_MOCK.slice(0, 6).map((l) => (
                <TableRow key={l.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{l.usuario}</TableCell>

                  <TableCell>{l.acao}</TableCell>

                  <TableCell>
                    <Chip label={l.modulo} size="small" variant="outlined" />
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      color: "text.secondary",
                      fontSize: 13,
                    }}
                  >
                    {new Date(l.data).toLocaleString("pt-BR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
