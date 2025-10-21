// src/app/routes/index.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

// App Router component
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
