import { useState, useCallback } from "react";
import {
  type UsuarioResponseDTO,
  getUsuarios,
  getUsuarioById,
  type UsuarioRequestDTO,
  postUsuario,
  type UsuarioUpdateRequestDTO,
  putUsuario,
  deleteUsuario,
} from "../service/api/usuarioService";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuarioResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err: unknown) {
      setError("Erro ao carregar usuários.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarUsuarioPorId = useCallback(
    async (id: number): Promise<UsuarioResponseDTO> => {
      return await getUsuarioById(id);
    },
    [],
  );

  const criarUsuario = useCallback(
    async (dto: UsuarioRequestDTO): Promise<UsuarioResponseDTO> => {
      const novo = await postUsuario(dto);
      setUsuarios((prev) => [novo, ...prev]);
      return novo;
    },
    [],
  );

  const atualizarUsuario = useCallback(
    async (
      id: number,
      dto: UsuarioUpdateRequestDTO,
    ): Promise<UsuarioResponseDTO> => {
      const atualizado = await putUsuario(id, dto);
      setUsuarios((prev) =>
        prev.map((u) => (u.id === atualizado.id ? atualizado : u)),
      );
      return atualizado;
    },
    [],
  );

  const removerUsuario = useCallback(async (id: number): Promise<void> => {
    await deleteUsuario(id);
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  }, []);

  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    removerUsuario,
  };
};
