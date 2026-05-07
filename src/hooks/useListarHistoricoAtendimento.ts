import { useEffect, useState } from "react";
import { getListarHistoricoAtendimento } from "../service/api/historicoAtendimento";

import { mapPrioridadeHistorico, type HistoricoAtendimentoUI } from "../mappers/historicoMapper";

export const useListarHistoricoAtendimento = () => {
const [historicoAtendimento, setHistoricoAtendimento] = useState<HistoricoAtendimentoUI[]>([]);

  const consultarHistoricos = async () => {
    try {
      const data = await getListarHistoricoAtendimento();

      const mappedData: HistoricoAtendimentoUI[] = data.map((item) => ({
    ...item,
    prioridade: mapPrioridadeHistorico(item.prioridade),
}));
      setHistoricoAtendimento(mappedData);
    } catch (error) {
      console.error("Erro ao consultar histórico de atendimentos:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    consultarHistoricos();
  }, []);

  return {
    historicoAtendimento,
    consultarHistoricos,
  };
};
