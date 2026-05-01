import { api } from "./api";
import type {
  PrioridadeChamadoResponseAPI,
  StatusChamadoResponseAPI,
} from "./filaAtendimentoService";
import type { PacienteResponseDTO } from "./pacienteService";
import type { SintomaChamadoResponseDTO } from "./sintomaChamadoService";

export interface DetalheChamadoResponseDTO {
  id: number;
  senha: string;
  statusChamado: StatusChamadoResponseAPI;
  prioridadeChamado: PrioridadeChamadoResponseAPI;
  paciente: PacienteResponseDTO;
  queixa: string;
  sintomas: SintomaChamadoResponseDTO[];
}

export const getDetalheChamado = async (
  id: number,
): Promise<DetalheChamadoResponseDTO> => {
  const response = await api.get<DetalheChamadoResponseDTO>(`/chamado/detalhes/${id}`);
  return response.data;
};
