import { api } from "./api";
import type { EventoClinicoResponseDTO } from "./eventoClinicoResponseDTO";
import type {
  PrioridadeChamadoResponseAPI,
  StatusChamadoResponseAPI,
} from "./filaAtendimentoService";
import type { PacienteResponseDTO } from "./pacienteService";
import type { SintomaChamadoResponseDTO } from "./sintomaChamadoService";

type Severidade = 'LEVE' | 'MODERADO' | 'CRITICO';
export interface SinaisAlertaResponseDTO {
  descricao: string;
  severidade: Severidade;
}

export interface DetalheChamadoResponseDTO {
  id: number;
  senha: string;
  statusChamado: StatusChamadoResponseAPI;
  prioridadeChamado: PrioridadeChamadoResponseAPI;
  paciente: PacienteResponseDTO;
  queixa: string;
  sintomas: SintomaChamadoResponseDTO[];
  eventosClinicos: EventoClinicoResponseDTO[];
  sinaisAlertas: SinaisAlertaResponseDTO[]
}

export const getDetalheChamado = async (
  id: number,
): Promise<DetalheChamadoResponseDTO> => {
  const response = await api.get<DetalheChamadoResponseDTO>(`/chamado/detalhes/${id}`);
  return response.data;
};
