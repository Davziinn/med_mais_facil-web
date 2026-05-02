import { putEncerrarAtendimento } from "../service/api/encerrarAtendimento";

export const useEncerrarAtendimento = () => {
  const encerrarAtendimento = async (id: number) => {
    try {
      const data = await putEncerrarAtendimento(id);
      return data;
    } catch (error) {
      console.error("Erro ao encerrar atendimento:", error);
    }
  };

  return {
    encerrarAtendimento
  };
};
