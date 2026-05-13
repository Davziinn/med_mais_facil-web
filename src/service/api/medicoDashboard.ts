import { api } from "./api";

export interface DashboardMetricasResponseDTO {
    chamadosHoje: number;
    aguardando: number;
    emAtendimento: number;
    finalizados: number;
}

export const getDashboardMetricas = async (): Promise<DashboardMetricasResponseDTO> => {
    const response = await api.get<DashboardMetricasResponseDTO>("/medico/metricas")
    return response.data;
}