import {
  salvarDadosAtendimento,
  type SalvarAtendimentoRequestDTO,
} from "../service/api/salvarAtendimentoService";

export const useAtualizarDadosAtendimento = () => {
  const atualizarDadosAtendimento = async (
    atendimentoId: number,
    request: SalvarAtendimentoRequestDTO,
  ) => {
    try {
      const data = await salvarDadosAtendimento(atendimentoId, request);
      return data;
    } catch (err) {
      console.error("Erro ao atualizar dados do atendimento", err);
      throw err;
    }
  };

  return { atualizarDadosAtendimento };
};
