import { useCallback, useState } from "react";
import { medicoService, type MedicoRequestDTO, type MedicoResponseDTO, type MedicoUpdateDTO } from "../service/api/medicoSerice";


interface UseMedicoReturn {
  loading: boolean;
  cadastrarMedico: (data: MedicoRequestDTO) => Promise<MedicoResponseDTO>;
  buscarMedicoPorUsuarioId: (usuarioId: number) => Promise<MedicoResponseDTO | null>;
  atualizarMedico: (medicoId: number, data: MedicoUpdateDTO) => Promise<MedicoResponseDTO>;
}

export const useMedico = (): UseMedicoReturn => {
  const [loading, setLoading] = useState(false);

  const cadastrarMedico = useCallback(async (data: MedicoRequestDTO): Promise<MedicoResponseDTO> => {
    setLoading(true);
    try {
      return await medicoService.cadastrarMedico(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarMedicoPorUsuarioId = useCallback(async (usuarioId: number): Promise<MedicoResponseDTO | null> => {
    setLoading(true);
    try {
      return await medicoService.buscarPorUsuarioId(usuarioId);
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const atualizarMedico = useCallback(async (medicoId: number, data: MedicoUpdateDTO): Promise<MedicoResponseDTO> => {
    setLoading(true);
    try {
      return await medicoService.atualizarMedico(medicoId, data);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, cadastrarMedico, buscarMedicoPorUsuarioId, atualizarMedico };
};