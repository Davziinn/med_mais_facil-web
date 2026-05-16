import { api } from "./api";
import type { PrioridadeChamadoResponseAPI } from "./filaEsperaService";

export interface AlterarPrioridadeRequestDTO {
    prioridadeChamado: PrioridadeChamadoResponseAPI;
}
export interface AlterarPrioridadeResponseDTO {
    id: number;
    prioridadeChamado: PrioridadeChamadoResponseAPI;
}

export const putAlterarPrioridadeChamado = async (chamadoId: number, novaPrioridade: AlterarPrioridadeRequestDTO): Promise<AlterarPrioridadeResponseDTO> => {
    const response = await api.put<AlterarPrioridadeResponseDTO>(`/chamado/${chamadoId}/alterar-prioridade`, novaPrioridade);
    return response.data
} 