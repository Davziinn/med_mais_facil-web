import { useState } from "react";
import {
  getHistoricoMetricas,
  type HistoricoMetricasResponseDTO,
} from "../service/api/historicoMetricasService";

export const useHistoricoMetricas = () => {
  const [historicoMetricas, setHistoricoMetricas] =
    useState<HistoricoMetricasResponseDTO | null>(null);

  const carregarHistoricoMetricas = async () => {
    try {
      const data = await getHistoricoMetricas();
      setHistoricoMetricas(data);
    } catch (error) {
      console.error("Erro ao buscar métricas históricas:", error);
    }
  };

  return {
    historicoMetricas,
    carregarHistoricoMetricas,
  };
};
