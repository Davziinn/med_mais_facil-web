/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  getAllLogsAuditoria,
  type LogsAuditoriaResponseDTO,
  type PageResponse,
} from "../service/api/logsService";

export const useLogs = () => {
  const [logs, setLogs] = useState<LogsAuditoriaResponseDTO[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async (
    currentPage: number = 0,
    usuarioId?: number,
    modulo?: string
  ) => {
    setLoading(true);
    try {
      const data: PageResponse<LogsAuditoriaResponseDTO> =
        await getAllLogsAuditoria(currentPage, 20, usuarioId, modulo);
      setLogs(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setPage(currentPage);
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, totalPages, totalElements, page, loading, fetchLogs };
};