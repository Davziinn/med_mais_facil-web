import { useEffect, useState } from "react";
import {
  getHospitalById,
  type HospitalResponseDTO,
} from "../service/api/hospitalService";

export const useHospital = (id: number) => {
  const [hospital, setHospital] = useState<HospitalResponseDTO | null>(null);

  const carregarHospital = async (id: number) => {
    try {
      const data = await getHospitalById(id);
      setHospital(data);
    } catch (error) {
      console.error("Erro ao carregar hospital:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarHospital(id);
  }, [id]);

  return {
    hospital,
    carregarHospital,
  };
};
