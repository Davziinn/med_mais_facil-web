import { api } from "./api";

export interface HistoricoMetricasResponseDTO {
    totalPeriodo: number;
    finalizados: number;
    cancelados: number;
    taxaCancelamento: number;
}

export const getHistoricoMetricas = async (): Promise<HistoricoMetricasResponseDTO> => {
    const response = await api.get<HistoricoMetricasResponseDTO>("/atendimento/metricas")
    return response.data;
}