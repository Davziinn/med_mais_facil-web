import { api } from "./api";
import type { PacienteResponseDTO } from "./pacienteService";

export type StatusChamadoResponseAPI =
  | "EM_ESPERA"
  | "EM_ATENDIMENTO"
  | "FINALIZADO"
  | "CANCELADO";

export type PrioridadeChamadoResponseAPI =
  | "BAIXA"
  | "MEDIA"
  | "ALTA"
  | "CRITICA";

export interface FilaAtendimentoResponseDTO {
    id: number;
    senha: string;
    paciente: PacienteResponseDTO;
    queixa: string;
    statusChamado: StatusChamadoResponseAPI;
    prioridadeChamado: PrioridadeChamadoResponseAPI;
    tempoEspera: number;
}

export const getFilaAtendimento = async (): Promise<FilaAtendimentoResponseDTO[]> => {
    const response = await api.get<FilaAtendimentoResponseDTO[]>('/v1/chamado')
    return response.data;
}