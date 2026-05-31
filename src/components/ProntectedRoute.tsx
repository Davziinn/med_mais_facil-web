import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type Role } from "../contexts/AuthContext";
import type { ReactNode } from "react";

const HOME_BY_ROLE: Record<Role, string> = {
  MEDICO:   "/",
  RECEPCAO: "/recepcao",
  ADMINISTRADOR:      "/adm",
};

interface Props {
  roles: Role[];
  children: ReactNode;
}

export default function ProtectedRoute({ roles, children }: Props) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!roles.includes(user.role)) return <Navigate to={HOME_BY_ROLE[user.role]} replace />;

  return <>{children}</>;
}