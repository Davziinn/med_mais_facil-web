/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  getConfiguracao,
  putConfiguracao,
  type ConfiguracaoRequestDTO,
  type ConfiguracaoResponseDTO,
} from "../service/api/configuracaoService";

export const useConfiguracao = () => {
  const [configuracao, setConfiguracao] = useState<ConfiguracaoResponseDTO>({
    id: 1,
    tempoLimiteChamado: 45,
    quantidadeMaximaFila: 80,
    chamadaAutomatica: true,
    statusGeral: "Operando normalmente",
    mensagemPaciente:
      "Bem-vindo ao Med+Fácil. Acompanhe sua senha em tempo real.",
    notificacoesPush: true,
  });
  const [loading, setLoading] = useState(false);

  const fetchConfiguracao = async () => {
    setLoading(true);
    try {
      const data = await getConfiguracao();
      setConfiguracao(data);
    } catch (error) {
      console.error("Erro ao buscar configuração:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfiguracao();
  }, []);

  const updateConfiguracao = async (
    configAtualizada: ConfiguracaoRequestDTO,
  ) => {
    setLoading(true);

    try {
      const data = await putConfiguracao(configAtualizada);
      setConfiguracao(data);
    } catch (error) {
      console.error("Erro ao atualizar configuração:", error);
    } finally {
      setLoading(false);
    }
  };

  return { configuracao, loading, updateConfiguracao, setConfiguracao };
};
