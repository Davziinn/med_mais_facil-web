import { api } from "./api";

export interface EspecialidadeMedicoRequestDTO {
  nome: string;
}

export interface EspecialidadeMedicoResponseDTO {
  id: number;
  nome: string;
}

export const getAllEspecialidades = async (): Promise<EspecialidadeMedicoResponseDTO[]> => {
  const response = await api.get<EspecialidadeMedicoResponseDTO[]>("/especialidade")
  return response.data
}