import { api } from "./api";
import type { HospitalResponseDTO } from "./hospitalService";

export type TipoUsuarioResponseAPI =
  | "RECEPCAO"
  | "MEDICO"
  | "PACIENTE"
  | "ADMINISTRADOR";

export interface UsuarioResponseDTO {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  tipoUsuario: TipoUsuarioResponseAPI;
  ativo: boolean;
  hospital: HospitalResponseDTO;
}
export interface UsuarioRequestDTO {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  tipoUsuario: TipoUsuarioResponseAPI;
  hospitalId: number;
  ativo: boolean;
}
export interface UsuarioUpdateRequestDTO {
  nome: string;
  email: string;
  senha?: string;
  cpf: string;
  telefone: string;
  tipoUsuario: TipoUsuarioResponseAPI;
  hospitalId: number;
  ativo: boolean;
}

export const postUsuario = async (request: UsuarioRequestDTO): Promise<UsuarioResponseDTO> => {
    const response = await api.post<UsuarioResponseDTO>('/usuario', request);
    return response.data;
}

export const getUsuarioById = async (id: number): Promise<UsuarioResponseDTO> => {
    const response = await api.get<UsuarioResponseDTO>(`/usuario/${id}`);
    return response.data;
}

export const getUsuarios = async (): Promise<UsuarioResponseDTO[]> => {
    const response = await api.get<UsuarioResponseDTO[]>('/usuario');
    return response.data;
}

export const putUsuario = async (id: number, request: UsuarioUpdateRequestDTO): Promise<UsuarioResponseDTO> => {
    const response = await api.put<UsuarioResponseDTO>(`/usuario/${id}/editar`, request);
    return response.data;
}

export const deleteUsuario = async (id: number): Promise<void> => {
    await api.delete(`/usuario/${id}/deletar`);
}