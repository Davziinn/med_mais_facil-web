import { api } from "./api";

export interface PacienteResponseDTO {
  id: number;
  nome: string;
  cpf: string;
  idade: number;
  sexo: string;
  condicoesPreexistentes: string[];
}

export const getListaPaciente = async (): Promise<PacienteResponseDTO[]> => {
  const response = await api.get<PacienteResponseDTO[]>("/paciente");
  return response.data;
};

export const getPacienteByNome = async (nomePaciente: string): Promise<PacienteResponseDTO[]> => {
  const response = await api.get<PacienteResponseDTO[]> (`/paciente/${nomePaciente}`);
  return response.data;
}
