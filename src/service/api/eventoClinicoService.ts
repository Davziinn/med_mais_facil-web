import { api } from "./api";

export type SeveridadeResponseAPI =
  | "LEVE"
  | "MODERADO"
  | "GRAVE"
  | "CRITICO";

export interface EventoClinicoResponseDTO {
    id: number;
    nomeEvento: string;
    descricao: string;
    severidade: SeveridadeResponseAPI;
}

export interface EventoClinicoRequestDTO {
    nomeEvento: string;
    descricao: string;
    severidade: SeveridadeResponseAPI;
}

export const postEventoClinico = async (request: EventoClinicoRequestDTO): Promise<EventoClinicoResponseDTO> => {
    const response = await api.post<EventoClinicoResponseDTO>("/evento", request)
    return response.data
}

export const getAllEventoClinico = async (): Promise<EventoClinicoResponseDTO[]> => {
    const response = await api.get<EventoClinicoResponseDTO[]>("/evento")
    return response.data
}

export const putEventoClinico = async (id: number, request: EventoClinicoRequestDTO): Promise<EventoClinicoResponseDTO> => {
    const response = await api.put<EventoClinicoResponseDTO>(`/evento/${id}/editar`, request)
    return response.data
}

export const deleteEventoClinico = async (id: number) => {
    const response = await api.delete(`/evento/${id}/deletar`)
    return response.data
}