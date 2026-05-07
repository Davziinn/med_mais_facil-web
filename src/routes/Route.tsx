import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { AppLayout } from "../layouts/AppLayout";
import { FilaAtendimento } from "../pages/FilaAtendimento/FilaAtendimento";
import { Paciente } from "../pages/Pacientes/Paciente";
import { DetalheChamado } from "../pages/DetalheChamado/DetalheChamado";
import { NotFound } from "../pages/NotFound";
import { HistoricoAtendimento } from "../pages/HistoricoChamados/HistoricoAtendimento";

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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
