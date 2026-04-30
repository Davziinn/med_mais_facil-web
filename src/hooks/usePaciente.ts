import { useEffect, useState } from "react";
import {
  getListaPaciente,
  type PacienteResponseDTO,
} from "../service/api/pacienteService";

export const usePaciente = () => {
  const [pacientes, setPacientes] = useState<PacienteResponseDTO[]>([]);

  const carregarPaciente = async () => {
    const data = await getListaPaciente();
    setPacientes(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarPaciente();
  }, []);

  return {
    carregarPaciente,
    pacientes,
  };
};
