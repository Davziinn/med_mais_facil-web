/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import type { DetalheChamadoUI } from "../mappers/detalheMapper";

export const useAtendimentoFlow = (
  detalheChamado: DetalheChamadoUI | null,
  atendimentoEncerrado: boolean,
) => {
  const [atendimentoConfirmado, setAtendimentoConfirmado] = useState(false);
  const [prescricaoFeita, setPrescricaoFeita] = useState(false);

  useEffect(() => {
    if (!detalheChamado) return;

    if (detalheChamado.statusChamado === "EM_ATENDIMENTO") {
      setAtendimentoConfirmado(true);
      setPrescricaoFeita(true);
    }
  }, [detalheChamado]);

  const podeEncerrar =
    atendimentoConfirmado && prescricaoFeita && !atendimentoEncerrado;

  const marcarAtendimentoConfirmado = () => setAtendimentoConfirmado(true);
  const marcarPrescricaoFeita = () => setPrescricaoFeita(true);

  return {
    atendimentoConfirmado,
    prescricaoFeita,
    podeEncerrar,
    marcarAtendimentoConfirmado,
    marcarPrescricaoFeita,
  };
};