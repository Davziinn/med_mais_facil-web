/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

type ToastSeverity = "success" | "error" | "info" | "warning";

interface ToastItem {
  message: string;
  severity: ToastSeverity;
}

interface ToastCtx {
  showToast: (message: string, severity?: ToastSeverity) => void;
}

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastItem | null>(null);

  const showToast = useCallback((message: string, severity: ToastSeverity = "success") => {
    setToast({ message, severity });
  }, []);

  return (
    <Ctx.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={!!toast}
        autoHideDuration={3500}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {toast ? (
          <Alert
            severity={toast.severity}
            variant="filled"
            onClose={() => setToast(null)}
            sx={{ minWidth: 280, boxShadow: 6 }}
          >
            {toast.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast deve estar dentro de ToastProvider");
  return ctx;
}
