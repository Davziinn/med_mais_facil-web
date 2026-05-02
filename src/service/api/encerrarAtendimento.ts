import { api } from "./api";

export interface EncerrarAtendimentoResponseDTO {
  id: number;
  dataInicio: Date;
  dataFim: Date;
  chamadoId: number;
  medicoId: number;
}

export const putEncerrarAtendimento = async (
  id: number,
): Promise<EncerrarAtendimentoResponseDTO> => {
  const response = await api.put(`atendimento/encerrar/${id}`);
  return response.data;
};
