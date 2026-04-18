import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
