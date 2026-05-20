import { api } from "./api";
import type { PrioridadeChamadoResponseAPI } from "./filaEsperaService";

export interface SintomaRequestDTO {
    descricao: string;
    prioridadeSintoma: PrioridadeChamadoResponseAPI;
    ativo: boolean;
};

export interface SintomaResponseDTO {
    id: number;
    descricao: string;
    prioridadeSintoma: PrioridadeChamadoResponseAPI;
    ativo: boolean;
}

export const postSintoma = async (request: SintomaRequestDTO): Promise<SintomaResponseDTO> => {
    const response = await api.post<SintomaResponseDTO>("/sintoma", request)
    return response.data
}

export const getAllSintoma = async (): Promise<SintomaResponseDTO[]> => {
    const response = await api.get<SintomaResponseDTO[]>("/sintoma")
    return response.data
}

export const putSintoma = async (id: number, request: SintomaRequestDTO): Promise<SintomaResponseDTO> => {
    const response = await api.put(`/sintoma/${id}/editar`, request)
    return response.data
}

export const deleteSintoma = async (id: number) => {
    const response = await api.delete(`/sintoma/${id}/deletar`)
    return response.data
}