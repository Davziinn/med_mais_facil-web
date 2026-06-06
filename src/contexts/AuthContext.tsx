/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api } from "../service/api/api";

export type Role = "ADMINISTRADOR" | "MEDICO" | "RECEPCAO";

export interface Usuario {
  nome: string;
  email: string;
  role: Role;
  medicoId: number | null; // ← adiciona

}

interface AuthContextData {
  usuario: Usuario | null;
  user: Usuario | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<Usuario>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface AuthUser {
  email: string;
  nome: string;
  cargo: string;
  role: Role;
  iniciais: string;
}

interface MockCredential extends AuthUser {
  senha: string;
}

export const MOCK_USERS: MockCredential[] = [
  {
    email: "medico@medfacil.com",
    senha: "medico123",
    nome: "Dr. Rafael Souza",
    cargo: "Clínico Geral",
    role: "MEDICO",
    iniciais: "DR",
  },
  {
    email: "recepcao@medfacil.com",
    senha: "recepcao123",
    nome: "Ana Recepção",
    cargo: "Recepcionista",
    role: "RECEPCAO",
    iniciais: "AR",
  },
  {
    email: "adm@medfacil.com",
    senha: "adm123",
    nome: "Carlos Administrador",
    cargo: "Administrador",
    role: "ADMINISTRADOR",
    iniciais: "CA",
  },
];

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioSalvo = localStorage.getItem("usuario");

    if (token && usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }

    setIsLoading(false);
  }, []);

  async function login(email: string, senha: string): Promise<Usuario> {
    const response = await api.post("/auth/login", { email, senha });
    const { token, nome, role, medicoId } = response.data;

    // role vem da API como "MEDICO", "RECEPCAO", "ADMINISTRADOR" — mantém assim
    const usuarioLogado: Usuario = { nome, email, role: role as Role, medicoId: medicoId ?? null };

    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
    setUsuario(usuarioLogado);

    return usuarioLogado;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        user: usuario,
        isLoading,
        login,
        logout,
        isAuthenticated: !!usuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}