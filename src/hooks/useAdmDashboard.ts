/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { type AdmDashboardMetricas, getAdmDashboardMetricas } from "../service/api/admDashboard";


interface UseAdmDashboardReturn {
  metricas: AdmDashboardMetricas | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useAdmDashboard = (): UseAdmDashboardReturn => {
  const [metricas, setMetricas] = useState<AdmDashboardMetricas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdmDashboardMetricas();
      setMetricas(data);
    } catch (err) {
      console.error("Erro ao carregar métricas do dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { metricas, loading, error, refetch: fetch };
};