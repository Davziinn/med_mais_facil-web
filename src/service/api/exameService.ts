import { api } from "./api";

export interface ExameResponseDTO {
    id: number;
    nome: string;
    descricao: string;
    ativo: boolean;
}

export interface ExameRequestDTO {
    nome: string;
    descricao: string;
    ativo: boolean;
}

export const postExame = async (request: ExameRequestDTO): Promise<ExameResponseDTO> => {
    const response = await api.post<ExameResponseDTO>('/exame', request);
    return response.data;
}

export const getExameById = async (id: number): Promise<ExameResponseDTO> => {
    const response = await api.get<ExameResponseDTO>(`/exame/${id}`);
    return response.data;
}

export const getAllExames = async (): Promise<ExameResponseDTO[]> => {
    const response = await api.get<ExameResponseDTO[]>('/exame');
    return response.data;
}

export const getAllExamesAtivos = async (): Promise<ExameResponseDTO[]> => {
    const response = await api.get<ExameResponseDTO[]>('/exame/ativos');
    return response.data;
}

export const putExame = async (id: number, request: ExameRequestDTO): Promise<ExameResponseDTO> => {
    const response = await api.put<ExameResponseDTO>(`/exame/${id}`, request);
    return response.data;
}

export const deleteExame = async (id: number): Promise<void> => {
    await api.delete(`/exame/${id}`);
}