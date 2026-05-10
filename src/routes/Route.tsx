import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { NotFound } from "../pages/NotFound";
import { Dashboard } from "../pages/medico/Dashboard/Dashboard";
import { FilaAtendimento } from "../pages/medico/FilaAtendimento/FilaAtendimento";
import { Paciente } from "../pages/medico/Pacientes/Paciente";
import { HistoricoAtendimento } from "../pages/medico/HistoricoChamados/HistoricoAtendimento";
import { DetalheChamado } from "../pages/medico/DetalheChamado/DetalheChamado";
import Busca from "../pages/medico/Busca/Busca";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/fila",
        element: <FilaAtendimento />,
      },
      {
        path: "/paciente",
        element: <Paciente />,
      },
      {
        path: "/chamados",
        element: <HistoricoAtendimento />,
      },
      {
        path: "/chamados/:id",
        element: <DetalheChamado />,
      },
      {
        path: "/busca",
        element: <Busca />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);