import { api } from "./api";
import type { StatusChamadoResponseAPI } from "./filaEsperaService";

export interface FilaEmAtendimentoResponseDTO {
  chamadoId: number;
  nomePaciente: string;
  descricaoRelato: string;
  idadePaciente: number;
  statusChamado: StatusChamadoResponseAPI;
}

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const getFilaEmAtendimento = async (): Promise<PageResponse<FilaEmAtendimentoResponseDTO>> => {
  const response = await api.get<PageResponse<FilaEmAtendimentoResponseDTO>>("/medico");
  return response.data;
};