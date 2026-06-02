import { api } from "./api";

export interface EspecialidadeDTO {
  nome: string;
  descricao: string;
}

export interface MedicoRequestDTO {
  crm: string;
  especialidade: EspecialidadeDTO;
  sexo: "MASCULINO" | "FEMININO" | "OUTRO";
  dataNascimento: string;
  usuarioId: number;
}

export interface MedicoUpdateDTO {
  crm: string;
  especialidade: EspecialidadeDTO;
  sexo: "MASCULINO" | "FEMININO" | "OUTRO";
  dataNascimento: string;
}

export interface MedicoResponseDTO {
  id: number;
  crm: string;
  especialidade: EspecialidadeDTO;
  sexo: "MASCULINO" | "FEMININO" | "OUTRO";
  idade: number;
  usuarioId: number;
}

export const medicoService = {
  cadastrarMedico: async (data: MedicoRequestDTO): Promise<MedicoResponseDTO> => {
    const response = await api.post<MedicoResponseDTO>("/medico", data);
    return response.data;
  },

  buscarPorUsuarioId: async (usuarioId: number): Promise<MedicoResponseDTO> => {
    const response = await api.get<MedicoResponseDTO>(`/medico/usuario/${usuarioId}`);
    return response.data;
  },

  atualizarMedico: async (medicoId: number, data: MedicoUpdateDTO): Promise<MedicoResponseDTO> => {
    const response = await api.put<MedicoResponseDTO>(`/medico/${medicoId}`, data);
    return response.data;
  },
};