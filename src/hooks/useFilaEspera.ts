/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { mapPrioridadeChamado, type FilaEsperaUI } from "../mappers/filaMapper";
import {
  getFilaEsperaEspecialidadeMedico,
  getFilaEsperaRecepcao,
} from "../service/api/filaEsperaService";
import axios from "axios";

export const useFilaEspera = () => {
  const [filaEsperaRecepcao, setFilaEsperaRecepcao] = useState<FilaEsperaUI[]>(
    [],
  );
  const [filaEsperaEspecialidadeMedico, setFilaEsperaEspecialidadeMedico] =
    useState<FilaEsperaUI[]>([]);

  const carregarFilaEsperaRecepcao = async () => {
    try {
      const data = await getFilaEsperaRecepcao();

      const mappedData: FilaEsperaUI[] = data.map((item) => {
        return {
          ...item,
          prioridadeChamado: mapPrioridadeChamado(item.prioridadeChamado),
        };
      });

      setFilaEsperaRecepcao(mappedData);
    } catch (error) {
      console.error("Erro ao carregar fila de Espera:", error);
    }
  };

  const carregarFilaEsperaEspecialidadeMedico = async () => {
    try {
      const data = await getFilaEsperaEspecialidadeMedico();

      const mappedData: FilaEsperaUI[] = data.map((item) => {
        return {
          ...item,
          prioridadeChamado: mapPrioridadeChamado(item.prioridadeChamado),
        };
      });

      setFilaEsperaEspecialidadeMedico(mappedData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }

      console.error(error);
    }
  };

  useEffect(() => {
    carregarFilaEsperaRecepcao();
  }, []);

  return {
    filaEsperaRecepcao,
    carregarFilaEsperaRecepcao,
    filaEsperaEspecialidadeMedico,
    carregarFilaEsperaEspecialidadeMedico,
  };
};
