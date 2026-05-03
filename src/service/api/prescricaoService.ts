import { api } from "./api";
import type { SalvarAtendimentoResponseDTO } from "./salvarAtendimentoService";

export interface PrescricaoMedicamentoRequestDTO {
    nome: string;
    dose: string;
    frequencia: string;
    duracao: string;
    via: string;
}

export interface PrescricaoRequestDTO {
    orientacoes: string;
    retornoConsulta: string;
    exames: string;
    medicamentos: PrescricaoMedicamentoRequestDTO[];
}

export interface PrescricaoMedicamentoResponseDTO {
    id: number;
    nome: string;
    dose: string;
    frequencia: string;
    duracao: string;
    via: string;
}

export interface PrescricaoResponseDTO {
    id: number;
    orientacoes: string;
    retornoConsulta: string;
    exames: string;
    atendimento: SalvarAtendimentoResponseDTO;
    medicamentos: PrescricaoMedicamentoResponseDTO[];
}

export const salvarPrescricaoMedica = async (atendimentoId: number, request: PrescricaoRequestDTO): Promise<PrescricaoResponseDTO> => {
    const response = await api.post(`/prescrever/${atendimentoId}`, request)
    return response.data
}