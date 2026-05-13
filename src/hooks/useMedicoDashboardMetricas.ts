import { useState } from "react";
import {
  type DashboardMetricasResponseDTO,
  getDashboardMetricas,
} from "../service/api/medicoDashboard";

export const useMedicoDashboardMetricas = () => {
  const [metricas, setMetricas] = useState<DashboardMetricasResponseDTO | null>(null);

  const carregarMetricas = async () => {
    try {
      const data = await getDashboardMetricas();
      setMetricas(data);
    } catch (error) {
      console.error("Erro ao buscar métricas do dashboard:", error);
    }
  };

  return {
    metricas,
    carregarMetricas,
  };
};
