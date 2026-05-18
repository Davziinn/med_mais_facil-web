import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { AuthProvider } from "./contexts/AuthContext";
import { RecepcaoProvider } from "./contexts/RecepcaoContext";
import { ToastProvider } from "./contexts/ToastContext";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastProvider>
          <RecepcaoProvider>
            <RouterProvider router={router} />
          </RecepcaoProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
