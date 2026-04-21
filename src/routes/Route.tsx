import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { AppLayout } from "../layouts/AppLayout";
import { FilaAtendimento } from "../pages/FilaAtendimento/FilaAtendimento";
import { Pacientes } from "../pages/Pacientes";
import { Chamados } from "../pages/Chamados";
import { DetalheChamado } from "../pages/DetalheChamado";
import { NotFound } from "../pages/NotFound";

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
        path: "/pacientes",
        element: <Pacientes />,
      },
      {
        path: "/chamados",
        element: <Chamados />,
      },
      {
        path: "/chamados:id",
        element: <DetalheChamado />,
      },
      {
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);
