import { api } from "./api";
import type { PacienteResponseDTO } from "./pacienteService";

export type StatusChamadoResponseAPI =
  | "AGUARDANDO_CHECKIN"
  | "EM_ESPERA"
  | "EM_ATENDIMENTO"
  | "FINALIZADO"
  | "CANCELADO"
  | "AUSENTE";

export type PrioridadeChamadoResponseAPI =
  | "BAIXA"
  | "MEDIA"
  | "ALTA"
  | "CRITICA";

export interface FilaEsperaResponseDTO {
    id: number;
    senha: string;
    paciente: PacienteResponseDTO;
    queixa: string;
    statusChamado: StatusChamadoResponseAPI;
    prioridadeChamado: PrioridadeChamadoResponseAPI;
    tempoEspera: number;
}

export const getFilaEspera = async (): Promise<FilaEsperaResponseDTO[]> => {
    const response = await api.get<FilaEsperaResponseDTO[]>('/chamado')
    return response.data;
}