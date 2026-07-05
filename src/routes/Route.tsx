import { createBrowserRouter } from "react-router-dom";

import Busca from "../pages/medico/Busca/Busca";
import { DetalheChamado } from "../pages/medico/DetalheChamado/DetalheChamado";
import { HistoricoAtendimento } from "../pages/medico/HistoricoChamados/HistoricoAtendimento";
import { Paciente } from "../pages/medico/Pacientes/Paciente";
import { FilaAtendimento } from "../pages/medico/FilaAtendimento/FilaAtendimento";
import { Dashboard } from "../pages/medico/Dashboard/Dashboard";
import Login from "../pages/login/Login";
import { AppLayout } from "../layouts/AppLayout";
import ProtectedRoute from "../components/ProntectedRoute";
import { NotFound } from "../pages/NotFound";
import { DashboardRecepcao } from "../pages/recepcao/Dashboard/DashboardRecepcao";
import { Checkin } from "../pages/recepcao/Checkin/Checkin";
import { RecepcaoFila } from "../pages/recepcao/RecepcaoFila/RecepcaoFila";
import { BuscaPaciente } from "../pages/recepcao/BuscaPaciente";
import { Encaminhamento } from "../pages/recepcao/Encaminhamento/Encaminhamento";
import AdmDashboard from "../pages/administrador/Dashboard/AdmDashboard";
import { Usuarios } from "../pages/administrador/Usuarios/Usuarios";
import { Hospitais } from "../pages/administrador/Hospitais/Hospitais";
import { Especialidades } from "../pages/administrador/Especialidades/Especialidades";
import { Sintomas } from "../pages/administrador/Sintomas/Sintomas";
import { Eventos } from "../pages/administrador/EventoClinico/Eventos";
import Logs from "../pages/administrador/LogsAuditoria/Logs";
import { Configuracoes } from "../pages/administrador/Configuracoes/Configuracoes";
import Exames from "../pages/administrador/Exames/Exame";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    element: <AppLayout />,
    children: [
      /* =========================
          MÉDICO
      ========================= */

      {
        path: "/",
        element: (
          <ProtectedRoute roles={["MEDICO"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "/fila",
        element: (
          <ProtectedRoute roles={["MEDICO"]}>
            <FilaAtendimento />
          </ProtectedRoute>
        ),
      },

      {
        path: "/pacientes",
        element: (
          <ProtectedRoute roles={["MEDICO"]}>
            <Paciente />
          </ProtectedRoute>
        ),
      },

      {
        path: "/historico",
        element: (
          <ProtectedRoute roles={["MEDICO"]}>
            <HistoricoAtendimento />
          </ProtectedRoute>
        ),
      },

      {
        path: "/chamados/:id",
        element: (
          <ProtectedRoute roles={["MEDICO"]}>
            <DetalheChamado />
          </ProtectedRoute>
        ),
      },

      {
        path: "/busca",
        element: (
          <ProtectedRoute roles={["MEDICO"]}>
            <Busca />
          </ProtectedRoute>
        ),
      },

      /* =========================
          RECEPÇÃO
      ========================= */

      {
        path: "/recepcao",
        element: (
          <ProtectedRoute roles={["RECEPCAO"]}>
            <DashboardRecepcao />
          </ProtectedRoute>
        ),
      },

      {
        path: "/recepcao/checkin/:id?",
        element: (
          <ProtectedRoute roles={["RECEPCAO"]}>
            <Checkin />
          </ProtectedRoute>
        ),
      },

      {
        path: "/recepcao/fila",
        element: (
          <ProtectedRoute roles={["RECEPCAO"]}>
            <RecepcaoFila />
          </ProtectedRoute>
        ),
      },

      {
        path: "/recepcao/busca",
        element: (
          <ProtectedRoute roles={["RECEPCAO"]}>
            <BuscaPaciente />
          </ProtectedRoute>
        ),
      },

      {
        path: "/recepcao/encaminhamento",
        element: (
          <ProtectedRoute roles={["RECEPCAO"]}>
            <Encaminhamento />
          </ProtectedRoute>
        ),
      },

      {
        path: "/recepcao/encaminhamento/:id",
        element: (
          <ProtectedRoute roles={["RECEPCAO"]}>
            <Encaminhamento />
          </ProtectedRoute>
        ),
      },

      /* =========================
          ADM
      ========================= */

      {
        path: "/adm",
        element: (
          <ProtectedRoute roles={["ADMINISTRADOR"]}>
            <AdmDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adm/usuarios",
        element: (
          <ProtectedRoute roles={["ADMINISTRADOR"]}>
            <Usuarios />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adm/hospitais",
        element: (
          <ProtectedRoute roles={["ADMINISTRADOR"]}>
            <Hospitais />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adm/especialidades",
        element: (
          <ProtectedRoute roles={["ADMINISTRADOR"]}>
            <Especialidades />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adm/sintomas",
        element: (
          <ProtectedRoute roles={["ADMINISTRADOR"]}>
            <Sintomas />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adm/exames",
        element: (
          <ProtectedRoute roles={["ADMINISTRADOR"]}>
            <Exames />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adm/eventos",
        element: (
          <ProtectedRoute roles={["ADMINISTRADOR"]}>
            <Eventos />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adm/logs",
        element: (
          <ProtectedRoute roles={["ADMINISTRADOR"]}>
            <Logs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adm/configuracoes",
        element: (
          <ProtectedRoute roles={["ADMINISTRADOR"]}>
            <Configuracoes />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
