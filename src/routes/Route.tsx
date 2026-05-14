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

/* Médico */


/* Recepção */
// import RecepcaoDashboard from "@/pages/recepcao/Dashboard";
// import RecepcaoCheckin from "@/pages/recepcao/Checkin";
// import RecepcaoFila from "@/pages/recepcao/FilaOperacional";
// import RecepcaoBusca from "@/pages/recepcao/BuscaPaciente";
// import RecepcaoEncaminhamento from "@/pages/recepcao/Encaminhamento";

/* ADM */
// import Adm from "@/pages/adm/Adm";

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
          <ProtectedRoute roles={["medico"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "/fila",
        element: (
          <ProtectedRoute roles={["medico"]}>
            <FilaAtendimento />
          </ProtectedRoute>
        ),
      },

      {
        path: "/pacientes",
        element: (
          <ProtectedRoute roles={["medico"]}>
            <Paciente />
          </ProtectedRoute>
        ),
      },

      {
        path: "/historico",
        element: (
          <ProtectedRoute roles={["medico"]}>
            <HistoricoAtendimento />
          </ProtectedRoute>
        ),
      },

      {
        path: "/chamados/:id",
        element: (
          <ProtectedRoute roles={["medico"]}>
            <DetalheChamado />
          </ProtectedRoute>
        ),
      },

      {
        path: "/busca",
        element: (
          <ProtectedRoute roles={["medico"]}>
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
          <ProtectedRoute roles={["recepcao"]}>
            <DashboardRecepcao />
          </ProtectedRoute>
        ),
      },

      {
        path: "/recepcao/checkin/:id?",
        element: (
          <ProtectedRoute roles={["recepcao"]}>
            <Checkin />
          </ProtectedRoute>
        ),
      },

      {
        path: "/recepcao/fila",
        element: (
          <ProtectedRoute roles={["recepcao"]}>
            <RecepcaoFila />
          </ProtectedRoute>
        ),
      },

      {
        path: "/recepcao/busca",
        element: (
          <ProtectedRoute roles={["recepcao"]}>
            <BuscaPaciente />
          </ProtectedRoute>
        ),
      },

      {
        path: "/recepcao/encaminhamento",
        element: (
          <ProtectedRoute roles={["recepcao"]}>
            <Encaminhamento />
          </ProtectedRoute>
        ),
      },

      {
        path: "/recepcao/encaminhamento/:id",
        element: (
          <ProtectedRoute roles={["recepcao"]}>
            <Encaminhamento />
          </ProtectedRoute>
        ),
      },

      /* =========================
          ADM
      ========================= */

      // {
      //   path: "/adm",
      //   element: (
      //     <ProtectedRoute roles={["adm"]}>
      //       <Adm />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);