import { api } from "./api";

export interface SalvarAtendimentoRequestDTO {
    anamnese: string;
    exameFisico: string;
    hipoteseDiagnostica: string;
    cidDoenca: string;
    conduta: string;
}

export interface SalvarAtendimentoResponseDTO {
    id: number;
    anamnese: string;
    exameFisico: string;
    hipoteseDiagnostica: string;
    cidDoenca: string;
    conduta: string;
    dataInicio: Date | null;
    dataFim: Date | null;
    chamadoId: number;
    medicoId: number;
}

export const salvarDadosAtendimento = async (atendimentoId: number, request: SalvarAtendimentoRequestDTO): Promise<SalvarAtendimentoResponseDTO> => {
    const response = await api.put<SalvarAtendimentoResponseDTO>(`/atendimento/${atendimentoId}`, request)
    return response.data
}