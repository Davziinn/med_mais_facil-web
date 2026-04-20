import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
