import { api } from "./api";

export interface PacienteResponseDTO {
  id: number;
  nome: string;
  cpf: string;
  idade: number;
  sexo: string;
}

export const getListaPaciente = async (): Promise<PacienteResponseDTO[]> => {
  const response = await api.get<PacienteResponseDTO[]>("/paciente");
  return response.data;
};
