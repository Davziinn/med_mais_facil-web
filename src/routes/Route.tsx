import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { AppLayout } from "../layouts/AppLayout";
import { FilaAtendimento } from "../pages/FilaAtendimento";
import { Pacientes } from "../pages/Pacientes";
import { Chamados } from "../pages/Chamados";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        path: "/dashboard",
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
    ],
  },
]);
