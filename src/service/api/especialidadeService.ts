import { api } from "./api";

export interface EspecialidadeMedicoRequestDTO {
  nome: string;
  descricao: string;
}

export interface EspecialidadeMedicoResponseDTO {
  id: number;
  nome: string;
  descricao: string;
}

export const postEspecialidade = async (
  request: EspecialidadeMedicoRequestDTO
): Promise<EspecialidadeMedicoResponseDTO> => {
  const response = await api.post<EspecialidadeMedicoResponseDTO>("/especialidade", request);
  return response.data;
};

export const getAllEspecialidades = async (): Promise<EspecialidadeMedicoResponseDTO[]> => {
  const response = await api.get<EspecialidadeMedicoResponseDTO[]>("/especialidade");
  return response.data;
};

export const putEspecialidades = async (
  id: number,
  request: EspecialidadeMedicoRequestDTO
): Promise<EspecialidadeMedicoResponseDTO> => {
  const response = await api.put<EspecialidadeMedicoResponseDTO>(`/especialidade/${id}/editar`, request);
  return response.data;
};

export const deleteEspecialidades = async (id: number) => {
  const response = await api.delete(`/especialidade/${id}/deletar`);
  return response.data;
};