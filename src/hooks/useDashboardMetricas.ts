import { useState } from "react";
import {
  type DashboardMetricasResponseDTO,
  getDashboardMetricas,
} from "../service/api/dashboard";

export const useDashboardMetricas = () => {
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
