import { api } from "./api"

export interface ProntuarioItemDTO {
  atendimentoId: number;
  dataInicio: string;
  dataFim: string;
  hipoteseDiagnostica: string | null;
  conduta: string | null;
  anamnese: string | null;
  nomeMedico: string;
  diagnostico: string | null;
  observacoes: string | null;
  medicamentos: string[];
  exames: string[];
}

export interface ProntuarioPacienteResponseDTO {
  pacienteId: number;
  nomePaciente: string;
  cpf: string;
  idade: number;
  sexo: string;
  condicoesPreexistentes: string[];
  historico: ProntuarioItemDTO[];
}

export const getProntuarioPaciente = async (pacienteId: number): Promise<ProntuarioPacienteResponseDTO> => {
    const response = await api.get<ProntuarioPacienteResponseDTO>(`prontuarios/${pacienteId}/paciente`)
    return response.data
}