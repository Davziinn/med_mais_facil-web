import { useState } from "react";
import {
  getFilaAguardandoCheckIn,
  getRecepcaoDashboardMetricas,
  patchMarcarPacienteAusente,
  type FilaAguardandoCheckinResponseDTO,
  type RecepcaoDashboardMetricasResponseDTO,
} from "../service/api/recepcaoDashboard";

export const useRecepcaoDashboard = () => {
  const [metricas, setMetricas] = useState<RecepcaoDashboardMetricasResponseDTO | null>(null);
  const [filaCheckIn, setFilaCheckIn] = useState<FilaAguardandoCheckinResponseDTO[] | []>([]);

  const carregarMetricas = async () => {
    try {
      const data = await getRecepcaoDashboardMetricas();
      setMetricas(data);
    } catch (error) {
      console.error("Erro ao buscar métricas do dashboard:", error);
    }
  };

  const carregarFilaAguardandoCheckIn = async () => {
    try {
      const data = await getFilaAguardandoCheckIn();
      setFilaCheckIn(data);
    } catch (error) {
      console.error(
        "Erro ao buscar fila dos pacientes que estão aguardando o Check-In",
        error,
      );
    }
  };

  const marcarPacienteComoAusente = async (chamadoId: number) => {
    try {
      const data = await patchMarcarPacienteAusente(chamadoId);
      return data;
    } catch (error) {
      console.error("Erro ao marcar paciente como Ausente", error);
    }
  };

  return {
    metricas,
    carregarMetricas,
    filaCheckIn,
    carregarFilaAguardandoCheckIn,
    marcarPacienteComoAusente
  };
};
