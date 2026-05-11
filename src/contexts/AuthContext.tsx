/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "medico" | "recepcao" | "adm";

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
    role: "medico",
    iniciais: "DR",
  },
  {
    email: "recepcao@medfacil.com",
    senha: "recepcao123",
    nome: "Ana Recepção",
    cargo: "Recepcionista",
    role: "recepcao",
    iniciais: "AR",
  },
  {
    email: "adm@medfacil.com",
    senha: "adm123",
    nome: "Carlos Administrador",
    cargo: "Administrador",
    role: "adm",
    iniciais: "CA",
  },
];

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, senha: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "medfacil.auth.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (email: string, senha: string) => {
    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.senha === senha,
    );
    if (!found) return { ok: false, error: "E-mail ou senha inválidos." };
    const { senha: _s, ...safe } = found;
    setUser(safe);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
