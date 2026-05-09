import { api } from "./api";
import type { PrioridadeChamadoResponseAPI, StatusChamadoResponseAPI } from "./filaEsperaService";

export interface HistoricoAtendimentoResponseDTO {
  atendimentoId: number;
  pacienteId: number;
//   senha: string,
  nomePaciente: string;
  idadePaciente: number;
  sexoPaciente: string;
  diagnostico: string;
  nomeMedico: string;
  prioridade: PrioridadeChamadoResponseAPI;
  status: StatusChamadoResponseAPI;
  dataInicio: string;
  dataFim: string;
//   tempoAtendimento: number;
}

export const getListarHistoricoAtendimento = async (): Promise<HistoricoAtendimentoResponseDTO[]> => {
    const response = await api.get("atendimento/historico");
    return response.data;
}
