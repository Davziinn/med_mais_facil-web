import {
  putAlterarPrioridadeChamado,
  type AlterarPrioridadeRequestDTO,
} from "../service/api/alterarPrioridadeService";

export const useAlterarPrioridade = () => {
  const alterarPrioridade = async (
    chamadoId: number,
    request: AlterarPrioridadeRequestDTO,
  ) => {
    try {
      const data = await putAlterarPrioridadeChamado(chamadoId, request);
      return data;
    } catch (error) {
      console.error("Erro ao alterar o status da prioridade do chamado", error);
    }
  };

  return { alterarPrioridade };
};
