import { api } from "./api";

export interface AtendimentosPorDia {
  dia: string;
  atendimentos: number;
}

export interface GraficoMetricas {
  quantidadeChamadosCritica: number;
  quantidadeChamadosAlta: number;
  quantidadeChamadosMedia: number;
  quantidadeChamadosBaixa: number;
}

export interface AdmDashboardMetricas {
  quantidadePacientes: number;
  quantidadeMedicos: number;
  quantidadeRecepcionistas: number;
  quantidadeAdms: number;
  quantidadeHospitais: number;
  chamadosAtivosHoje: number;
  chamadosFinalizadosHoje: number;
  chamadosCanceladosHoje: number;
  quantidadePacientesAusentesHoje: number;
  chamadosEmAtendimento: number;
  chamadosEmEspera: number;
  graficoMetricas: GraficoMetricas;
  atendimentosPorDia: AtendimentosPorDia[];
}

export const getAdmDashboardMetricas =
  async (): Promise<AdmDashboardMetricas> => {
    const { data } = await api.get<AdmDashboardMetricas>("/adm/metricas");
    return data;
  };
