import { api } from "./api";
import type { StatusChamadoResponseAPI } from "./filaEsperaService";

export interface FilaEmAtendimentoResponseDTO {
  chamadoId: number;
  nomePaciente: string;
  descricaoRelato: string;
  idadePaciente: number;
  statusChamado: StatusChamadoResponseAPI;
}

export const getFilaEmAtendimento = async (): Promise<FilaEmAtendimentoResponseDTO[]> => {
    const response = await api.get<FilaEmAtendimentoResponseDTO[]>('/medico')
    return response.data
}