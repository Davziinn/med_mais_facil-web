import { useEffect, useState, useCallback } from "react";
import {
  getListaPaciente,
  getPacienteByNome,
  type PacienteResponseDTO,
} from "../service/api/pacienteService";

export const usePaciente = () => {
  const [pacientes, setPacientes] = useState<PacienteResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const carregarPacientes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getListaPaciente();
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao carregar lista de pacientes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarPacientePorNome = useCallback(async (nome: string) => {
    if (!nome.trim()) {
      await carregarPacientes();
      return;
    }

    setLoading(true);
    try {
      const data = await getPacienteByNome(nome);
      setPacientes(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Erro ao buscar paciente por nome:", error);
      setPacientes([]); 
    } finally {
      setLoading(false);
    }
  }, [carregarPacientes]);

  useEffect(() => {
    carregarPacientes();
  }, [carregarPacientes]);

  return {
    pacientes,
    loading,
    carregarPacientes,
    buscarPacientePorNome, 
  };
};