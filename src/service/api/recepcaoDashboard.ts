import { api } from "./api";

export interface RecepcaoDashboardMetricasResponseDTO {
    aguardandoCheckin: number;
    aguardando: number;
    ausentes: number;
    tempoMedioEspera: Date;
}

export const getRecepcaoDashboardMetricas = async (): Promise<RecepcaoDashboardMetricasResponseDTO> => {
    const response = await api.get<RecepcaoDashboardMetricasResponseDTO>("/recepcao/metricas")
    return response.data;
}