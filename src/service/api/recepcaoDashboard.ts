import { api } from "./api";
import type { PrioridadeChamadoResponseAPI } from "./filaEsperaService";

export interface RecepcaoDashboardMetricasResponseDTO {
    aguardandoCheckin: number;
    aguardando: number;
    ausentes: number;
    tempoMedioEspera: Date;
}

export interface FilaAguardandoCheckinResponseDTO {
    id: number;
    senha: string;
    nomePaciente: string;
    queixa: string;
    prioridadeChamado: PrioridadeChamadoResponseAPI;
}

export const getRecepcaoDashboardMetricas = async (): Promise<RecepcaoDashboardMetricasResponseDTO> => {
    const response = await api.get<RecepcaoDashboardMetricasResponseDTO>("/recepcao/metricas")
    return response.data;
}

export const getFilaAguardandoCheckIn = async (): Promise<FilaAguardandoCheckinResponseDTO[]> => {
    const response = await api.get<FilaAguardandoCheckinResponseDTO[]>("/recepcao")
    return response.data
}

export const patchMarcarPacienteAusente = async (chamadoId: number) => {
    const response = await api.patch(`/recepcao/${chamadoId}/ausencia`)
    return response.data
}

export const putConfirmarCheckIn = async (chamadoId: number) => {
    const response = await api.put(`/checkin/${chamadoId}/confirmar`)
    return response.data
}

export const putCancelarChamado = async (chamadoId: number) => {
    const response = await api.put(`/checkin/${chamadoId}/cancelar`)
    return response.data
}