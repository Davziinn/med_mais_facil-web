import { api } from "./api";
import type { ExameResponseDTO } from "./exameService";

export interface GuiaMedicaRequestDTO {
    cidExame: string;
    indicacaoClinica: string;
    convenio: string //Convenio;
    observacoes: string;
    atendimentoId: number;
    examesIds: number[];
} 

export interface GuiaMedicaResponseDTO {
    id: number;
    cidExame: string;
    indicacaoClinica: string;
    numeroGuia: string;
    dataSolicitacao: Date;
    convenio: string;
    observacoes: string;
    atendimentoId: number;
    exames: ExameResponseDTO[];
}

export const postGuiaMedica = async (request: GuiaMedicaRequestDTO): Promise<GuiaMedicaResponseDTO> => {
    const response = await api.post<GuiaMedicaResponseDTO>('/guia-medica', request);
    return response.data;
}

export const getAllGuiaMedicaByAtendimentoId = async (atendimentoId: number): Promise<GuiaMedicaResponseDTO[]> => {
    const response = await api.get<GuiaMedicaResponseDTO[]>(`/guia-medica/${atendimentoId}`)
    return response.data
}

export const putGuiaMedica = async (id: number, request: GuiaMedicaRequestDTO): Promise<GuiaMedicaResponseDTO> => {
    const response = await api.put<GuiaMedicaResponseDTO>(`/guia-medica/${id}`, request);
    return response.data;
}

export const patchGuiaMedica = async (id: number): Promise<GuiaMedicaResponseDTO> => {
    const response = await api.patch<GuiaMedicaResponseDTO>(`/guia-medica/${id}`);
    return response.data;
}