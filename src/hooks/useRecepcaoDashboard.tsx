import { useState } from "react";
import {
  getRecepcaoDashboardMetricas,
  type RecepcaoDashboardMetricasResponseDTO,
} from "../service/api/recepcaoDashboard";

export const useRecepcaoDashboard = () => {
  const [metricas, setMetricas] =
    useState<RecepcaoDashboardMetricasResponseDTO | null>(null);

  const carregarMetricas = async () => {
    try {
      const data = await getRecepcaoDashboardMetricas();
      setMetricas(data);
    } catch (error) {
      console.error("Erro ao buscar métricas do dashboard:", error);
    }
  };

  return { metricas, carregarMetricas };
};
