import { useEffect, useState } from "react";
import {
  mapPrioridadeChamado,
  type FilaEsperaUI,
} from "../mappers/filaMapper";
import { getFilaEspera } from "../service/api/filaEsperaService";

export const useFilaEspera = () => {
  const [filaEspera, setFilaEspera] = useState<FilaEsperaUI[]>(
    [],
  );

  const carregarFilaEspera = async () => {
    try {
      const data = await getFilaEspera();

      const mappedData: FilaEsperaUI[] = data.map((item) => {
        return {
          ...item,
          prioridadeChamado: mapPrioridadeChamado(item.prioridadeChamado),
        };
      });

      setFilaEspera(mappedData);
    } catch (error) {
      console.error("Erro ao carregar fila de Espera:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarFilaEspera();
  }, []);

  return {
    filaEspera,
    carregarFilaEspera,
  };
};
